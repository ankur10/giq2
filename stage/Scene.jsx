import React, {useMemo, useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {EffectComposer, Bloom, Vignette} from '@react-three/postprocessing';
import * as THREE from 'three';
import {buildConstellation} from './constellation.mjs';
import {beats, nodes, path, faint, lensSeconds} from './story.mjs';

const COOL = new THREE.Color('#9fb3d1'), ORANGE = new THREE.Color('#e8701a'), WHITE = new THREE.Color('#ffffff');
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const span = (t, from, to) => Math.max(0, Math.min(1, (t - from) / (to - from)));
const mix = (a, b, t) => a + (b - a) * t;

// What the story has lit so far, from the beat and the seconds spent in it.
export function storyLight(beat, seconds) {
  const lens = beat === 2 ? seconds / lensSeconds : beat > 2 ? 3 : 0;
  return {
    lens,
    path: span(lens, 0.12, 0.7),
    customer: span(lens, 1.25, 1.7),
    competitor: span(lens, 2.2, 2.9),
    sweep: beat === 2 && lens < 3 && lens % 1 < 0.72 ? ease((lens % 1) / 0.72) : null,
  };
}

function Field({director, labels, targets}) {
  const c = useMemo(() => buildConstellation({nodes, path}), []);
  const group = useRef(), mesh = useRef(), links = useRef(), pathLine = useRef(), sweep = useRef();
  const scratch = useMemo(() => ({m: new THREE.Matrix4(), q: new THREE.Quaternion(), s: new THREE.Vector3(), p: new THREE.Vector3(), v: new THREE.Vector3(), col: new THREE.Color()}), []);
  const linkGeometry = useMemo(() => {
    const array = new Float32Array(c.links.length * 6);
    c.links.forEach(([a, b], i) => array.set([c.points[a].x, c.points[a].y, c.points[a].z, c.points[b].x, c.points[b].y, c.points[b].z], i * 6));
    return new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(array, 3));
  }, [c]);
  const pathGeometry = useMemo(() => {
    // Many short segments so the line can be drawn progressively.
    const steps = 40, array = [];
    c.pathLinks.forEach(([a, b]) => { for (let i = 0; i < steps; i++) for (const t of [i / steps, (i + 1) / steps]) array.push(mix(c.points[a].x, c.points[b].x, t), mix(c.points[a].y, c.points[b].y, t), mix(c.points[a].z, c.points[b].z, t)); });
    return new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(array, 3));
  }, [c]);
  const index = c.index, pathSet = useMemo(() => path.map(n => index[n]), [index]);

  useFrame(({camera, clock, size, scene}) => {
    const {beat, progress} = director.state();
    const t = progress * beats[beat].duration, time = clock.elapsedTime;
    const light = storyLight(beat, t);
    const id = beats[beat].id;

    // Camera and overall visibility.
    let opacity = 1, z = 17, depth = 1, fly = 0;
    if (id === 'question') opacity = 0;
    if (id === 'world') { opacity = span(t, 0.3, 2.8); depth = ease(span(t, 2.2, 7.5)); }
    if (id === 'convergence') { z = mix(17, 12.5, ease(span(t, 0, 5))); fly = ease(span(t, 1, 4.8)); opacity = 1 - span(t, 4.6, 6.2); }
    if (id === 'brief') { opacity = 0; z = 12.5; fly = 1; }
    if (id === 'pullback') { z = mix(12.5, 23, ease(span(t, 0, 7))); opacity = span(t, 0.6, 3); }
    camera.position.set(0, 0, z);
    // Depth haze keeps its distance from the camera so the pull-back does not dim the whole field.
    scene.fog.near = z - 4; scene.fog.far = z + 10;
    const settle = id === 'convergence' || id === 'brief' ? 1 - ease(span(t, 0, 2.2)) : 1;
    group.current.scale.z = mix(0.02, 1, depth);
    group.current.rotation.x = -0.3 * depth * settle;
    group.current.rotation.y = (0.26 * depth + Math.sin(time * 0.12) * 0.07) * settle;
    group.current.updateMatrixWorld();

    // Points.
    const hasTargets = fly > 0 && targets?.length;
    c.points.forEach((point, i) => {
      scratch.p.set(point.x, point.y, point.z);
      if (hasTargets) {
        const target = targets[i % targets.length];
        scratch.v.set(target.x / size.width * 2 - 1, -(target.y / size.height * 2 - 1), 0.5).unproject(camera).sub(camera.position).normalize();
        scratch.v.multiplyScalar(-camera.position.z / scratch.v.z).add(camera.position);
        group.current.worldToLocal(scratch.v);
        const own = ease(span(fly, (i % 37) / 90, 0.6 + (i % 37) / 90));
        scratch.p.lerp(scratch.v, own);
      }
      let scale = point.name ? 1.5 : 1, glow = 0.9;
      scratch.col.copy(COOL);
      if (point.role === 'company') { scratch.col.copy(WHITE); scale = 2.6; glow = 1.6; }
      const onPath = pathSet.indexOf(i);
      if (onPath > -1 && point.role !== 'company' && light.path > onPath / pathSet.length) { scratch.col.copy(ORANGE); scale = 2; glow = 2.5; }
      if (point.role === 'customer' && light.customer > 0) { scratch.col.lerpColors(COOL, ORANGE, light.customer); scale = mix(1.5, 2.6, light.customer); glow = mix(0.9, 2.1, light.customer); }
      if (point.role === 'competitor' && light.competitor > 0) { const pulse = Math.abs(Math.sin(light.competitor * Math.PI * 3)); scratch.col.copy(ORANGE); scale = 1.8 + pulse * 1.4; glow = 1.5 + pulse * 1.2; }
      if (id === 'pullback') {
        if (faint.includes(point.name)) { const breath = 0.5 + 0.5 * Math.sin(time * 1.6 + i); scratch.col.copy(ORANGE); glow = 1.1 + breath * 0.9; scale = 2.2; }
        if (point.name === 'New coatings') { scale = 3.6; glow = 2.8; }
      }
      scratch.s.setScalar(scale);
      mesh.current.setMatrixAt(i, scratch.m.compose(scratch.p, scratch.q, scratch.s));
      mesh.current.setColorAt(i, scratch.col.multiplyScalar(glow));
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    mesh.current.instanceColor.needsUpdate = true;
    mesh.current.material.opacity = opacity;
    links.current.material.opacity = 0.14 * opacity * (1 - fly);
    pathLine.current.material.opacity = opacity * (1 - fly) * (id === 'pullback' ? 0.5 : 1);
    pathLine.current.geometry.setDrawRange(0, Math.floor(light.path * c.pathLinks.length * 40) * 2);

    // Lens sweep.
    sweep.current.visible = light.sweep !== null;
    if (light.sweep !== null) { sweep.current.position.x = mix(-13, 13, light.sweep); sweep.current.material.opacity = 0.5 * Math.sin(light.sweep * Math.PI); }

    // Labels follow their points on screen.
    nodes.forEach((node, i) => {
      const el = labels.current[i]; if (!el) return;
      scratch.v.set(c.points[i].x, c.points[i].y, c.points[i].z).applyMatrix4(group.current.matrixWorld).project(camera);
      el.style.transform = `translate(${(scratch.v.x + 1) / 2 * size.width}px, ${(1 - scratch.v.y) / 2 * size.height}px)`;
      const onPath = pathSet.indexOf(i);
      const on = id === 'world' ? node.role === 'company' && t > 3
        : id === 'lenses' || (id === 'convergence' && t < 1) ? node.role === 'company' || (onPath > -1 && light.path > onPath / pathSet.length) || (node.role === 'customer' && light.customer > 0.3) || (node.role === 'competitor' && light.competitor > 0.1)
        : false;
      el.dataset.on = on;
    });
  });

  return <group ref={group}>
    <instancedMesh ref={mesh} args={[null, null, c.points.length]} frustumCulled={false}>
      <sphereGeometry args={[0.042, 12, 12]}/>
      <meshBasicMaterial toneMapped={false} transparent depthWrite={false}/>
    </instancedMesh>
    <lineSegments ref={links} geometry={linkGeometry} frustumCulled={false}><lineBasicMaterial color={COOL} transparent opacity={0.17} depthWrite={false}/></lineSegments>
    <lineSegments ref={pathLine} geometry={pathGeometry} frustumCulled={false}><lineBasicMaterial color={ORANGE.clone().multiplyScalar(1.5)} toneMapped={false} transparent depthWrite={false}/></lineSegments>
    <mesh ref={sweep} visible={false}><planeGeometry args={[0.5, 22]}/><meshBasicMaterial color="#cfe0ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide}/></mesh>
  </group>;
}

export default function Scene({director, targets = null}) {
  const labels = useRef([]);
  return <div className="stage-layer stage-scene">
    <Canvas dpr={[1, 1.75]} camera={{fov: 38, position: [0, 0, 17], near: 0.1, far: 100}} gl={{antialias: true, alpha: true}}>
      <fog attach="fog" args={['#0d1730', 13, 27]}/>
      <Field director={director} labels={labels} targets={targets}/>
      <EffectComposer><Bloom mipmapBlur luminanceThreshold={0.6} luminanceSmoothing={0.2} intensity={1.5}/><Vignette darkness={0.55} offset={0.3}/></EffectComposer>
    </Canvas>
    <div className="stage-labels">{nodes.map((n, i) => <span key={n.name} ref={el => { labels.current[i] = el; }} data-role={n.role}>{n.name}</span>)}</div>
  </div>;
}
