import React, {lazy, Suspense, useEffect, useRef, useState} from 'react';
import Inbox from './screens/Inbox.jsx';
import RadarMail from './screens/RadarMail.jsx';
import Briefing from './screens/Briefing.jsx';
import Markets from './screens/Markets.jsx';
import Competitors from './screens/Competitors.jsx';
import Benchmark from './screens/Benchmark.jsx';
import Ask from './screens/Ask.jsx';
import Answer from './screens/Answer.jsx';
import Expert from './screens/Expert.jsx';
import Customers from './screens/Customers.jsx';
import Studio from './screens/Studio.jsx';
import Pack from './screens/Pack.jsx';
import RadarApp from './screens/RadarApp.jsx';

// The 3D field is only needed in act 2, so it loads on its own.
const Scene = lazy(() => import('./Scene.jsx'));
const FIELD = ['ecosystem', 'field', 'market'];

export const PANEL = {w: 1440, h: 900};
// Screens in the order Maya uses them. `app` screens are product windows and get a frame.
const SCREENS = [['inbox', Inbox], ['radar', RadarMail], ['briefing', Briefing, true], ['markets', Markets, true], ['competitors', Competitors, true], ['benchmark', Benchmark, true], ['ask', Ask, true], ['answer', Answer, true], ['expert', Expert, true], ['customers', Customers, true], ['studio', Studio, true], ['pack', Pack], ['radarapp', RadarApp, true]];
// Laid out in rows that snake back and forth, so each screen sits beside the one before it.
const PER_ROW = 5;
const layout = Object.fromEntries(SCREENS.map(([id], i) => { const row = Math.floor(i / PER_ROW), column = i % PER_ROW; return [id, [(row % 2 ? PER_ROW - 1 - column : column) * 1900, row * 1300]]; }));
const MOVE = 1.4;

const project = (r, c) => ({x: r.x * c.s + c.x, y: r.y * c.s + c.y, w: r.w * c.s, h: r.h * c.s});
function frame(rect, fill) {
  const s = Math.min(innerWidth * fill.w / rect.w, innerHeight * fill.h / rect.h, 2.6);
  return {s, x: innerWidth / 2 - (rect.x + rect.w / 2) * s, y: innerHeight / 2 - (rect.y + rect.h / 2) * s};
}

