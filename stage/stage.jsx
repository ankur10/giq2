import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {beats, lenses, lensSeconds} from './story.mjs';
import {createDirector, actionForKey} from './director.mjs';
import Overlay from './Overlay.jsx';
import Scene from './Scene.jsx';
import ProductLayer from './ProductLayer.jsx';

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
  const [targets, setTargets] = useState(null);
  // Opened part-way through a beat: CSS shows the finished state instead of replaying.
  const [settled, setSettled] = useState(Number(params.get('t') || 0) >= 1);
  useEffect(() => director.subscribe(() => setSettled(false)), [director]);
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
      const seconds = s.progress * beats[s.beat].duration;
      const shown = s.id === 'lenses' ? Math.max(0, Math.min(lenses.length, Math.floor((seconds - lensSeconds / 2) / lensSeconds) + 1)) : s.beat > 2 ? lenses.length : 0;
      setLensesShown(current => current === shown ? current : shown);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [director]);

  return <div className="stage" ref={root} data-beat={state.id} data-motion={params.get('motion') || 'auto'} data-settled={settled}>
    <Scene director={director} targets={targets}/>
    <ProductLayer state={state} onTargets={setTargets}/>
    <Overlay state={state} lensesShown={lensesShown}/>
    <ol className="stage-progress" aria-label="Beat">{beats.map((b, i) => <li key={b.id} aria-current={i === state.beat ? 'step' : undefined}/>)}</ol>
  </div>;
}

createRoot(document.getElementById('stage-root')).render(<Stage/>);
