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
