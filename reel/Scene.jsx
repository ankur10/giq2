import React, {useMemo, useRef} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import * as THREE from 'three';
import {shots, wall, close, images, phase, span, mix, inOut, out} from './shots.mjs';

const CARD_HEIGHT = 3.7, PIXELS = [1440, 900], CARD_COLOUR = '#f7f8f9';
const part = (texture, [x, y, w, h]) => { const t = texture.clone(); t.repeat.set(w, h); t.offset.set(x, 1 - y - h); t.needsUpdate = true; return t; };

// Even margins, in scene units: around the screen on its card, and around a lifted region.
const CARD_MARGIN = 0.1, PANEL_MARGIN = 0.085, RADIUS = 0.07;
function roundedRect(w, h, r) {
  const x = -w / 2, y = -h / 2, s = new THREE.Shape();
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return new THREE.ShapeGeometry(s, 10);
}

// One product screen: it flies in as a card with an even margin round it, then the part being
// talked about lifts off towards the viewer on its own padded panel while the rest falls back.
function Shot({shot, texture, beat}) {
  const group = useRef(), card = useRef(), cardBack = useRef(), panel = useRef(), shadow = useRef();
  const g = useMemo(() => {
    const [fx, fy, fw, fh] = shot.focusRect;
    const height = CARD_HEIGHT, width = height * PIXELS[0] / PIXELS[1];
    const size = [fw * width, fh * height], padded = [size[0] + PANEL_MARGIN * 2, size[1] + PANEL_MARGIN * 2];
    return {width, height, size, home: [(fx + fw / 2 - 0.5) * width, (0.5 - fy - fh / 2) * height],
      grow: Math.min(4.3 / padded[0], 3.25 / padded[1], 2.7), focusMap: part(texture, shot.focusRect),
      cardShape: roundedRect(width + CARD_MARGIN * 2, height + CARD_MARGIN * 2, RADIUS * 1.6), panelShape: roundedRect(padded[0], padded[1], RADIUS), shadowShape: roundedRect(padded[0] * 1.03, padded[1] * 1.05, RADIUS)};
  }, [shot, texture]);

  useFrame(({clock}) => {
    const p = phase(shot, beat());
    group.current.visible = p.visible;
    if (!p.visible) return;
    const side = shot.side, drift = Math.sin(clock.elapsedTime * 0.5 + shot.from) * 0.02;
    group.current.position.set(mix(side * 15, side * 2.2, p.enter) - side * 17 * p.leave, drift * 4, mix(-3, 0, p.enter));
    group.current.rotation.set(0.02, mix(side * 1.0, -side * 0.15, p.enter) - side * 0.6 * p.leave + drift, 0);
    const dim = mix(1, 0.34, p.lift);
    card.current.material.color.setScalar(dim);
    cardBack.current.material.color.set(CARD_COLOUR).multiplyScalar(dim);
    // Lifting brings the panel nearer the camera, which pushes it outwards on screen; lean it back in.
    panel.current.position.set(mix(g.home[0], -side * 0.3, p.lift), mix(g.home[1], 0, p.lift), 0.012 + p.lift * 1.5);
    panel.current.scale.setScalar(mix(1, g.grow, p.lift));
    panel.current.visible = p.lift > 0.001;
    shadow.current.material.opacity = 0.5 * p.lift;
    shadow.current.position.set(0.05 * p.lift, -0.09 * p.lift, -0.12 * p.lift);
  });

  return <group ref={group} visible={false}>
    <mesh ref={cardBack} geometry={g.cardShape} position-z={-0.004}><meshBasicMaterial toneMapped={false}/></mesh>
    <mesh ref={card} scale={[g.width, g.height, 1]}><planeGeometry/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    <group ref={panel} visible={false}>
      <mesh ref={shadow} geometry={g.shadowShape}><meshBasicMaterial color="#03060f" transparent opacity={0} depthWrite={false}/></mesh>
      <mesh geometry={g.panelShape} position-z={0.002}><meshBasicMaterial color={shot.focusBackground} toneMapped={false}/></mesh>
      <mesh scale={[g.size[0], g.size[1], 1]} position-z={0.004}><planeGeometry/><meshBasicMaterial map={g.focusMap} toneMapped={false}/></mesh>
    </group>
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
