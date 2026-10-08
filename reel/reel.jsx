import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {shots, close, beatAt, DURATION, phase} from './shots.mjs';
import Scene from './Scene.jsx';

const params = new URLSearchParams(location.search);
// ?t=<seconds> shows one frozen frame; ?autostart begins without a key press, for recording.
const frozen = params.has('t') ? Number(params.get('t')) : null;

// What the captions should show at a given beat; the page re-renders only when this changes.
const view = b => ({intro: b < 7, shot: shots.findIndex(s => phase(s, b).name), line: shots.some(s => phase(s, b).line), mark: b >= close.from + 1, closing: b >= close.from + 2.5 && b < close.to - 0.8});

function Reel() {
  const [started, setStarted] = useState(frozen !== null || params.has('autostart'));
  const origin = useRef(performance.now());
  const root = useRef(null);
  const seconds = () => frozen ?? (started ? Math.min(DURATION, (performance.now() - origin.current) / 1000) : 0);
  const beat = () => beatAt(seconds());
  const start = () => { origin.current = performance.now(); setStarted(true); };
  const [v, setV] = useState(() => view(beat()));

  useEffect(() => {
    const onKey = event => {
      if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); if (!started) start(); }
      if (event.key === 'r' || event.key === 'R') start();
      if (event.key === 'f' || event.key === 'F') document.fullscreenElement ? document.exitFullscreen() : root.current.requestFullscreen?.();
    };
    addEventListener('keydown', onKey);
    let frame, key = '';
    const loop = () => { const next = view(beat()), nextKey = JSON.stringify(next); if (nextKey !== key) { key = nextKey; setV(next); } frame = requestAnimationFrame(loop); };
    frame = requestAnimationFrame(loop);
    return () => { removeEventListener('keydown', onKey); cancelAnimationFrame(frame); };
  }, [started]);

  return <div className="reel" ref={root} onClick={() => { if (!started) start(); }}>
    <Scene beat={beat}/>
    <div className="reel-layer reel-type">
      <p className="reel-mark" data-on={started && v.intro}>GrowthIQ</p>
      {shots.map((shot, i) => <div key={shot.id} className="reel-caption" data-side={shot.side} data-on={v.shot === i}>
        <small>{String(i + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}</small><h2>{shot.name}</h2><p data-on={v.shot === i && v.line}>{shot.line}</p></div>)}
      <div className="reel-close"><p className="reel-mark" data-on={v.mark}>{close.mark}</p><p className="reel-line" data-on={v.closing}>{close.line}</p></div>
    </div>
    {!started && <p className="reel-start">Press space to begin</p>}
  </div>;
}

Promise.all([document.fonts.load('16px "Source Sans 3"'), document.fonts.load('16px "Source Serif 4"')])
  .then(() => createRoot(document.getElementById('reel-root')).render(<Reel/>));
