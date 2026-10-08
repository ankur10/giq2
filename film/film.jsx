import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {beatAt, DURATION} from './score.mjs';
import {compose, renderWav, LEVEL} from './sound.mjs';
import {defaultAnchors} from './line.mjs';
import Scene, {cardSheets} from './Scene.jsx';
import {loadSheets} from '../stage/Sealed.jsx';
import Type from './Type.jsx';

const params = new URLSearchParams(location.search);
// ?t=<seconds> shows one frozen frame; ?autostart begins without a key press, for recording.
const frozen = params.has('t') ? Number(params.get('t')) : null;
// Sound needs a key press to begin, so a recording run (?autostart) and ?mute are silent.
const silent = frozen !== null || params.has('autostart') || params.has('mute');
// Lets an export script fetch the rendered score.
window.renderScore = async () => { const bytes = new Uint8Array(await (await renderWav()).arrayBuffer()); let text = ''; for (let i = 0; i < bytes.length; i += 32768) text += String.fromCharCode(...bytes.subarray(i, i + 32768)); return btoa(text); };

function Film() {
  const [started, setStarted] = useState(frozen !== null || params.has('autostart'));
  const origin = useRef(performance.now());
  const anchors = useRef(structuredClone(defaultAnchors));
  const root = useRef(null);
  const audio = useRef(null);
  // One clock for everything on screen. With sound it is the audio clock, so picture and sound
  // cannot drift; without sound it is wall time.
  const seconds = () => frozen ?? (!started ? 0 : Math.max(0, Math.min(DURATION, audio.current ? audio.current.ctx.currentTime - audio.current.start : (performance.now() - origin.current) / 1000)));
  const beat = () => beatAt(seconds());
  const start = () => {
    audio.current?.ctx.close(); audio.current = null;
    if (!silent) { const ctx = new AudioContext(), begin = ctx.currentTime + 0.12; audio.current = {ctx, start: begin, master: compose(ctx, ctx.destination, begin)}; }
    origin.current = performance.now(); setStarted(true);
  };

  useEffect(() => {
    const onKey = event => {
      if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); if (!started) start(); }
      if (event.key === 'r' || event.key === 'R') start();
      if ((event.key === 'm' || event.key === 'M') && audio.current) { const g = audio.current.master.gain; g.value = g.value ? 0 : LEVEL; }
      if (event.key === 'f' || event.key === 'F') document.fullscreenElement ? document.exitFullscreen() : root.current.requestFullscreen?.();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [started]);

  return <div className="film" ref={root} onClick={() => { if (!started) start(); }}>
    <Scene beat={beat} anchors={anchors}/>
    <Type beat={beat} anchors={anchors}/>
    {!started && <p className="film-start">Press space to begin</p>}
    {/* ?sync flashes a corner marker on the first frames so an export can line sound up with picture. */}
    {started && params.has('sync') && <i className="film-sync"/>}
  </div>;
}

Promise.all([loadSheets(cardSheets), document.fonts.load('16px "Source Sans 3"'), document.fonts.load('16px "Source Serif 4"')])
  .then(() => createRoot(document.getElementById('film-root')).render(<Film/>));
