import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import Shell, {sheets as appSheets, extra} from './Shell.jsx';
import {Icon} from './icons.jsx';
import {order, useAfter} from './timing.mjs';
import {tracker} from '../story.mjs';

const sheets = [...appSheets, 'tracker.css'];
const own = '.tracker-list{max-width:760px}.tracker-state{transition:color .5s,background .5s}';

// Radar, as tracker.js list() renders it: the new tracker is switched on.
export default forwardRef(function RadarApp({stepId, index, ...host}, ref) {
  const active = useAfter(index >= order('tracker'), 3.4, host['data-settled']);
  return <Sealed ref={ref} sheets={sheets} extra={extra + own} className="stage-screen" data-theme="advisory" {...host}>
    <Shell active="Radar" title={tracker.title} subtitle={tracker.subtitle}>
      <div className="tracker-page"><div className="tracker-list-heading"><div><h2>My radar <span>1</span></h2><p>Your companies, topics and events, in one place.</p></div><button className="btn primary">New tracker <Icon name="arrow"/></button></div>
        <div className="tracker-list"><article className="tracker-row selected" data-focus="tracker-row"><h3>{tracker.scope}</h3>
          <div className="tracker-row-top"><span>{tracker.kind}</span><span className={'tracker-state ' + (active ? '' : 'paused')}>{active ? 'Active' : 'Paused'}</span></div>
          <p>{tracker.focus}</p><div className="tracker-delivery"><strong>{tracker.frequency}</strong><span>{tracker.schedule}</span></div><p className="tracker-recipient">{tracker.email}</p>
          <div className="tracker-row-actions"><button>Preview email <Icon name="arrow"/></button><button>Edit</button><button data-focus="resume">{active ? 'Pause' : 'Resume'}</button></div>
          <small>{active ? 'Next delivery: tomorrow, 6:30.' : 'Delivery paused.'}</small></article></div></div>
    </Shell>
  </Sealed>;
});
