import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import Shell, {sheets, extra} from './Shell.jsx';
import {Icon} from './icons.jsx';
import {order, useAfter, useTyped} from './timing.mjs';
import {ask} from '../story.mjs';

// Ask GrowthIQ, as app.js ask() renders it. The question is typed on stage.
export default forwardRef(function Ask({stepId, index, ...host}, ref) {
  const here = index === order('question'), settled = host['data-settled'];
  const typing = useAfter(here, 5.2, settled);
  const text = useTyped(ask.question, typing, index > order('question') || (here && settled));
  return <Sealed ref={ref} sheets={sheets} extra={extra} className="stage-screen" data-theme="advisory" {...host}>
    <Shell active="Ask GrowthIQ" title={ask.title} subtitle={ask.subtitle}>
      <div className="ask-workspace"><div className="ask-intro"><h2>A better question.<br/>A clearer perspective.</h2><p>Markets. Competitors. Customers. Your next strategic move.</p></div>
        <form><div className="composer" data-focus="composer"><textarea data-focus="query" placeholder="Ask a question about your market or business…" value={text} readOnly/>
          <div className="composer-bottom"><div className="composer-tools"><select><option>Fast</option></select><button className="btn quiet" type="button"><Icon name="attachment"/>Attach</button><button className="btn quiet" type="button"><Icon name="mic"/>Voice</button></div>
            <button className="btn primary" type="button" data-focus="send" disabled={!text}>Start research <Icon name="arrow"/></button></div></div>
          <p className="composer-help">Ask about markets, companies or customers. Add a document for context.</p></form>
        <div className="section-header"><h2 style={{fontSize: 16}}>Explore a research direction</h2><button className="btn quiet" style={{fontSize: 12}}>Research history</button></div>
        <div className="prompt-grid">{ask.prompts.map(([title, text, icon]) => <button className="prompt-option" key={title}><Icon name={icon}/><span><strong>{title}</strong><small>{text}</small></span><Icon name="arrow"/></button>)}</div>
      </div>
    </Shell>
  </Sealed>;
});
