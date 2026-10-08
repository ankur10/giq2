import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import Shell, {sheets, extra} from './Shell.jsx';
import {Icon} from './icons.jsx';
import {order, useAfter} from './timing.mjs';
import {studio} from '../story.mjs';

// Intelligence Studio, as app.js studio() and studioWorkspace() render it: the three featured
// starting points, then the market-model brief with its deliverable outline.
export default forwardRef(function Studio({stepId, index, ...host}, ref) {
  const workspace = useAfter(index >= order('brief'), 2.2, host['data-settled']);
  const task = studio.starts[0];
  return <Sealed ref={ref} sheets={sheets} extra={extra} className="stage-screen" data-theme="advisory" {...host}>
    <Shell active="Intelligence Studio" title={studio.title} subtitle={workspace ? 'Shape your brief and understand the deliverable before you start.' : studio.subtitle}>
      {workspace ? <>
        <div className="studio-workspace-heading"><a className="row-action"><Icon name="arrow"/>Explore tasks</a><div className="studio-step-indicator"><span aria-current="step">Prepare brief</span><Icon name="chevron"/><span>Review</span></div></div>
        <section className="studio-task-heading"><div><h2>{task.name}</h2><p>{task.blurb}</p></div><span className="studio-output-badge"><Icon name="market"/>{task.output}</span></section>
        <div className="studio-workspace-grid">
          <section className="studio-brief-panel"><form><div className="section-header"><h3>Shape your research brief</h3><button type="button" className="btn quiet">Save draft</button></div>
            <div className="studio-context-banner"><span><Icon name="document"/>Context from Ask GrowthIQ</span><button type="button">Remove context</button></div>
            <div className="field"><label>{task.label} <span className="required">Required</span></label><textarea rows="2" value={task.subject} readOnly/></div>
            <div className="field"><label>Context & priorities <span className="field-optional">Optional</span></label><textarea rows="4" value={studio.context} readOnly/></div>
            <div className="studio-form-actions"><button className="btn primary" type="button">Review brief <Icon name="arrow"/></button></div></form></section>
          <aside className="studio-deliverable" data-focus="deliverable"><h3>What you’ll receive</h3><p>{task.output}. Format provided by the existing capability.</p>
            <div className="studio-outline"><h4>Deliverable outline</h4><ul>{task.outline.map(line => <li key={line}><Icon name="check"/><span>{line}</span></li>)}</ul></div></aside>
        </div>
      </> : <>
        <section className="studio-intro"><div><h2>What are you working on?</h2><p>Start with the decision you need to make.<br/> Leave with a clearly defined research brief.</p></div>
          <div className="studio-search"><label className="search-field"><Icon name="search"/><input type="search" placeholder="Find a task: market entry, SWOT, company profile…" readOnly/></label><span>Search all {studio.capabilities} existing capabilities</span></div></section>
        <section className="studio-starts" data-focus="starts">{studio.starts.map((start, i) => <button key={start.name} data-focus={'start-' + i} className={'studio-start ' + (i === 0 ? 'studio-start-featured' : '')}>
          <span className="studio-start-top"><span className="tag">{start.output}</span><Icon name="arrow"/></span><strong>{start.name}</strong><span>{start.blurb}</span></button>)}</section>
        <section className="studio-catalog-section"><div className="studio-catalog-heading"><h2>Explore by objective</h2></div></section>
      </>}
    </Shell>
  </Sealed>;
});
