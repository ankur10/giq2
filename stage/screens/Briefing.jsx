import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import Shell, {sheets, extra} from './Shell.jsx';
import {Icon} from './icons.jsx';
import {briefing, cast} from '../story.mjs';

export {sheets};

// Your Briefing, as app.js home() and signalReading() render it.
export default forwardRef(function Briefing({stepId, index, ...host}, ref) {
  const [current] = briefing.signals;
  return <Sealed ref={ref} sheets={sheets} extra={extra} className="stage-screen" data-theme="advisory" {...host}>
    <Shell active="Your Briefing" title={briefing.title} subtitle={briefing.subtitle} actions={<><button className="btn date-button"><Icon name="calendar"/>{briefing.range}</button><button className="btn"><Icon name="document"/>Saved signals</button></>}>
      <div className="briefing-top"><div className="briefing-filters">{[['All signals', briefing.signals.length], ['Unread', briefing.signals.length], ['Saved', 0]].map(([label, n], i) => <button key={label} className={i === 0 ? 'selected' : undefined}>{label}<span>{n}</span></button>)}</div>
        <label className="category-control"><select className="select"><option>All categories</option></select></label></div>
      <div className="reading-workspace">
        <section className="signal-index">{briefing.signals.map((signal, i) => <button key={signal.title} className={'signal-choice ' + (i === 0 ? 'selected' : '')}>
          <span className="meta"><span className="tag">{signal.category}</span><span>{signal.age}</span><span className="unread-dot"></span></span><strong>{signal.title}</strong>
          <span className="signal-choice-foot">{signal.kind}<span>Read signal <Icon name="arrow"/></span></span></button>)}
          <div className="index-note">Intelligence for your workspace.</div></section>
        <article className="signal-reader" data-focus="reader">
          <div className="reader-top"><span className="meta"><span className="tag blue">{current.category}</span><span>{current.age}</span><span className="tag amber">High impact</span></span><button className="icon-button"><Icon name="document"/></button></div>
          <h2 data-focus="reader-title">{current.title}</h2>
          <p className="reader-summary">{current.summary}</p>
          <section className="reader-context" data-focus="relevance"><h3>What this means for {cast.company}</h3><p>{current.relevance}</p></section>
          <div className="reader-actions"><button className="btn primary">Develop a strategy brief <Icon name="arrow"/></button><button className="btn quiet" data-focus="ask">Ask GrowthIQ</button><button className="btn quiet"><Icon name="check"/>Mark read</button></div>
        </article>
      </div>
    </Shell>
  </Sealed>;
});
