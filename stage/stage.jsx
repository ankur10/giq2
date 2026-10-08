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

const params = new URLSearchParams(location.search);
// ?step=<id or number> opens a chosen step; ?t=1 shows it finished; ?autoplay runs unattended.
const startStep = () => { const value = params.get('step'); if (!value) return 0; const byId = steps.findIndex(s => s.id === value); return byId > -1 ? byId : Number(value) - 1 || 0; };

function Stage() {
  const director = useMemo(() => createDirector({steps, autoplay: params.has('autoplay'), start: startStep(), startProgress: Number(params.get('t') || 0)}), []);
  const [state, setState] = useState(director.state());
  // Opened part-way through a step: show its finished state instead of replaying the motion.
  const [settled, setSettled] = useState(Number(params.get('t') || 0) >= 1);
  const root = useRef(null);

  useEffect(() => director.subscribe(next => { setSettled(false); setState(next); }), [director]);
  useEffect(() => {
    const onKey = event => {
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
    const loop = now => { director.tick(Math.min(0.1, (now - previous) / 1000)); previous = now; frame = requestAnimationFrame(loop); };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [director]);

  const step = steps[state.step];
  return <div className="stage" ref={root} data-step={step.id} data-act={step.act} data-motion={params.get('motion') || 'auto'} data-settled={settled}>
    <World step={step} index={state.step} settled={settled} director={director}/>
    <Frame step={step}/>
  </div>;
}

// Screens measure themselves, so styles and fonts must be in place before the first render.
Promise.all([loadSheets([...new Set([...radarSheets, ...appSheets, ...answerSheets, ...expertSheets])]), document.fonts.load('16px "Source Sans 3"'), document.fonts.load('16px "Source Serif 4"')])
  .then(() => createRoot(document.getElementById('stage-root')).render(<Stage/>));
