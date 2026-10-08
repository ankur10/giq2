import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import Shell, {sheets as appSheets, extra} from './Shell.jsx';
import {Icon} from './icons.jsx';
import {order, useAfter} from './timing.mjs';
import {expert} from '../story.mjs';

export const sheets = [...appSheets, 'domain-expert.css'];
const own = '#expert-confirmation{animation:arrive .7s cubic-bezier(.16,1,.3,1) both}@keyframes arrive{from{opacity:0;transform:translateY(-8px)}}textarea{min-height:84px!important}.expert-page .field{margin-bottom:14px}.expert-form-heading{margin-bottom:16px}[data-focus="expert-form"]{padding-top:4px;min-height:268px}#expert-confirmation{margin:16px 0 0}';

// Ask Domain Expert, as domain-expert.js view() renders it. The open question from the answer
// arrives in the request, which is then submitted.
export default forwardRef(function Expert({stepId, index, ...host}, ref) {
  const here = index >= order('expert');
  const sent = useAfter(here, 7.6, host['data-settled']);
  const field = (label, value, optional) => <div className="field"><label>{label}{optional && <span className="expert-optional">Optional</span>}</label><input value={here ? value : ''} readOnly/></div>;
  return <Sealed ref={ref} sheets={sheets} extra={extra + own} className="stage-screen" data-theme="advisory" {...host}>
    <Shell active="Ask Domain Expert" title={expert.title} subtitle={expert.subtitle} actions={<button className="btn"><Icon name="document"/>Request history</button>}>
      <div className="expert-page"><div className="expert-layout">
        <section className="expert-form-panel"><div className="expert-form-heading"><h2>{expert.heading}</h2><p>{expert.lead}</p></div>
          <form>{field('Request title', expert.subject)}{field('Market or geography', expert.region, true)}{field('Reply email', expert.email)}
            <div data-focus="expert-form">
              <div className="field"><label>Your question and context</label><textarea data-focus="details" rows="3" value={here ? expert.details : ''} readOnly/></div>
              <div className="expert-submit"><button type="button" className="btn primary" data-focus="submit">Submit request <Icon name="arrow"/></button></div>
              {sent && <div id="expert-confirmation"><strong>{expert.sent[0]}</strong><p>{expert.sent[1]}</p></div>}
            </div></form></section>
        <aside className="expert-guide"><h2>{expert.guide[0]}<br/>{expert.guide[1]}</h2><p>{expert.guide[2]}</p></aside>
      </div></div>
    </Shell>
  </Sealed>;
});