// The screens laid out in space, the camera that moves between them, the spotlight that dims
// everything but the region in question, the scripted cursor and the text carried between screens.
export default function World({step, index, settled, director}) {
  const world = useRef(null), panels = useRef({}), sealed = useRef({}), live = useRef({s: 1, x: 0, y: 0});
  const [camera, setCamera] = useState(live.current);
  const [spot, setSpot] = useState(null);
  const [cursor, setCursor] = useState({x: 0, y: 0, on: false, click: 0});
  const [flyer, setFlyer] = useState(null);

  useEffect(() => {
    const timers = [], hidden = [];
    let frameId;
    const later = (seconds, fn) => timers.push(setTimeout(fn, settled ? 0 : seconds * 1000));
    const find = ref => { const [screen, name] = ref.split(':'); return (sealed.current[screen] ?? panels.current[screen])?.querySelector(`[data-focus="${name}"]`); };
    // An element's rectangle in world units, read through whatever the camera is doing right now.
    const worldRect = el => {
      const m = new DOMMatrix(getComputedStyle(world.current).transform), r = el.getBoundingClientRect();
      return {x: (r.left - m.e) / m.a, y: (r.top - m.f) / m.a, w: r.width / m.a, h: r.height / m.a};
    };
    const run = () => {
      const everything = () => { const xs = Object.values(layout).map(p => p[0]), ys = Object.values(layout).map(p => p[1]); return {x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) + PANEL.w - Math.min(...xs), h: Math.max(...ys) + PANEL.h - Math.min(...ys)}; };
      const whole = name => name === 'all' ? everything() : {x: layout[name][0], y: layout[name][1], w: PANEL.w, h: PANEL.h};
      const cameraAt = step.cameraAt || 0;
      // Some steps first pull back to show the whole screen being left, so a click in its
      // navigation is visible, then travel on.
      let before = live.current;
      if (step.pre && !settled) { before = frame(whole(step.pre), {w: 0.94, h: 0.94}); live.current = before; setCamera(before); setSpot(null); }
      // Measured when the camera leaves, not before: a screen may have changed its view by then.
      later(cameraAt, () => {
        const target = step.focus && find(step.screen + ':' + step.focus);
        const rect = target ? worldRect(target) : whole(step.screen);
        const after = frame(rect, target ? {w: 0.8, h: 0.7} : step.screen === 'all' ? {w: 0.9, h: 0.72} : {w: 0.94, h: 0.94});
        live.current = after; setCamera(after); setSpot(target && step.spot !== false ? project(rect, after) : null);
        // A click made before the camera leaves belongs to the screen being left.
        if (!(step.cursor ?? []).some(action => action.at >= cameraAt)) setCursor(c => ({...c, on: false}));
      });

      if (!step.cursor) setCursor(c => ({...c, on: false}));
      for (const action of step.cursor ?? []) if (!(settled && action.at < cameraAt)) later(action.at, () => {
        const el = find(action.to); if (!el) return;
        const r = project(worldRect(el), action.at < cameraAt ? before : live.current);
        setCursor({x: r.x + Math.min(r.w * 0.5, r.h * 2.2), y: r.y + r.h * 0.62, on: true, click: action.click ? performance.now() : 0});
      });

      if (step.carry && !settled) later(cameraAt, () => {
        const from = find(step.carry.from), to = find(step.carry.to); if (!from || !to) return;
        const after = live.current, a = project(worldRect(from), before), b = project(worldRect(to), after);
        const source = getComputedStyle(from), style = getComputedStyle(to);
        const size = parseFloat(style.fontSize) * after.s;
        hidden.push(from, to); from.style.visibility = to.style.visibility = 'hidden';
        setFlyer({text: to.value ?? to.textContent, a, b, start: parseFloat(source.fontSize) * before.s / size, moving: false,
          // The serif has an optical-size axis; pin it to the destination's own size so the text wraps identically when scaled up.
          font: {fontVariationSettings: `"opsz" ${parseFloat(style.fontSize)}`, fontFamily: style.fontFamily, fontWeight: style.fontWeight, fontSize: size, lineHeight: style.lineHeight === 'normal' ? 1.2 : parseFloat(style.lineHeight) / parseFloat(style.fontSize), letterSpacing: parseFloat(style.letterSpacing) * after.s || 0, color: style.color}});
        frameId = requestAnimationFrame(() => requestAnimationFrame(() => setFlyer(f => f && {...f, moving: true})));
        later(cameraAt + MOVE + 0.1, () => { hidden.splice(0).forEach(el => { el.style.visibility = ''; }); setFlyer(null); });
      });
    };
    // Screens mount their sealed content a tick after the world does.
    frameId = requestAnimationFrame(run);
    return () => { timers.forEach(clearTimeout); cancelAnimationFrame(frameId); hidden.forEach(el => { el.style.visibility = ''; }); setFlyer(null); };
  }, [step.id]);

  const fieldOn = FIELD.includes(step.id);
  return <>
    <div className="stage-world" ref={world} style={{transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.s})`}}>
      {SCREENS.map(([id, Screen, app]) => <div key={id} className={'stage-panel' + (app ? ' stage-panel-app' : '')} style={{left: layout[id][0], top: layout[id][1], width: PANEL.w, height: PANEL.h}} ref={el => { panels.current[id] = el; }}>
        <Screen stepId={step.id} index={index} data-settled={settled} ref={root => { sealed.current[id] = root; }}/>
      </div>)}
    </div>
    <div className="stage-spot" data-on={!!spot} style={spot ? {left: spot.x - 18, top: spot.y - 18, width: spot.w + 36, height: spot.h + 36} : undefined}/>
    <div className="stage-veil" data-on={step.id === 'field' || step.id === 'end'}/>
    <div className="stage-scene" data-on={step.id === 'field'}><Suspense fallback={null}>{fieldOn && <Scene director={director}/>}</Suspense></div>
    {flyer && <div className="stage-flyer" style={{left: flyer.b.x, top: flyer.b.y, width: flyer.b.w, ...flyer.font, transform: flyer.moving ? 'none' : `translate(${flyer.a.x - flyer.b.x}px, ${flyer.a.y - flyer.b.y}px) scale(${flyer.start})`}}>{flyer.text}</div>}
    <div className="stage-cursor" data-on={cursor.on} style={{transform: `translate(${cursor.x}px, ${cursor.y}px)`}}>
      {cursor.click > 0 && <span className="stage-click" key={cursor.click}/>}
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3v16l4.5-4 2.8 6.2 2.6-1.2-2.8-6.1H18z"/></svg>
    </div>
  </>;
}
