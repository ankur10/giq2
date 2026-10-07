import React from 'react';
import {inbox} from '../story.mjs';

// The cold open: a clock in the dark and one notification. Not a product screen.
export default function Inbox({stepId}) {
  return <div className="stage-inbox" data-notified={stepId !== 'clock'}>
    <p className="stage-inbox-time">{inbox.time}</p>
    <p className="stage-inbox-day">{inbox.day}</p>
    <div className="stage-notification" data-focus="notification">
      <span className="stage-notification-icon" aria-hidden="true">G</span>
      <div><small>{inbox.app} <span>now</span></small><strong>{inbox.title}</strong><span>{inbox.preview}</span></div>
    </div>
  </div>;
}
