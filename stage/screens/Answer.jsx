import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import {Icon} from './icons.jsx';
import {order, useAfter} from './timing.mjs';
import {ask, answer} from '../story.mjs';

export const sheets = ['ask-results.css'];
const out = 'cubic-bezier(.16,1,.3,1)';
const extra = ':host{background:#fff!important;display:block}svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
  + '.chrome{display:flex;align-items:center;gap:22px;height:58px;padding:0 36px;border-bottom:1px solid var(--line);font-size:13px;color:var(--muted)}.chrome strong{font:700 23px "Source Serif",Georgia,serif;color:var(--ink);letter-spacing:-.02em}.chrome strong span{color:var(--accent)}'
  + '.ar-workspace{min-height:0;height:842px;display:block}.ar-workspace>.ar-tab-bar{position:static}.ar-reader{padding:30px 36px 0}.ar-reader article{animation:none}'
  + '[data-focus="answer"]{max-width:900px}.ar-answer-start{font-size:30px;line-height:1.25;margin:0 0 12px}.ar-answer-intro{font-size:17px;line-height:1.65;max-width:78ch;margin-bottom:18px}'
  + '.points{display:grid;grid-template-columns:repeat(3,1fr);gap:0;border-block:1px solid var(--line);margin:0 0 22px;padding:0;list-style:none}.points li{padding:16px 20px 18px 0}.points li+li{padding-left:20px;border-left:1px solid var(--line)}.points strong{display:block;font-size:13px;color:var(--muted);font-weight:600;margin-bottom:5px}.points span{font-size:15px;line-height:1.5}'
  + '.points li[data-open="true"] span{background:linear-gradient(#ffe9d2,#ffe9d2) no-repeat 0 100%/0 100%;transition:background-size 1s ' + out + '}.points li[data-lit="true"] span{background-size:100% 100%}'
  + '.ar-source-group{margin-top:0}.ar-source-row strong{font-size:12px;font-weight:650;color:#b85d14}.ar-source-row small{font-size:15px;color:var(--ink);margin-top:3px}'
  // Before the answer step nothing is written; the answer step writes it; later steps add to it.
  + '[data-phase="0"] .ar-reader>*{opacity:0}'
  + '[data-phase="1"] .ar-answer-start{animation:type 1.4s steps(34,end) 2.6s both}[data-phase="1"] .ar-answer-intro{animation:rise .8s ' + out + ' 4.2s both}[data-phase="1"] .points li{animation:rise .8s ' + out + ' calc(5.2s + var(--i) * .5s) both}'
  + '[data-phase="0"] .ar-source-group,[data-phase="1"] .ar-source-group{opacity:0}'
  + '[data-phase="2"] .ar-source-group>h2{animation:rise .7s ' + out + ' 1.2s both}[data-phase="2"] .ar-source-row{animation:dock 1.2s ' + out + ' calc(1.7s + var(--i) * .7s) both}'
  + '@keyframes type{from{clip-path:inset(-10% 100% -10% -2%)}to{clip-path:inset(-10% -2% -10% -2%)}}@keyframes rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}'
  + '@keyframes dock{from{opacity:0;transform:translateX(-520px);box-shadow:inset 4px 0 0 #e07a26}60%{opacity:1;box-shadow:inset 4px 0 0 #e07a26}to{opacity:1;transform:none;box-shadow:inset 0 0 0 #e07a26}}'
  + '.ar-research{max-width:920px;margin:0;animation:rise .7s ' + out + ' both}.ar-chapter>summary{padding:15px 0}';

// The Ask GrowthIQ result view (ask-results.css classes): the answer writes itself, the evidence
// the audience has just watched being gathered docks beneath it, and the research scope follows.
export default forwardRef(function Answer({stepId, index, ...host}, ref) {
  const phase = index < order('answer') ? 0 : index === order('answer') ? 1 : index === order('sources') ? 2 : 3;
  // Deep Research is opened in one step and left again in the next, each after the cursor's click.
  const opened = useAfter(index === order('research'), 2.6, host['data-settled']);
  const left = useAfter(index === order('flag'), 2.6, host['data-settled']);
  const research = opened || (index === order('flag') && !left);
  const lit = useAfter(index >= order('flag'), 3.8, host['data-settled']);
  const tab = research ? 3 : 0;
  return <Sealed ref={ref} sheets={sheets} extra={extra} className="stage-screen" {...host}>
    <div data-phase={phase} data-focus="workspace">
      <div className="chrome"><strong>Growth<span>IQ</span></strong><span>Ask GrowthIQ</span></div>
      <div className="ar-workspace">
        <div className="ar-result-header"><div className="ar-question-row"><div className="ar-question-toggle"><span>{ask.question}</span></div></div></div>
        <div className="ar-tab-bar"><div className="ar-tabs" role="tablist">{answer.tabs.map((name, i) => <button key={name} role="tab" aria-selected={i === tab} tabIndex={-1} data-focus={i === 3 ? 'tab-research' : i === 0 ? 'tab-answer' : undefined}>{name}</button>)}</div></div>
        <div className="ar-reader" data-focus="reader">{research
          ? <section className="ar-research" data-focus="research"><div className="ar-view-heading"><div><h1>{answer.research.heading}</h1><p>{answer.research.summary}</p></div><a className="ar-primary">Generate report <Icon name="arrow"/></a></div>
              <div className="ar-research-summary"><span>{answer.research.chapters.length} chapters</span><span>{answer.research.chapters.reduce((n, c) => n + c[1], 0)} subsections</span></div>
              {answer.research.chapters.map(([title, sections]) => <details className="ar-chapter" key={title}><summary><span>{title}</span><small>{sections} subsections</small><Icon name="chevron"/></summary></details>)}</section>
          : <article>
              <div data-focus="answer"><h1 className="ar-answer-start">{answer.heading}</h1><p className="ar-answer-intro">{answer.intro}</p>
                <ul className="points">{answer.points.map(([title, text], i) => <li key={title} style={{'--i': i}} data-open={i === 2} data-lit={i === 2 && lit} data-focus={i === 2 ? 'open-question' : undefined}><strong>{title}</strong><span data-focus={i === 2 ? 'open-question-text' : undefined}>{text}</span></li>)}</ul></div>
              <section className="ar-source-group" data-focus="evidence"><h2>Evidence</h2>{answer.evidence.map(([from, title], i) => <div className="ar-source-row" key={from} style={{'--i': i}}><span><strong>From {from}</strong><small>{title}</small></span></div>)}</section>
            </article>}</div>
      </div>
    </div>
  </Sealed>;
});
