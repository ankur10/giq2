import React, {useMemo, useRef} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber';
import * as THREE from 'three';
import {shots, wall, close, images, phase, span, mix, inOut, out} from './shots.mjs';

const CARD_HEIGHT = 4.6, PIXELS = [1440, 900], CARD_COLOUR = '#f7f8f9';
// Even margins, in scene units: around the screen on its card, and around a lifted region.
const CARD_MARGIN = 0.11, PANEL_MARGIN = 0.1, RADIUS = 0.08;
// The largest a lifted panel may grow to, before perspective.
const PANEL_MAX = [5.5, 4.2];
function roundedRect(w, h, r) {
  const x = -w / 2, y = -h / 2, s = new THREE.Shape();
  s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return new THREE.ShapeGeometry(s, 10);
}

// One product screen: it arrives as a card with an even margin round it, then the parts being
// talked about lift off towards the viewer on their own padded panels while the rest falls back.
function Shot({shot, texture, beat}) {
  const group = useRef(), card = useRef(), cardBack = useRef(), panels = useRef([]);
  const g = useMemo(() => {
    const height = CARD_HEIGHT, width = height * PIXELS[0] / PIXELS[1], pair = shot.panels.length > 1;
    return {width, height, cardShape: roundedRect(width + CARD_MARGIN * 2, height + CARD_MARGIN * 2, RADIUS * 1.6), panels: shot.panels.map((panel, n) => {
      const [x, y, w, h] = panel.rect, pan = panel.pan;
      // A panning panel shows a window onto its region: part of the width or part of the height.
      const seen = [pan?.axis === 'x' ? w * pan.view : w, pan?.axis === 'y' ? h * pan.view : h];
      const size = [seen[0] * width, seen[1] * height], padded = [size[0] + PANEL_MARGIN * 2, size[1] + PANEL_MARGIN * 2];
      const map = texture.clone(); map.repeat.set(seen[0], seen[1]); map.needsUpdate = true;
      // Two panels share the stage: the first steps back and aside when the second arrives.
      const limit = pair ? 0.86 : 1;
      return {size, map, pan, rect: panel.rect, seen, background: panel.background, home: [(x + seen[0] / 2 - 0.5) * width, (0.5 - y - seen[1] / 2) * height],
        grow: Math.min(PANEL_MAX[0] * limit / padded[0], PANEL_MAX[1] * limit / padded[1], 3.2), shape: roundedRect(padded[0], padded[1], RADIUS), shadowShape: roundedRect(padded[0] * 1.03, padded[1] * 1.05, RADIUS),
        rest: pair ? (n === 0 ? [-0.75, 0.42, 1.0] : [0.7, -0.34, 1.75]) : [0, 0, 1.5]};
    })};
  }, [shot, texture]);

  useFrame(({clock}) => {
    const p = phase(shot, beat());
    group.current.visible = p.visible;
    if (!p.visible) return;
    const side = shot.side, drift = Math.sin(clock.elapsedTime * 0.5 + shot.from) * 0.02, x = side * 1.9, tilt = -side * 0.13;
    // Three ways to arrive; every shot leaves the same way, off to the side it came to rest on.
    const from = shot.entry === 'rise' ? {position: [x, -8, -1], rotation: [0.7, tilt, 0]} : shot.entry === 'depth' ? {position: [x * 0.4, 0.6, -26], rotation: [0.02, tilt * 3, 0]} : {position: [side * 15, 0, -3], rotation: [0.02, side * 1.0, 0]};
    const to = {position: [x, 0, 0], rotation: [0.02, tilt, 0]};
    group.current.position.set(mix(from.position[0], to.position[0], p.enter) - side * 17 * p.leave, mix(from.position[1], to.position[1], p.enter) + drift * 4, mix(from.position[2], to.position[2], p.enter));
    group.current.rotation.set(mix(from.rotation[0], to.rotation[0], p.enter), mix(from.rotation[1], to.rotation[1], p.enter) - side * 0.6 * p.leave + drift, 0);
    const dim = mix(1, 0.3, p.lift);
    card.current.material.color.setScalar(dim);
    cardBack.current.material.color.set(CARD_COLOUR).multiplyScalar(dim);

    g.panels.forEach((panel, n) => {
      const node = panels.current[n], lift = p.lifts[n], behind = n === 0 && g.panels.length > 1 ? p.lifts[1] : 0;
      // Lifting brings a panel nearer the camera, which pushes it outwards on screen; lean it back in.
      const rest = [(panel.rest[0] - behind * 0.25) * side - side * 0.25, panel.rest[1] + behind * 0.1, panel.rest[2] - behind * 0.3];
      node.visible = lift > 0.001;
      node.position.set(mix(panel.home[0], rest[0], lift), mix(panel.home[1], rest[1], lift), 0.012 + n * 0.01 + lift * rest[2]);
      node.scale.setScalar(mix(1, panel.grow, lift));
      const [shadow, back, face] = node.children;
      shadow.material.opacity = 0.5 * lift;
      shadow.position.set(0.05 * lift, -0.09 * lift, -0.12 * lift);
      const shade = mix(1, 0.55, behind);
      back.material.color.set(panel.background).multiplyScalar(shade);
      face.material.color.setScalar(shade);
      // The window slides across (or down) its region while the panel is up.
      const [rx, ry, rw, rh] = panel.rect, slide = panel.pan ? p.slide : 0;
      panel.map.offset.set(rx + (panel.pan?.axis === 'x' ? (rw - panel.seen[0]) * slide : 0), 1 - ry - panel.seen[1] - (panel.pan?.axis === 'y' ? (rh - panel.seen[1]) * slide : 0));
    });
  });

  return <group ref={group} visible={false}>
    <mesh ref={cardBack} geometry={g.cardShape} position-z={-0.004}><meshBasicMaterial toneMapped={false}/></mesh>
    <mesh ref={card} scale={[g.width, g.height, 1]}><planeGeometry/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    {g.panels.map((panel, n) => <group key={n} ref={node => { panels.current[n] = node; }} visible={false}>
      <mesh geometry={panel.shadowShape}><meshBasicMaterial color="#03060f" transparent opacity={0} depthWrite={false}/></mesh>
      <mesh geometry={panel.shape} position-z={0.002}><meshBasicMaterial toneMapped={false}/></mesh>
      <mesh scale={[panel.size[0], panel.size[1], 1]} position-z={0.004}><planeGeometry/><meshBasicMaterial map={panel.map} toneMapped={false}/></mesh>
    </group>)}
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
