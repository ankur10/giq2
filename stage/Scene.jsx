import React, {useMemo, useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {EffectComposer, Bloom, Vignette} from '@react-three/postprocessing';
import * as THREE from 'three';
import {buildConstellation} from './constellation.mjs';
import {steps, field} from './story.mjs';

const COOL = new THREE.Color('#9fb3d1'), ORANGE = new THREE.Color('#e8701a'), WHITE = new THREE.Color('#ffffff');
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const span = (t, from, to) => Math.max(0, Math.min(1, (t - from) / (to - from)));
const mix = (a, b, t) => a + (b - a) * t;
const {nodes, path} = field;

// Act 2: the ecosystem diagram gains depth and becomes a field of connected markets, and the
// need that started in AI data centres is traced to the company.
function Field({director, labels}) {
  const c = useMemo(() => buildConstellation({nodes, path}), []);
  const group = useRef(), mesh = useRef(), links = useRef(), pathLine = useRef();
  const scratch = useMemo(() => ({m: new THREE.Matrix4(), q: new THREE.Quaternion(), s: new THREE.Vector3(), p: new THREE.Vector3(), v: new THREE.Vector3(), col: new THREE.Color()}), []);
  const SEGMENTS = 40;
  const linkGeometry = useMemo(() => {
    const array = new Float32Array(c.links.length * 6);
    c.links.forEach(([a, b], i) => array.set([c.points[a].x, c.points[a].y, c.points[a].z, c.points[b].x, c.points[b].y, c.points[b].z], i * 6));
    return new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(array, 3));
  }, [c]);
  const pathGeometry = useMemo(() => {
    // Many short segments so the line can be drawn progressively.
    const array = [];
    c.pathLinks.forEach(([a, b]) => { for (let i = 0; i < SEGMENTS; i++) for (const t of [i / SEGMENTS, (i + 1) / SEGMENTS]) array.push(mix(c.points[a].x, c.points[b].x, t), mix(c.points[a].y, c.points[b].y, t), mix(c.points[a].z, c.points[b].z, t)); });
    return new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(array, 3));
  }, [c]);
  const onPath = useMemo(() => path.map(name => c.index[name]), [c]);

  useFrame(({camera, clock, size}) => {
    const state = director.state(), id = steps[state.step].id;
    // Seconds into the field step; held at its end once the story has moved on.
    const t = id === 'field' ? state.seconds : state.step > steps.findIndex(s => s.id === 'field') ? 99 : 0;
    const depth = ease(span(t, 1.2, 6)), drawn = span(t, 6, 10.5), time = clock.elapsedTime;
    camera.position.set(0, 0, mix(19, 17, depth));
    group.current.scale.z = mix(0.02, 1, depth);
    group.current.rotation.x = -0.3 * depth;
    group.current.rotation.y = 0.26 * depth + Math.sin(time * 0.12) * 0.07 * depth;
    group.current.updateMatrixWorld();

    c.points.forEach((point, i) => {
      scratch.p.set(point.x, point.y, point.z);
      let scale = point.name ? 1.5 : 1, glow = 0.9;
      scratch.col.copy(COOL);
      if (point.role === 'company') { scratch.col.copy(WHITE); scale = 2.8; glow = 1.6; }
      const place = onPath.indexOf(i);
      if (place > -1 && point.role !== 'company' && drawn > place / onPath.length) { scratch.col.copy(ORANGE); scale = place === 1 ? 2.8 : 2; glow = 2.5; }
      scratch.s.setScalar(scale);
      mesh.current.setMatrixAt(i, scratch.m.compose(scratch.p, scratch.q, scratch.s));
      mesh.current.setColorAt(i, scratch.col.multiplyScalar(glow));
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.instanceColor.needsUpdate = true;
    links.current.material.opacity = 0.14 * span(t, 0.6, 3);
    mesh.current.material.opacity = span(t, 0.2, 1.6);
    pathLine.current.geometry.setDrawRange(0, Math.floor(drawn * c.pathLinks.length * SEGMENTS) * 2);

    nodes.forEach((node, i) => {
      const el = labels.current[i]; if (!el) return;
      scratch.v.set(c.points[i].x, c.points[i].y, c.points[i].z).applyMatrix4(group.current.matrixWorld).project(camera);
      el.style.transform = `translate(${(scratch.v.x + 1) / 2 * size.width}px, ${(1 - scratch.v.y) / 2 * size.height}px)`;
      const place = onPath.indexOf(i);
      el.dataset.on = node.role === 'company' ? t > 0.8 : place > -1 ? drawn > place / onPath.length : t > 3.5;
      el.dataset.lit = place > -1 && node.role !== 'company' && drawn > place / onPath.length;
    });
  });

  return <group ref={group}>
    <instancedMesh ref={mesh} args={[null, null, c.points.length]} frustumCulled={false}><sphereGeometry args={[0.042, 12, 12]}/><meshBasicMaterial toneMapped={false} transparent depthWrite={false}/></instancedMesh>
    <lineSegments ref={links} geometry={linkGeometry} frustumCulled={false}><lineBasicMaterial color={COOL} transparent opacity={0} depthWrite={false}/></lineSegments>
    <lineSegments ref={pathLine} geometry={pathGeometry} frustumCulled={false}><lineBasicMaterial color={ORANGE.clone().multiplyScalar(1.5)} toneMapped={false} transparent depthWrite={false}/></lineSegments>
  </group>;
}

export default function Scene({director}) {
  const labels = useRef([]);
  return <>
    <Canvas dpr={[1, 1.75]} camera={{fov: 38, position: [0, 0, 19], near: 0.1, far: 100}} gl={{antialias: true, alpha: true}}>
      <fog attach="fog" args={['#0d1730', 13, 28]}/>
      <Field director={director} labels={labels}/>
      <EffectComposer><Bloom mipmapBlur luminanceThreshold={0.6} luminanceSmoothing={0.2} intensity={1.5}/><Vignette darkness={0.55} offset={0.3}/></EffectComposer>
    </Canvas>
    <div className="stage-labels">{nodes.map((n, i) => <span key={n.name} ref={el => { labels.current[i] = el; }} data-role={n.role}>{n.name}</span>)}</div>
  </>;
}
