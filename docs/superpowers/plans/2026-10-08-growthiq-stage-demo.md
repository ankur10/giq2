# GrowthIQ Stage Demo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `stage.html`, a presenter-driven, six-beat, roughly 100-second keynote demo in which a 3D constellation of markets resolves into the real GrowthIQ answer and brief screens.

**Architecture:** A standalone React page. A pure `director` holds (beat, progress); three layers (3D `Scene`, DOM `Overlay`, DOM `ProductLayer`) render only from that state. Story text lives in one data module; the constellation layout is a seeded pure function.

**Tech Stack:** React 19, three 0.180, @react-three/fiber 9, @react-three/postprocessing (new), esbuild, `node --test`.

**Spec:** `docs/superpowers/specs/2026-10-08-growthiq-stage-demo-design.md`

## Global Constraints

- Do not modify `app.js`, `keynote*`, `growthiq-demo*`, `studio-*`, `ask-results*` or any file with uncommitted changes that this plan did not create.
- Commit source files only. Never `git add assets/studio/` (generated; it also contains other in-progress work) and never add `MnM_Growth_Explainer_Ostrel.mp4`.
- Pure modules use the `.mjs` extension (the package has no `"type":"module"`; the spec's `.js` names become `.mjs`).
- All on-screen words come from `stage/story.mjs`. No other file contains story copy.
- No network requests at run time. Fonts come from `assets/*.woff2`.
- Colours: stage navy `#14213d`, edge `#070b16`, orange `#e07a26`, cool point `#9fb3d1`.
- Controls: next = PageDown, ArrowRight, Space; back = PageUp, ArrowLeft; restart = R; jump = 1–6; fullscreen = F.
- Visual tasks (4, 5, 7) are tuned by eye. Their code blocks give the structure and state mapping; exact numbers are adjusted against the screenshot acceptance in each task.

## File Structure

| File | Responsibility |
| --- | --- |
| `stage/story.mjs` | Beats, timings, every on-screen word. |
| `stage/director.mjs` | Beat state machine and key mapping. |
| `stage/constellation.mjs` | Seeded layout of points and links. |
| `stage/test/director.test.mjs`, `stage/test/constellation.test.mjs` | Unit tests. |
| `stage/stage.jsx` | Entry: wires input, director, three layers, fallbacks. |
| `stage/Scene.jsx` | 3D layer. |
| `stage/Flat.jsx` | 2D fallback drawing of the same layout. |
| `stage/Overlay.jsx` | Question, cards, closing line. |
| `stage/ProductLayer.jsx` | Answer and brief screens. |
| `stage.html`, `stage.css` | Page shell and stage styling. |
| `stage/SCRIPT.md` | One-page presenter script. |
| Modify `build-studio.cjs`, `build-site.cjs`, `package.json` | Build wiring, test script, dependency. |

---

### Task 1: Story data, director and key mapping

**Files:**
- Create: `stage/story.mjs`, `stage/director.mjs`, `stage/test/director.test.mjs`
- Modify: `package.json` (add `"test": "node --test stage/test/"`)

**Interfaces:**
- Produces: `beats: {id,name,duration}[]`, `question`, `closing`, `lenses: {id,label,card}[]`, `answer: {heading,summary}`, `brief: {title,text}[]`, `nodes: {name,role,pos:[x,y,z]}[]`, `path: string[]`, `faint: string[]` from `story.mjs`.
- Produces: `createDirector({beats, autoplay=false, start=0, startProgress=0})` returning `{state(), next(), back(), restart(), jump(n), tick(dt), subscribe(fn)}` where `state()` is `{beat, id, progress, count}`; and `actionForKey(key)` returning `{type:'next'|'back'|'restart'|'fullscreen'}`, `{type:'jump', beat}` or `null`.

- [ ] **Step 1: Write `stage/story.mjs`**

```js
// Every word the audience reads. Companies are the explainer film's fictional ones.
export const beats = [
  {id: 'question', name: 'The question', duration: 10},
  {id: 'world', name: 'The world', duration: 15},
  {id: 'lenses', name: 'Three lenses', duration: 25},
  {id: 'convergence', name: 'Convergence', duration: 20},
  {id: 'brief', name: 'The brief', duration: 18},
  {id: 'pullback', name: 'Pull back', duration: 12},
];
export const question = 'Where is Ostrel’s next growth?';
export const closing = 'We see growth before it happens.';
export const lenses = [
  {id: 'markets', label: 'Markets', card: 'Bigger battery packs need fire protection, and fire protection needs new coatings.'},
  {id: 'customers', label: 'Customers', card: 'Talmir Motors: 22% electric five years ago. 70% of today’s pipeline.'},
  {id: 'competitors', label: 'Competitors', card: 'Quendra Chemicals: hiring battery engineers, filing patents, building a pilot line.'},
];
export const answer = {
  heading: 'Battery fire-protection coatings',
  summary: 'A need created in electric-vehicle battery packs is reaching coatings. One of Ostrel’s customers is already moving towards it, and a competitor is building capability for it.',
};
export const brief = [
  {title: 'Where to play', text: 'Battery fire-protection coatings for electric-vehicle packs.'},
  {title: 'Why now', text: 'Talmir Motors’ pipeline is now mostly electric.'},
  {title: 'Competitor moves', text: 'Quendra Chemicals is hiring, patenting and piloting.'},
  {title: 'Recommended decision', text: 'Investigate fit with Talmir’s new battery-pack line before the specification is set.'},
];
// Named points in the constellation. Positions are in scene units; Ostrel is the origin.
export const nodes = [
  {name: 'Ostrel', role: 'company', pos: [0, 0, 0]},
  {name: 'Battery packs', role: 'market', pos: [-6.2, 1.9, -1.2]},
  {name: 'Fire protection', role: 'market', pos: [-4.1, 0.9, 0.6]},
  {name: 'New coatings', role: 'market', pos: [-2.0, 0.3, 0.1]},
  {name: 'Electric vehicles', role: 'market', pos: [-7.4, 3.2, 0.8]},
  {name: 'Wind energy', role: 'market', pos: [5.6, 2.6, -1.4]},
  {name: 'Heat pumps', role: 'market', pos: [4.4, -2.7, 1.1]},
  {name: 'Talmir Motors', role: 'customer', pos: [2.6, 1.5, 1.4]},
  {name: 'Quendra Chemicals', role: 'competitor', pos: [1.7, -1.9, -0.9]},
];
export const path = ['Battery packs', 'Fire protection', 'New coatings', 'Ostrel'];
export const faint = ['Wind energy', 'Heat pumps'];
```

- [ ] **Step 2: Write the failing test `stage/test/director.test.mjs`**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {createDirector, actionForKey} from '../director.mjs';
import {beats} from '../story.mjs';

test('starts on the first beat with no progress', () => {
  const d = createDirector({beats});
  assert.deepEqual(d.state(), {beat: 0, id: 'question', progress: 0, count: 6});
});
test('next and back move one beat and stop at the ends', () => {
  const d = createDirector({beats});
  assert.equal(d.back(), false);
  for (let i = 0; i < 5; i++) assert.equal(d.next(), true);
  assert.equal(d.state().id, 'pullback');
  assert.equal(d.next(), false);
  d.back();
  assert.equal(d.state().id, 'brief');
});
test('progress runs to 1 and holds; it never advances the beat without input', () => {
  const d = createDirector({beats});
  d.tick(5);
  assert.equal(d.state().progress, 0.5);
  d.tick(500);
  assert.deepEqual([d.state().beat, d.state().progress], [0, 1]);
});
test('changing beat resets progress and notifies subscribers', () => {
  const d = createDirector({beats});
  const seen = [];
  d.subscribe(s => seen.push(s.id));
  d.tick(3); d.next();
  assert.equal(d.state().progress, 0);
  d.jump(4); d.jump(99); d.restart();
  assert.deepEqual(seen, ['world', 'brief', 'pullback', 'question']);
});
test('autoplay advances at the end of each beat and stops on the last', () => {
  const d = createDirector({beats, autoplay: true});
  d.tick(10);
  assert.equal(d.state().id, 'world');
  for (let i = 0; i < 100; i++) d.tick(5);
  assert.deepEqual([d.state().id, d.state().progress], ['pullback', 1]);
});
test('start options open a chosen beat at a chosen progress', () => {
  const d = createDirector({beats, start: 2, startProgress: 1});
  assert.deepEqual([d.state().id, d.state().progress], ['lenses', 1]);
});
test('keys map to actions', () => {
  for (const k of ['PageDown', 'ArrowRight', ' ']) assert.deepEqual(actionForKey(k), {type: 'next'});
  for (const k of ['PageUp', 'ArrowLeft']) assert.deepEqual(actionForKey(k), {type: 'back'});
  assert.deepEqual(actionForKey('r'), {type: 'restart'});
  assert.deepEqual(actionForKey('F'), {type: 'fullscreen'});
  assert.deepEqual(actionForKey('3'), {type: 'jump', beat: 2});
  assert.equal(actionForKey('7'), null);
  assert.equal(actionForKey('x'), null);
});
```

- [ ] **Step 3: Add the test script and run to see it fail**

Add `"test": "node --test stage/test/"` to `scripts` in `package.json`.
Run: `npm test`
Expected: FAIL, cannot find module `../director.mjs`.

- [ ] **Step 4: Write `stage/director.mjs`**

```js
// Holds which beat is showing and how far its animation has run. Only input moves the beat,
// except in autoplay (recording) mode.
export function createDirector({beats, autoplay = false, start = 0, startProgress = 0}) {
  const last = beats.length - 1;
  let beat = Math.max(0, Math.min(last, start));
  let elapsed = startProgress * beats[beat].duration;
  const listeners = new Set();
  const state = () => ({beat, id: beats[beat].id, progress: Math.min(1, elapsed / beats[beat].duration), count: beats.length});
  const emit = () => listeners.forEach(fn => fn(state()));
  function go(target) {
    const next = Math.max(0, Math.min(last, target));
    if (next === beat) return false;
    beat = next; elapsed = 0; emit();
    return true;
  }
  return {
    state,
    next: () => go(beat + 1),
    back: () => go(beat - 1),
    jump: go,
    restart() { beat = 0; elapsed = 0; emit(); },
    tick(seconds) {
      elapsed += seconds;
      if (autoplay && beat < last && elapsed >= beats[beat].duration) go(beat + 1);
    },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };
}

export function actionForKey(key) {
  if (key === 'PageDown' || key === 'ArrowRight' || key === ' ') return {type: 'next'};
  if (key === 'PageUp' || key === 'ArrowLeft') return {type: 'back'};
  if (key === 'r' || key === 'R') return {type: 'restart'};
  if (key === 'f' || key === 'F') return {type: 'fullscreen'};
  if (/^[1-6]$/.test(key)) return {type: 'jump', beat: Number(key) - 1};
  return null;
}
```

- [ ] **Step 5: Run tests**

Run: `npm test`
Expected: 7 tests pass.

- [ ] **Step 6: Commit**

```bash
git add stage/story.mjs stage/director.mjs stage/test/director.test.mjs package.json
git commit -m "Add stage demo story data and director"
```

---

### Task 2: Constellation layout

**Files:**
- Create: `stage/constellation.mjs`, `stage/test/constellation.test.mjs`

**Interfaces:**
- Consumes: `nodes`, `path` from `story.mjs`.
- Produces: `buildConstellation({seed=7, count=320, nodes, path})` returning `{points: {x,y,z,name,role}[], links: [number,number][], index: Record<string,number>, pathLinks: [number,number][]}`. Named nodes come first in `points`, in the order given; unnamed points have `name: null, role: 'market'`.

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {buildConstellation} from '../constellation.mjs';
import {nodes, path} from '../story.mjs';

const build = (seed = 7) => buildConstellation({seed, nodes, path});

test('same seed gives the same layout, different seed differs', () => {
  assert.deepEqual(build(), build());
  assert.notDeepEqual(build().points[50], build(8).points[50]);
});
test('has the requested number of points with named nodes first', () => {
  const c = build();
  assert.equal(c.points.length, 320);
  nodes.forEach((n, i) => {
    assert.equal(c.points[i].name, n.name);
    assert.equal(c.index[n.name], i);
    assert.deepEqual([c.points[i].x, c.points[i].y, c.points[i].z], n.pos);
  });
  assert.equal(c.points[nodes.length].name, null);
});
test('the path is linked end to end', () => {
  const c = build();
  assert.deepEqual(c.pathLinks, path.slice(1).map((name, i) => [c.index[path[i]], c.index[name]]));
});
test('every point has a link and links are valid, unique and not self-links', () => {
  const c = build();
  const linked = new Set(), seen = new Set();
  for (const [a, b] of c.links) {
    assert.ok(a !== b && a >= 0 && b >= 0 && a < 320 && b < 320);
    const key = Math.min(a, b) + ':' + Math.max(a, b);
    assert.ok(!seen.has(key)); seen.add(key);
    linked.add(a); linked.add(b);
  }
  assert.equal(linked.size, 320);
});
test('unnamed points keep clear of Ostrel so it reads as the centre', () => {
  const c = build();
  for (const p of c.points.slice(nodes.length)) assert.ok(Math.hypot(p.x, p.y, p.z) > 1.2);
});
```

- [ ] **Step 2: Run to see it fail**

Run: `npm test`
Expected: FAIL, cannot find module `../constellation.mjs`.

- [ ] **Step 3: Write `stage/constellation.mjs`**

```js
// Deterministic market network: the same seed always gives the same stage picture.
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildConstellation({seed = 7, count = 320, nodes, path}) {
  const random = mulberry32(seed);
  const points = nodes.map(n => ({x: n.pos[0], y: n.pos[1], z: n.pos[2], name: n.name, role: n.role}));
  const index = Object.fromEntries(nodes.map((n, i) => [n.name, i]));
  while (points.length < count) {
    // A wide, shallow cloud: a stage screen is 16:9 and depth should read as layers, not a ball.
    const p = {x: (random() * 2 - 1) * 11, y: (random() * 2 - 1) * 5.6, z: (random() * 2 - 1) * 4.5, name: null, role: 'market'};
    if (Math.hypot(p.x, p.y, p.z) > 1.2) points.push(p);
  }
  const links = [], seen = new Set();
  const add = (a, b) => {
    const key = Math.min(a, b) + ':' + Math.max(a, b);
    if (a === b || seen.has(key)) return;
    seen.add(key); links.push([a, b]);
  };
  const pathLinks = path.slice(1).map((name, i) => [index[path[i]], index[name]]);
  pathLinks.forEach(([a, b]) => add(a, b));
  points.forEach((p, i) => {
    const nearest = points
      .map((q, j) => [j, (p.x - q.x) ** 2 + (p.y - q.y) ** 2 + (p.z - q.z) ** 2])
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1]);
    add(i, nearest[0][0]);
    add(i, nearest[1][0]);
  });
  return {points, links, index, pathLinks};
}
```

- [ ] **Step 4: Run tests**

Run: `npm test`
Expected: 12 tests pass.

- [ ] **Step 5: Commit**

```bash
git add stage/constellation.mjs stage/test/constellation.test.mjs
git commit -m "Add seeded constellation layout for the stage demo"
```

---

### Task 3: Page shell, build wiring, input and overlay (rehearsable skeleton)

**Files:**
- Create: `stage.html`, `stage.css`, `stage/stage.jsx`, `stage/Overlay.jsx`
- Modify: `build-studio.cjs` (entry points and cleanup pattern), `build-site.cjs` (file list)

**Interfaces:**
- Consumes: `createDirector`, `actionForKey`, story exports.
- Produces: `<Overlay state={{beat,id,progress,count}} />`; `stage.jsx` passes the same `state` and the `director` object to `Scene` and `ProductLayer` in later tasks. URL options read in `stage.jsx`: `?autoplay`, `?beat=1..6`, `?t=0..1`, `?motion=full`.

- [ ] **Step 1: Build wiring**

In `build-studio.cjs`, add `'stage/stage.jsx'` to `entryPoints` and add `stage` to the cleanup pattern's name group, so it reads `(studio-spatial|growthiq-demo|keynote|ask-results|stage|chunk-[A-Z0-9]+)`.
In `build-site.cjs`, add `'stage.html', 'stage.css'` to `files`.

- [ ] **Step 2: Write `stage.html`**

```html
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GrowthIQ · On stage</title>
<link rel="stylesheet" href="ask-results.css"><link rel="stylesheet" href="stage.css">
</head><body><div id="stage-root"></div><script type="module" src="assets/studio/stage.js"></script></body></html>
```

- [ ] **Step 3: Write `stage.css`**

Font faces for Source Serif 4, Source Sans 3 and JetBrains Mono from `assets/*.woff2`; `html,body` full height, no scroll, background `#070b16`; `.stage` fixed 100vw × 100vh with a radial background from `#14213d` at centre to `#070b16`; `.stage-layer` absolutely fills the stage; `.stage-question` centred serif at `clamp(40px,5.2vw,104px)`, white, with a typing reveal (`clip-path` inset animated by `steps()` and an orange caret); `.stage-cards` three glass cards (`background: rgb(255 255 255 / .06)`, 1px `rgb(255 255 255 / .18)` border, `backdrop-filter: blur(10px)`), each with an orange uppercase-free label and one line at `clamp(18px,1.5vw,30px)`; `.stage-closing` centred serif at `clamp(34px,4vw,80px)`; `.stage-progress` six 4px dots bottom-centre at 30% opacity, current one orange; every animated element keyed by `[data-beat]` and `[data-on]` attributes. A `@media (prefers-reduced-motion: reduce)` block inside `.stage:not([data-motion="full"])` replaces transforms with opacity fades.

- [ ] **Step 4: Write `stage/Overlay.jsx`**

```jsx
import React from 'react';
import {question, closing, lenses} from './story.mjs';

// Words that sit above the 3D scene. Visibility is derived from the beat; CSS does the motion.
export default function Overlay({state, lensesShown}) {
  const {id} = state;
  return <div className="stage-layer stage-overlay" data-beat={id}>
    <h1 className="stage-question" data-on={id === 'question' || id === 'world'} data-small={id === 'world'}>{question}</h1>
    <ol className="stage-cards" data-on={id === 'lenses' || id === 'convergence'} data-merged={id === 'convergence'}>
      {lenses.map((lens, i) => <li key={lens.id} data-on={i < lensesShown}><strong>{lens.label}</strong><span>{lens.card}</span></li>)}
    </ol>
    <p className="stage-closing" data-on={id === 'pullback'}>{closing}</p>
  </div>;
}
```

- [ ] **Step 5: Write `stage/stage.jsx`**

```jsx
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {beats, lenses} from './story.mjs';
import {createDirector, actionForKey} from './director.mjs';
import Overlay from './Overlay.jsx';

const params = new URLSearchParams(location.search);

function Stage() {
  const director = useMemo(() => createDirector({
    beats,
    autoplay: params.has('autoplay'),
    start: Number(params.get('beat') || 1) - 1,
    startProgress: Number(params.get('t') || 0),
  }), []);
  const [state, setState] = useState(director.state());
  const [lensesShown, setLensesShown] = useState(0);
  const root = useRef(null);

  useEffect(() => director.subscribe(setState), [director]);
  useEffect(() => {
    const onKey = event => {
      const action = actionForKey(event.key);
      if (!action) return;
      event.preventDefault();
      if (action.type === 'fullscreen') { document.fullscreenElement ? document.exitFullscreen() : root.current.requestFullscreen?.(); return; }
      if (action.type === 'jump') director.jump(action.beat); else director[action.type]();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [director]);
  // One clock for everything. The scene reads progress every frame; React only re-renders
  // when a lens card should appear.
  useEffect(() => {
    let frame, previous = performance.now();
    const loop = now => {
      director.tick(Math.min(0.1, (now - previous) / 1000)); previous = now;
      const s = director.state();
      const shown = s.id === 'lenses' ? Math.min(lenses.length, Math.floor(s.progress * lenses.length + 0.35)) : s.beat > 2 ? lenses.length : 0;
      setLensesShown(current => current === shown ? current : shown);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [director]);

  return <div className="stage" ref={root} data-beat={state.id} data-motion={params.get('motion') || 'auto'}>
    <Overlay state={state} lensesShown={lensesShown}/>
    <ol className="stage-progress" aria-label="Beat">{beats.map((b, i) => <li key={b.id} aria-current={i === state.beat ? 'step' : undefined}/>)}</ol>
  </div>;
}

createRoot(document.getElementById('stage-root')).render(<Stage/>);
```

- [ ] **Step 6: Build and verify in the browser**

Run: `npm run build`
Expected: esbuild lists `assets/studio/stage.js`; "Static site built in dist/".
Serve `dist/` and open `/stage.html`. Verify: navy stage; the question types in; Right/Space/PageDown advance through six beats (dots follow); Left/PageUp go back; R restarts; 1–6 jump; three cards appear one by one on beat 3; closing line on beat 6; `?autoplay` runs unattended; no console errors.

- [ ] **Step 7: Commit**

```bash
git add stage.html stage.css stage/stage.jsx stage/Overlay.jsx build-studio.cjs build-site.cjs
git commit -m "Add stage demo page shell, controls and overlay"
```

---

### Task 4: The 3D scene

**Files:**
- Create: `stage/Scene.jsx`
- Modify: `stage/stage.jsx` (render `<Scene director={director}/>` under the overlay), `stage.css` (labels), `package.json` (dependency)

**Interfaces:**
- Consumes: `buildConstellation`, story `nodes`, `path`, `faint`; `director.state()` read every frame.
- Produces: `<Scene director targets? />` where `targets` (Task 7) is `{x,y}[]` in viewport pixels or `null`.

- [ ] **Step 1: Install the effects library**

Run: `npm install @react-three/postprocessing`
Expected: added to `dependencies`; `npm run build` still succeeds.

- [ ] **Step 2: Write `stage/Scene.jsx`**

Structure:

```jsx
import React, {useMemo, useRef} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {EffectComposer, Bloom, DepthOfField, Vignette} from '@react-three/postprocessing';
import * as THREE from 'three';
import {buildConstellation} from './constellation.mjs';
import {nodes, path, faint} from './story.mjs';

const COOL = new THREE.Color('#9fb3d1'), ORANGE = new THREE.Color('#e07a26'), WHITE = new THREE.Color('#ffffff');
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const span = (t, from, to) => Math.max(0, Math.min(1, (t - from) / (to - from)));

function Field({director, labels}) { /* instanced points, link lines, path line, sweep plane, camera rig */ }

export default function Scene({director, targets = null}) {
  const labels = useRef([]);
  return <div className="stage-layer stage-scene">
    <Canvas dpr={[1, 1.75]} camera={{fov: 38, position: [0, 0, 17]}} gl={{antialias: true, alpha: true}}>
      <Field director={director} labels={labels} targets={targets}/>
      <EffectComposer><Bloom mipmapBlur luminanceThreshold={0.55} intensity={1.1}/><DepthOfField focusDistance={0.02} focalLength={0.06} bokehScale={2.2}/><Vignette darkness={0.7} offset={0.25}/></EffectComposer>
    </Canvas>
    <div className="stage-labels">{nodes.map((n, i) => <span key={n.name} ref={el => labels.current[i] = el} data-role={n.role}>{n.name}</span>)}</div>
  </div>;
}
```

`Field` state mapping, evaluated in one `useFrame` from `director.state()`:

| Beat | Group and camera | Points and lines |
| --- | --- | --- |
| question | Everything at opacity 0. | Hidden. |
| world | Opacity 0→1 over progress 0–0.3. Group `scale.z` 0.02→1 and `rotation.x` 0→−0.32, `rotation.y` 0→0.28 over 0.35–1 (eased): flat web gains depth. Camera z 17. | All cool. Ostrel white, 2.2× size. Label: Ostrel only. |
| lenses | Slow drift: `rotation.y` += 0.02 rad/s. A translucent plane (`PlaneGeometry(0.04,14)`-like slab, additive, cool white) crosses x −12→12 three times, one per third of progress. | Third 1: path lines draw in orange in order and the four path points turn orange (emissive ×2.4 for bloom); labels for path points. Third 2: Talmir point lerps cool→orange and grows 1.8×; label. Third 3: Quendra pulses three times (scale 1→2→1) in orange; label. |
| convergence | Camera z 17→12.5 over progress 0–0.6. Scene opacity 1→0 over 0.55–0.9. (Fly-to targets added in Task 7.) | Lit points stay orange. |
| brief | Scene opacity 0. | Hidden. |
| pullback | Scene opacity 0→1 over 0–0.4; camera z 12.5→24 (eased). | Ostrel-side opportunity point orange and bright; the two `faint` markets pulse softly at 35% orange; labels hidden. |

Implementation notes: points are one `instancedMesh` of `SphereGeometry(0.055, 12, 12)` with `MeshBasicMaterial({toneMapped: false, transparent: true})` and `setColorAt` per frame for the handful of lit indices only; links are one `LineSegments` with `LineBasicMaterial({color: COOL, transparent: true, opacity: 0.16})`; the path is a separate `Line` whose `geometry.setDrawRange` follows progress; unnamed points bob by `sin(time + i)` × 0.06 on y. Labels are DOM spans positioned each frame by projecting the point with `vector.project(camera)`; a label shows only when its `data-on` is set by the mapping above.

- [ ] **Step 3: Label styles in `stage.css`**

`.stage-labels span`: absolute, sans, `clamp(13px,1vw,20px)`, white at 85%, translated 14px right of its point, opacity 0 with a 0.5s fade; `[data-on="true"]` opacity 1.

- [ ] **Step 4: Verify by screenshot**

Build, open `/stage.html?beat=2&t=1`, `?beat=3&t=1`, `?beat=6&t=1` at 1920×1080.
Acceptance: beat 2 reads as a deep field with Ostrel clearly the centre; beat 3 shows one orange path ending at Ostrel, Talmir and Quendra lit, at most six labels, glow visible but text sharp; beat 6 shows one bright point and two faint ones; no console errors; `npm test` still passes.

- [ ] **Step 5: Commit**

```bash
git add stage/Scene.jsx stage/stage.jsx stage.css package.json package-lock.json
git commit -m "Add the 3D constellation scene to the stage demo"
```

---

### Task 5: Product layer

**Files:**
- Create: `stage/ProductLayer.jsx`
- Modify: `stage/stage.jsx` (render it), `stage.css` (frame and transitions)

**Interfaces:**
- Consumes: story `question`, `answer`, `lenses`, `brief`; `state`.
- Produces: `<ProductLayer state onTargets={fn} />`. `onTargets` receives `{x,y}[]` viewport centres of every element carrying `data-fly` once laid out (used in Task 7).

- [ ] **Step 1: Write `stage/ProductLayer.jsx`**

Renders a white product window (`.stage-product`, 78vw × 78vh, centred, 14px radius) visible in `convergence` (fades in over progress 0.55–0.9), `brief`, and shrinking to a point in `pullback`.

- Answer view (convergence): real Ask results classes from `ask-results.css`: `.ar-workspace` > `.ar-result-header` with `.ar-question-row` (the question) and `.ar-tabs` (Answer selected) > `.ar-reader` > `.ar-answer-grid` > `article` with an `h1` (`answer.heading`, typed in via the same clip reveal) and `.ar-prose` paragraph (`answer.summary`), then an "Evidence" list of the three lenses styled as `.ar-source-row` rows. Each heading, paragraph and row carries `data-fly`.
- Brief view (brief): the same window; the article cross-fades to a "Strategy brief" document: `.ar-view-heading`, then the four `brief` sections as `.ar-step-list` > `.ar-step` rows (`.ar-step-number`, title, text), revealed 0.25s apart. A single `.ar-primary` button "Create strategy brief" is shown in the answer view and is highlighted for 0.4s at the start of the brief beat to show the click.
- A small `.stage-product-chrome` bar across the top carries the GrowthIQ wordmark and "Ask GrowthIQ" so the audience can read what it is from the back.

- [ ] **Step 2: Verify by screenshot**

Open `/stage.html?beat=4&t=1` and `?beat=5&t=1` at 1920×1080.
Acceptance: the window is the brightest element; heading readable from the back (≥ 44px at 1080p); three evidence rows labelled Markets, Customers, Competitors; brief shows four sections with the story text; styling visibly matches `/ask-results.html`; no console errors.

- [ ] **Step 3: Commit**

```bash
git add stage/ProductLayer.jsx stage/stage.jsx stage.css
git commit -m "Add the product answer and brief layer to the stage demo"
```

---

### Task 6: Look checkpoint (user approval)

- [ ] **Step 1:** Capture `/stage.html?beat=3&t=1` and `/stage.html?beat=4&t=0.6` at 1920×1080 into `.impeccable/review/stage/` and send both to the user.
- [ ] **Step 2:** Stop. Apply requested changes to Tasks 4–5 output before continuing.

---

### Task 7: Convergence and pull back

**Files:**
- Modify: `stage/Scene.jsx`, `stage/ProductLayer.jsx`, `stage/stage.jsx`, `stage.css`

**Interfaces:**
- Consumes: `onTargets` positions from `ProductLayer`; passes them to `Scene` as `targets`.

- [ ] **Step 1:** In `stage.jsx`, hold `targets` in state; pass `onTargets={setTargets}` and `targets={targets}`.
- [ ] **Step 2:** In `ProductLayer`, after layout and on resize, measure each `[data-fly]` element with `getBoundingClientRect()` and report 6–10 sample points spread along each rect.
- [ ] **Step 3:** In `Scene`, during `convergence` progress 0.15–0.7, lerp each point (index modulo target count) from its constellation position to the target's position unprojected onto the plane z = 0 facing the camera; lit points travel last. Cards in `Overlay` slide to overlap at centre (`data-merged`) over 0–0.25.
- [ ] **Step 4:** In `pullback`, scale `.stage-product` to 0 towards the screen position of the "New coatings" point over progress 0–0.45 while the scene fades back in.
- [ ] **Step 5: Verify.** Step through beats 3→4→5→6 live and with `?autoplay`. Acceptance: points visibly gather into the shape of the window's content before it appears; no pop or flash at the hand-over; back then next replays cleanly; 60fps in the browser's performance overlay.
- [ ] **Step 6: Commit**

```bash
git add stage/Scene.jsx stage/ProductLayer.jsx stage/stage.jsx stage.css
git commit -m "Add convergence and pull-back transitions to the stage demo"
```

---

### Task 8: Fallbacks

**Files:**
- Create: `stage/Flat.jsx`
- Modify: `stage/stage.jsx`, `stage.css`

- [ ] **Step 1:** `Flat.jsx`: an SVG drawing of the same `buildConstellation` layout projected to 2D (x, y, with z as opacity), with the path, Talmir and Quendra lit by beat using the same thresholds as `Scene`.
- [ ] **Step 2:** In `stage.jsx`: detect WebGL once (`document.createElement('canvas').getContext('webgl2')`); render `Flat` when unavailable or when `?flat` is set; wrap `Scene` in an error boundary that swaps to `Flat`.
- [ ] **Step 3:** Reduced motion: when the media query matches and `?motion=full` is absent, pass `still` to `Scene` so camera travel and fly-to are replaced by opacity cross-fades.
- [ ] **Step 4: Verify.** `/stage.html?flat` completes all six beats; no console errors.
- [ ] **Step 5: Commit**

```bash
git add stage/Flat.jsx stage/stage.jsx stage.css
git commit -m "Add no-WebGL and reduced-motion fallbacks to the stage demo"
```

---

### Task 9: Script, docs and final run

**Files:**
- Create: `stage/SCRIPT.md`
- Modify: `README.md` (one row in the preview links table and one in the files table)

- [ ] **Step 1:** Write `stage/SCRIPT.md`: the six beats with on-screen description, spoken line, and the controls table, on one page.
- [ ] **Step 2:** Add `/stage.html` to the README preview table as "GrowthIQ on stage — keynote demo".
- [ ] **Step 3: Final verification.** `npm test`, `npm run build`, then screenshot all six beats at 1920×1080 into `.impeccable/review/stage/`; run `?autoplay` once end to end; check the console.
- [ ] **Step 4: Commit**

```bash
git add stage/SCRIPT.md README.md
git commit -m "Add presenter script and docs for the stage demo"
```
