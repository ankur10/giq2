import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {beatAt, DURATION} from './score.mjs';
import {defaultAnchors} from './line.mjs';
import Scene, {cardSheets} from './Scene.jsx';
import {loadSheets} from '../stage/Sealed.jsx';
import Type from './Type.jsx';

const params = new URLSearchParams(location.search);
// ?t=<seconds> shows one frozen frame; ?autostart begins without a key press, for recording.
const frozen = params.has('t') ? Number(params.get('t')) : null;

function Film() {
  const [started, setStarted] = useState(frozen !== null || params.has('autostart'));
  const origin = useRef(performance.now());
  const anchors = useRef(structuredClone(defaultAnchors));
  const root = useRef(null);
  // One clock for everything on screen. Sound will take this over when it is added.
  const seconds = () => frozen ?? (started ? Math.min(DURATION, (performance.now() - origin.current) / 1000) : 0);
  const beat = () => beatAt(seconds());
  const start = () => { origin.current = performance.now(); setStarted(true); };

  useEffect(() => {
    const onKey = event => {
      if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); if (!started) start(); }
      if (event.key === 'r' || event.key === 'R') start();
      if (event.key === 'f' || event.key === 'F') document.fullscreenElement ? document.exitFullscreen() : root.current.requestFullscreen?.();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [started]);

  return <div className="film" ref={root} onClick={() => { if (!started) start(); }}>
    <Scene beat={beat} anchors={anchors}/>
    <Type beat={beat} anchors={anchors}/>
    {!started && <p className="film-start">Press space to begin</p>}
  </div>;
}

Promise.all([loadSheets(cardSheets), document.fonts.load('16px "Source Sans 3"'), document.fonts.load('16px "Source Serif 4"')])
  .then(() => createRoot(document.getElementById('film-root')).render(<Film/>));
