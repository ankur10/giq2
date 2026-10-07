import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import {Icon} from './icons.jsx';
import {radar} from '../story.mjs';

export const sheets = ['styles.css', 'themes.css', 'refinements.css', 'tracker.css'];
const extra = '.stage-mail-top{position:absolute;inset:0 0 auto;height:430px;pointer-events:none}:host{background:transparent!important;display:grid;place-items:center}.tracker-mail-window{position:relative;width:860px;box-shadow:0 30px 90px rgb(0 0 0 / .45)}.tracker-email-story{transition:background .5s,box-shadow .5s}.tracker-email-story[data-lit="true"]{box-shadow:-14px 0 0 #fff,-17px 0 0 #e07a26}';

// The Radar digest as it arrives in the inbox: the product's own email markup from tracker.js.
export default forwardRef(function RadarMail({stepId, index, ...host}, ref) {
  return <Sealed ref={ref} sheets={sheets} extra={extra} className="stage-screen" data-theme="advisory" {...host}>
    <div className="tracker-mail-window" data-focus="mail">
      <span className="stage-mail-top" data-focus="mail-top"/>
      <div className="tracker-mail-toolbar"><span><Icon name="mail"/> Message</span><span className="tracker-mail-inbox">Inbox</span></div>
      <div className="tracker-mail-header"><h3>{radar.subject}</h3>
        <div className="tracker-mail-sender"><span className="tracker-sender-avatar" aria-hidden="true">G</span><div><strong>GrowthIQ Intelligence</strong><span>To: {radar.to}</span></div><span className="tracker-mail-time">{radar.time}</span></div>
      </div>
      <div className="tracker-mail-canvas"><div className="tracker-email-body">
        <div className="tracker-email-brand">GrowthIQ <span>Daily briefing</span></div>
        <h3>{radar.heading}</h3><p className="tracker-email-summary">{radar.summary}</p>
        {radar.stories.map((story, i) => <article className="tracker-email-story" key={story.title} data-focus={'story-' + i} data-lit={i === 0 && (stepId === 'headline' || stepId === 'briefing')}>
          <h4><a data-focus={'story-' + i + '-title'}>{story.title}</a></h4><p>{story.summary.split('. ')[0].replace(/\.$/, '')}.</p>
          <a className="tracker-source">{story.kind} · {story.age} <Icon name="arrow"/></a>
        </article>)}
        <a className="btn primary tracker-mail-cta">Explore in GrowthIQ <Icon name="arrow"/></a>
        <div className="tracker-email-footer"><p>{radar.schedule}</p></div>
      </div></div>
    </div>
  </Sealed>;
});
