import React, {forwardRef} from 'react';
import {order} from './timing.mjs';
import {studio, cast} from '../story.mjs';

// The three deliverables building, then stacking into one board pack. Not a product screen:
// it stands for the files the product hands over.
export default forwardRef(function Pack({stepId, index}, ref) {
  const phase = index < order('build') ? 'idle' : index === order('build') ? 'build' : 'stack';
  return <div className="stage-pack" data-phase={phase}>
    {studio.starts.map((doc, i) => <article className="stage-doc" key={doc.name} style={{'--i': i}}>
      <small>{doc.output}</small><h3>{doc.doc}</h3><p>{doc.subject}</p>
      <ul>{doc.outline.map((line, n) => <li key={line} style={{'--n': n}}>{line}</li>)}</ul>
    </article>)}
    <div className="stage-pack-cover"><small>{cast.company}</small><strong>{studio.pack.title}</strong><span>{studio.pack.subtitle}</span><em>{studio.pack.time}</em></div>
  </div>;
});
