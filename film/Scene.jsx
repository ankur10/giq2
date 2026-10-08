import React, {useMemo, useRef} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {EffectComposer, Bloom, Vignette} from '@react-three/postprocessing';
import * as THREE from 'three';
import {Line2} from 'three/examples/jsm/lines/Line2.js';
import {LineGeometry} from 'three/examples/jsm/lines/LineGeometry.js';
import {LineMaterial} from 'three/examples/jsm/lines/LineMaterial.js';
import {hero, camera, jitter, stopPoints, N, ORANGE, PALE, FOV} from './line.mjs';
import {stops, card, span, mix} from './score.mjs';

const FIELD = 240, SAMPLES = 72;
// A fixed scatter for the noise field, so every run of the film is the same picture.
function seeded(seed) { let a = seed; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

function Film({beat, anchors, labels}) {
  const {size} = useThree();
  const line = useMemo(() => {
    const geometry = new LineGeometry();
    geometry.setPositions(new Float32Array(N * 3));
    const material = new LineMaterial({linewidth: 3.6, transparent: true, depthWrite: false, toneMapped: false});
    const object = new Line2(geometry, material);
    object.frustumCulled = false;
    return object;
  }, []);
  const field = useMemo(() => {
    const random = seeded(11);
    const lines = Array.from({length: FIELD}, () => ({y: (random() * 2 - 1) * 15, z: -30 + random() * 33, seed: random() * 40, gain: 0.5 + random()}));
    const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(FIELD * (SAMPLES - 1) * 6), 3));
    return {lines, geometry};
  }, []);
  const dot = useRef(), nodes = useRef(), fieldMaterial = useRef(), dustMaterial = useRef();
  // Faint points scattered along the route, so the run reads as speed and depth.
  const dust = useMemo(() => {
    const random = seeded(23), array = new Float32Array(900 * 3);
    for (let i = 0; i < 900; i++) { const t = random(); array.set([-6 + t * 104 + (random() - 0.5) * 30, -8 + random() * 40, 6 - t * 90 + (random() - 0.5) * 34], i * 3); }
    return new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(array, 3));
  }, []);
  const scratch = useMemo(() => ({m: new THREE.Matrix4(), q: new THREE.Quaternion(), s: new THREE.Vector3(), p: new THREE.Vector3(), v: new THREE.Vector3(), c: new THREE.Color()}), []);

  useFrame(({camera: cam}) => {
    const b = beat();
    const pose = camera(b);
    cam.position.set(...pose.position); cam.lookAt(...pose.look); cam.updateMatrixWorld();

    // The line.
    const h = hero(b, anchors.current);
    const segments = line.geometry.attributes.instanceStart.data.array;
    for (let i = 0; i < N - 1; i++) segments.set(h.positions.subarray(i * 3, i * 3 + 6), i * 6);
    line.geometry.attributes.instanceStart.data.needsUpdate = true;
    // Bright enough to glow, not so bright that the orange burns out to yellow.
    const gain = h.color === ORANGE ? 1.32 : 1.05;
    line.material.color.setRGB(h.color[0] * gain, h.color[1] * gain, h.color[2] * gain);
    line.material.opacity = h.opacity;
    line.material.resolution.set(size.width, size.height);
    dot.current.position.set(...h.head);
    dot.current.visible = h.dot;
    dot.current.material.opacity = h.opacity;

    // The noise field: present from the pull-back until the line leaves it behind.
    const shown = span(b, 8, 16) * mix(1, 0.22, span(b, 32, 34)) * (1 - span(b, 46, 54));
    fieldMaterial.current.opacity = 0.34 * shown;
    fieldMaterial.current.visible = shown > 0;
    if (shown > 0) {
      const array = field.geometry.attributes.position.array, calm = mix(1, 0.35, span(b, 32, 36));
      let o = 0;
      field.lines.forEach(l => {
        let px = -48, py = l.y + 0.32 * l.gain * calm * jitter(px, b, l.seed);
        for (let i = 1; i < SAMPLES; i++) {
          const x = -48 + 96 * i / (SAMPLES - 1), y = l.y + 0.32 * l.gain * calm * jitter(x, b, l.seed);
          array[o++] = px; array[o++] = py; array[o++] = l.z; array[o++] = x; array[o++] = y; array[o++] = l.z;
          px = x; py = y;
        }
      });
      field.geometry.attributes.position.needsUpdate = true;
    }

    dustMaterial.current.opacity = 0.55 * span(b, 46, 52) * (1 - span(b, 86, 92));

    // Points along the run, and the words fixed to them.
    stopPoints.forEach((point, i) => {
      const reached = b >= stops[i].at, visible = b > 46 && b < 92;
      // A point the camera is brushing past would fill the screen, so it shrinks away as it nears.
      scratch.p.set(...point); scratch.s.setScalar(visible ? (reached ? 1.6 : 0.8) * span(scratch.p.distanceTo(cam.position), 5, 11) : 0);
      nodes.current.setMatrixAt(i, scratch.m.compose(scratch.p, scratch.q, scratch.s));
      nodes.current.setColorAt(i, scratch.c.setRGB(...(reached ? [1.6, 1.6, 1.6] : PALE)));
      place(labels.current[i], point, cam, size, reached && b < stops[i].at + (stops[i].kind === 'chain' ? 9 : 12) && b < 90);
    });
    nodes.current.instanceMatrix.needsUpdate = true;
    nodes.current.instanceColor.needsUpdate = true;
    place(labels.current.card, [2, 5, 0], cam, size, b >= card.from && b < card.to);
  });
  const place = (el, point, cam, size, on) => {
    if (!el) return;
    scratch.v.set(...point).project(cam);
    el.style.transform = `translate(${(scratch.v.x + 1) / 2 * size.width}px, ${(1 - scratch.v.y) / 2 * size.height}px)`;
    el.dataset.on = on && scratch.v.z < 1;
  };

  return <>
    <primitive object={line}/>
    <mesh ref={dot}><sphereGeometry args={[0.085, 20, 20]}/><meshBasicMaterial color={[1.5, 0.7, 0.16]} toneMapped={false} transparent depthWrite={false}/></mesh>
    <lineSegments geometry={field.geometry} frustumCulled={false}><lineBasicMaterial ref={fieldMaterial} color={PALE} transparent opacity={0} depthWrite={false}/></lineSegments>
    <points geometry={dust} frustumCulled={false}><pointsMaterial ref={dustMaterial} color={PALE} size={0.09} sizeAttenuation transparent opacity={0} depthWrite={false}/></points>
    <instancedMesh ref={nodes} args={[null, null, stopPoints.length]} frustumCulled={false}><sphereGeometry args={[0.07, 14, 14]}/><meshBasicMaterial toneMapped={false}/></instancedMesh>
  </>;
}

export default function Scene({beat, anchors}) {
  const labels = useRef({});
  return <div className="film-layer">
    <Canvas dpr={[1, 1.75]} camera={{fov: FOV, position: [0, 0, 9], near: 0.1, far: 400}} gl={{antialias: true, alpha: true}}>
      <Film beat={beat} anchors={anchors} labels={labels}/>
      <EffectComposer><Bloom mipmapBlur luminanceThreshold={0.62} luminanceSmoothing={0.2} intensity={1.15}/><Vignette darkness={0.6} offset={0.28}/></EffectComposer>
    </Canvas>
    <div className="film-labels">
      {stops.map((stop, i) => <span key={stop.text} data-kind={stop.kind} ref={el => { labels.current[i] = el; }}>{stop.text}</span>)}
      <span data-kind="card" ref={el => { labels.current.card = el; }}>{card.text}</span>
    </div>
  </div>;
}
