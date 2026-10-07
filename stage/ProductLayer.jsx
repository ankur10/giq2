import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {question, answer, lenses, brief} from './story.mjs';

const WIDTH = 1180, HEIGHT = 704;

// Fly-to points laid out in rows inside each element, so the gathered points read as lines of text.
function sampleTargets(rects, total = 320) {
  const area = rects.reduce((sum, r) => sum + r.width * r.height, 0) || 1;
  const step = Math.sqrt(area / total);
  const points = [];
  for (const r of rects) {
    const rows = Math.max(1, Math.round(r.height / step)), columns = Math.max(2, Math.round(r.width / step));
    for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
      points.push({x: r.left + (column + 0.5) / columns * r.width, y: r.top + (row + 0.5) / rows * r.height});
    }
  }
  return points;
}

// The real GrowthIQ answer view (ask-results.css classes) with the scripted Ostrel content.
export default function ProductLayer({state, onTargets}) {
  const frame = useRef(null);
  const [scale, setScale] = useState(1);
  const {id} = state;
  const view = id === 'brief' || id === 'pullback' ? 'brief' : 'answer';

  useLayoutEffect(() => {
    const fit = () => setScale(Math.min(innerWidth * 0.8 / WIDTH, innerHeight * 0.8 / HEIGHT));
    fit(); addEventListener('resize', fit);
    return () => removeEventListener('resize', fit);
  }, []);
  useEffect(() => {
    const measure = () => onTargets?.(sampleTargets([...frame.current.querySelectorAll('[data-fly]')].map(el => el.getBoundingClientRect())));
    measure();
    document.fonts?.ready.then(measure);
  }, [scale, onTargets]);

  return <div className="stage-layer stage-product-layer" data-beat={id}>
    <div className="stage-product" ref={frame} style={{width: WIDTH, height: HEIGHT, '--scale': scale}} data-view={view}>
      <div className="stage-product-chrome" data-fly><strong>Growth<span>IQ</span></strong><span>Ask GrowthIQ</span></div>
      <div className="ar-workspace">
        <div className="ar-result-header"><div className="ar-question-row"><div className="ar-question-toggle" data-fly><span>{question}</span></div></div></div>
        <div className="ar-tab-bar"><div className="ar-tabs" role="tablist" aria-label="Result views">{['Answer', 'Sources', 'Connected Market', 'Deep Research', 'News', 'Key Competitors'].map((tab, i) => <button key={tab} role="tab" aria-selected={i === 0} tabIndex={-1}>{tab}</button>)}</div></div>
        <div className="ar-reader">
          <article className="stage-answer">
            <h1 className="ar-answer-start stage-typed" data-fly>{answer.heading}</h1>
            <p className="ar-answer-intro" data-fly>{answer.summary}</p>
            <section className="ar-source-group"><h2>Evidence</h2>
              {lenses.map(lens => <div className="ar-source-row" key={lens.id} data-fly><span><strong>{lens.label}</strong><small>{lens.card}</small></span></div>)}
            </section>
            <button className="ar-primary stage-brief-cta" tabIndex={-1}>Create strategy brief</button>
          </article>
          <article className="stage-brief">
            <div className="ar-view-heading"><div><h1>Strategy brief</h1><p>{answer.heading} · prepared from this answer</p></div></div>
            <div className="ar-step-list">{brief.map((section, i) => <section className="ar-step" key={section.title} style={{'--i': i}}><span className="ar-step-number">{String(i + 1).padStart(2, '0')}</span><div><h2>{section.title}</h2><p>{section.text}</p></div></section>)}</div>
          </article>
        </div>
      </div>
    </div>
  </div>;
}
