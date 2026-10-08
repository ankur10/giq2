import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {shots, close, beatAt, DURATION, phase} from './shots.mjs';
import Scene from './Scene.jsx';
import {compose, renderWav} from '../film/sound.mjs';
import {events, LEVEL} from './sound.mjs';
import {BEATS} from './shots.mjs';

const params = new URLSearchParams(location.search);
// ?t=<seconds> shows one frozen frame; ?autostart begins without a key press, for recording.
const frozen = params.has('t') ? Number(params.get('t')) : null;
// Sound needs a key press to begin, so a recording run (?autostart) and ?mute are silent.
const silent = frozen !== null || params.has('autostart') || params.has('mute');
// Lets an export script fetch the rendered score.
window.renderScore = async () => { const bytes = new Uint8Array(await (await renderWav(44100, events(), BEATS, LEVEL)).arrayBuffer()); let text = ''; for (let i = 0; i < bytes.length; i += 32768) text += String.fromCharCode(...bytes.subarray(i, i + 32768)); return btoa(text); };

// What the captions should show at a given beat; the page re-renders only when this changes.
const view = b => ({intro: b < 7, shot: shots.findIndex(s => phase(s, b).name), line: shots.some(s => phase(s, b).line), mark: b >= close.from + 1, closing: b >= close.from + 2.5 && b < close.to - 0.8});

function Reel() {
  const [started, setStarted] = useState(frozen !== null || params.has('autostart'));
  const origin = useRef(performance.now());
  const root = useRef(null);
  const audio = useRef(null);
  // One clock for picture and sound: the audio clock when there is sound, wall time when not.
  const seconds = () => frozen ?? (!started ? 0 : Math.max(0, Math.min(DURATION, audio.current ? audio.current.ctx.currentTime - audio.current.start : (performance.now() - origin.current) / 1000)));
  const beat = () => beatAt(seconds());
  const start = () => {
    audio.current?.ctx.close(); audio.current = null;
    if (!silent) { const ctx = new AudioContext(), begin = ctx.currentTime + 0.12; audio.current = {ctx, start: begin, master: compose(ctx, ctx.destination, begin, events(), LEVEL)}; }
    origin.current = performance.now(); setStarted(true);
  };
  const [v, setV] = useState(() => view(beat()));

  useEffect(() => {
    const onKey = event => {
      if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); if (!started) start(); }
      if (event.key === 'r' || event.key === 'R') start();
      if ((event.key === 'm' || event.key === 'M') && audio.current) { const g = audio.current.master.gain; g.value = g.value ? 0 : LEVEL; }
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
    {/* ?sync flashes a corner marker on the first frames so an export can line sound up with picture. */}
    {started && params.has('sync') && <i className="reel-sync"/>}
  </div>;
}

Promise.all([document.fonts.load('16px "Source Sans 3"'), document.fonts.load('16px "Source Serif 4"')])
  .then(() => createRoot(document.getElementById('reel-root')).render(<Reel/>));
