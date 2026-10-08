import React from 'react';
import {acts, closing} from './story.mjs';

// What stays constant through the demo: the time of Maya's morning and the product area in view.
export default function Frame({step}) {
  return <div className="stage-frame">
    <p className="stage-clock" data-on={!!step.clock} key={step.clock}>{step.clock}<small> am</small></p>
    <p className="stage-label" data-on={!!step.label} key={step.label}>{step.label}</p>
    <p className="stage-closing" data-on={step.id === 'end'}>{closing}</p>
    <ol className="stage-progress" aria-label="Act">{acts.map((act, i) => <li key={act.id} aria-current={i === step.act ? 'step' : undefined}/>)}</ol>
  </div>;
}
