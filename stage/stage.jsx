import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {steps} from './story.mjs';
import {createDirector, actionForKey} from './director.mjs';
import {loadSheets} from './Sealed.jsx';
import World from './World.jsx';
import Frame from './Frame.jsx';
import {sheets as radarSheets} from './screens/RadarMail.jsx';
import {sheets as appSheets} from './screens/Shell.jsx';
import {sheets as answerSheets} from './screens/Answer.jsx';
import {sheets as expertSheets} from './screens/Expert.jsx';
import {narratedSteps} from './narration.mjs';
import {play, render, loadVoices, totalSeconds} from './soundtrack.mjs';
import voice from './voice.json';

const params = new URLSearchParams(location.search);
// ?step=<id or number> opens a chosen step; ?t=1 shows it finished; ?autoplay runs unattended.
// ?narrated plays the demo by itself with a voice-over and a music bed. It needs one key press
// to begin, because browsers will not start sound without one. ?narrated&silent runs the same
// timings without sound, for recording.
const narrated = params.has('narrated'), silent = params.has('silent');
const script = narrated ? narratedSteps(steps, voice) : steps;
if (narrated) window.renderScore = async () => { const bytes = new Uint8Array(await (await render(script)).arrayBuffer()); let text = ''; for (let i = 0; i < bytes.length; i += 32768) text += String.fromCharCode(...bytes.subarray(i, i + 32768)); return btoa(text); };
const startStep = () => { const value = params.get('step'); if (!value) return 0; const byId = steps.findIndex(s => s.id === value); return byId > -1 ? byId : Number(value) - 1 || 0; };

function Stage() {
  const director = useMemo(() => createDirector({steps: script, autoplay: params.has('autoplay'), start: startStep(), startProgress: Number(params.get('t') || 0)}), []);
  const [state, setState] = useState(director.state());
  // Opened part-way through a step: show its finished state instead of replaying the motion.
  const [settled, setSettled] = useState(Number(params.get('t') || 0) >= 1);
  const root = useRef(null), marker = useRef(null);
  // Narrated mode: the moment it began, on the audio clock (or wall time when silent).
  const [playing, setPlaying] = useState(narrated && silent);
  const run = useRef(narrated && silent ? {origin: performance.now()} : null);
  const begin = async () => {
    run.current?.ctx?.close();
    if (silent) { run.current = {origin: performance.now()}; setPlaying(true); return; }
    const ctx = new AudioContext(), {start} = await play(ctx, script);
    run.current = {ctx, start}; setPlaying(true);
  };
  const clock = () => !run.current ? 0 : run.current.ctx ? run.current.ctx.currentTime - run.current.start : (performance.now() - run.current.origin) / 1000;

  useEffect(() => director.subscribe(next => { setSettled(false); setState(next); }), [director]);
  useEffect(() => {
    const onKey = event => {
      if (narrated) {
        // The narration sets the pace, so only start, restart and fullscreen apply.
        if (event.key === ' ' || event.key === 'Enter' || event.key === 'r' || event.key === 'R') { event.preventDefault(); begin(); }
        if (event.key === 'f' || event.key === 'F') document.fullscreenElement ? document.exitFullscreen() : root.current.requestFullscreen?.();
        return;
      }
      const action = actionForKey(event.key);
      if (!action || event.metaKey || event.ctrlKey || event.altKey) return;
      event.preventDefault();
      if (action.type === 'fullscreen') { document.fullscreenElement ? document.exitFullscreen() : root.current.requestFullscreen?.(); return; }
      if (action.type === 'skip') director.skip(action.direction);
      else if (action.type === 'act') director.act(action.act);
      else director[action.type]();
    };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [director]);
  useEffect(() => {
    let frame, previous = performance.now();
    const total = totalSeconds(script);
    const loop = now => {
      if (narrated) {
        const t = Math.max(0, clock());
        director.seek(t);
        // ?sync flashes a corner marker one second in and one second from the end, so a
        // recording can be lined up with the soundtrack and corrected for capture speed.
        if (marker.current) marker.current.style.visibility = (t >= 1 && t < 1.12) || (t >= total - 1 && t < total - 0.88) ? 'visible' : 'hidden';
      } else director.tick(Math.min(0.1, (now - previous) / 1000));
      previous = now; frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [director]);

  const step = script[state.step];
  return <div className="stage" ref={root} data-step={step.id} data-act={step.act} data-motion={params.get('motion') || 'auto'} data-settled={settled} data-still={params.has('still')}>
    <World step={step} index={state.step} settled={settled} director={director}/>
    <Frame step={step}/>
    {narrated && !playing && <p className="stage-start">Press space to begin</p>}
    {narrated && params.has('sync') && <i className="stage-sync" ref={marker}/>}
  </div>;
}

// Screens measure themselves, so styles and fonts must be in place before the first render.
if (narrated && !silent) loadVoices(script);
Promise.all([loadSheets([...new Set([...radarSheets, ...appSheets, ...answerSheets, ...expertSheets])]), document.fonts.load('16px "Source Sans 3"'), document.fonts.load('16px "Source Serif 4"')])
  .then(() => createRoot(document.getElementById('stage-root')).render(<Stage/>));
