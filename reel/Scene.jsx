import React, {useMemo, useRef} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import * as THREE from 'three';
import {shots, wall, close, images, phase, span, mix, inOut, out} from './shots.mjs';

const CARD_HEIGHT = 3.7, PIXELS = [1440, 900];
const part = (texture, [x, y, w, h]) => { const t = texture.clone(); t.repeat.set(w, h); t.offset.set(x, 1 - y - h); t.needsUpdate = true; return t; };

// One product screen: it flies in as a tilted card, then the part being talked about lifts
// off it towards the viewer while the rest falls back.
function Shot({shot, texture, beat}) {
  const group = useRef(), card = useRef(), focus = useRef(), shadow = useRef();
  const g = useMemo(() => {
    const [cx, cy, cw, ch] = shot.cropRect, [fx, fy, fw, fh] = shot.focusRect;
    const height = CARD_HEIGHT, width = height * (cw * PIXELS[0]) / (ch * PIXELS[1]);
    const size = [fw / cw * width, fh / ch * height];
    return {width, height, size, home: [((fx + fw / 2 - cx) / cw - 0.5) * width, (0.5 - (fy + fh / 2 - cy) / ch) * height],
      grow: Math.min(4.2 / size[0], 3.1 / size[1], 2.7), cardMap: part(texture, shot.cropRect), focusMap: part(texture, shot.focusRect)};
  }, [shot, texture]);

  useFrame(({clock}) => {
    const p = phase(shot, beat());
    group.current.visible = p.visible;
    if (!p.visible) return;
    const side = shot.side, drift = Math.sin(clock.elapsedTime * 0.5 + shot.from) * 0.02;
    group.current.position.set(mix(side * 15, side * 2.2, p.enter) - side * 17 * p.leave, drift * 4, mix(-3, 0, p.enter));
    group.current.rotation.set(0.02, mix(side * 1.0, -side * 0.15, p.enter) - side * 0.6 * p.leave + drift, 0);
    card.current.material.color.setScalar(mix(1, 0.34, p.lift));
    const scale = mix(1, g.grow, p.lift);
    // Lifting brings it nearer the camera, which pushes it outwards on screen; lean it back in.
    focus.current.position.set(mix(g.home[0], -side * 0.3, p.lift), mix(g.home[1], 0, p.lift), 0.01 + p.lift * 1.5);
    focus.current.scale.set(g.size[0] * scale, g.size[1] * scale, 1);
    focus.current.visible = p.lift > 0.001;
    shadow.current.position.set(focus.current.position.x + 0.1 * p.lift, focus.current.position.y - 0.16 * p.lift, 0.005 + p.lift * 1.2);
    shadow.current.scale.set(g.size[0] * scale * 1.04, g.size[1] * scale * 1.06, 1);
    shadow.current.material.opacity = 0.5 * p.lift;
  });

  return <group ref={group} visible={false}>
    <mesh ref={card} scale={[g.width, g.height, 1]}><planeGeometry/><meshBasicMaterial map={g.cardMap} toneMapped={false}/></mesh>
    <mesh ref={shadow}><planeGeometry/><meshBasicMaterial color="#03060f" transparent opacity={0} depthWrite={false}/></mesh>
    <mesh ref={focus} visible={false}><planeGeometry/><meshBasicMaterial map={g.focusMap} toneMapped={false}/></mesh>
  </group>;
}

// Every screen at once: the whole product as a wall, which then dims behind the closing line.
function Wall({textures, beat}) {
  const group = useRef();
  const columns = 5, w = 1.8, h = w * PIXELS[1] / PIXELS[0], gap = 0.2;
  const cells = wall.images.map((name, i) => { const row = Math.floor(i / columns), inRow = Math.min(columns, wall.images.length - row * columns), column = i % columns;
    return {name, x: (column - (inRow - 1) / 2) * (w + gap), y: (1 - row) * (h + gap)}; });
  useFrame(() => {
    const b = beat();
    group.current.visible = b > wall.from - 0.1;
    if (!group.current.visible) return;
    const fade = 1 - span(b, close.to - 1.5, close.to);
    group.current.position.z = mix(1.2, 0, inOut(span(b, wall.from, close.from)));
    group.current.children.forEach((mesh, i) => {
      const pop = out(span(b, wall.from + i * 0.4, wall.from + i * 0.4 + 1));
      mesh.scale.set(w * pop, h * pop, 1);
      mesh.material.color.setScalar(mix(1, 0.2, inOut(span(b, close.from - 0.5, close.from + 1.5))) * fade);
    });
  });
  return <group ref={group} visible={false}>{cells.map(cell => <mesh key={cell.name} position={[cell.x, cell.y, 0]}><planeGeometry/><meshBasicMaterial map={textures[cell.name]} toneMapped={false}/></mesh>)}</group>;
}

function Reel({beat}) {
  const loaded = useLoader(THREE.TextureLoader, images.map(name => `assets/reel/${name}.jpg`));
  const textures = useMemo(() => Object.fromEntries(images.map((name, i) => { const t = loaded[i]; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; t.needsUpdate = true; return [name, t]; })), [loaded]);
  return <>
    {shots.map(shot => <Shot key={shot.id} shot={shot} texture={textures[shot.image]} beat={beat}/>)}
    <Wall textures={textures} beat={beat}/>
  </>;
}

export default function Scene({beat}) {
  return <div className="reel-layer"><Canvas dpr={[1, 2]} camera={{fov: 35, position: [0, 0, 10], near: 0.1, far: 100}} gl={{antialias: true, alpha: true}}>
    <React.Suspense fallback={null}><Reel beat={beat}/></React.Suspense>
  </Canvas></div>;
}
