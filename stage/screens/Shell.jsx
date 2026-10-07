import React from 'react';
import {Icon} from './icons.jsx';
import {cast} from '../story.mjs';

export const sheets = ['styles.css', 'themes.css', 'refinements.css'];
// The product sizes its shell to the browser window; on stage each screen is a fixed panel.
export const extra = '.shell{min-height:900px;height:900px}.sidebar{height:900px}.workspace{height:900px;overflow:hidden}';

const nav = [['Your Briefing', 'home'], ['Intelligence Studio', 'document'], ['Ask GrowthIQ', 'ask'], ['Ask Domain Expert', 'customers'], ['Radar', 'signals'], ['Markets', 'market', 'Explore'], ['Competitors', 'competitor'], ['Customers', 'customers'], ['Live Signals', 'signals'], ['Support', 'support', 'Help']];

// The product's application frame, as app.js shell() renders it, for the Norvane workspace.
export default function Shell({active, crumb, title, subtitle, actions, children}) {
  return <div className="shell">
    <aside className="sidebar">
      <a className="brand"><span className="brand-mark"><Icon name="g"/></span><span>Growth<span className="word-iq">IQ</span></span></a>
      <button className="workspace-button"><span className="company-mark">{cast.companyInitials}</span><span className="workspace-name">{cast.company}<small>Your workspace</small></span><Icon name="down"/></button>
      <p className="nav-label">Intelligence</p>
      <nav className="nav">{nav.map(([label, icon, group]) => <React.Fragment key={label}>
        {group && <p className="nav-label">{group}</p>}
        <a className={label === active ? 'active' : undefined} data-focus={'nav-' + label.split(' ').pop().toLowerCase()}><Icon name={icon}/><span>{label}</span>{label === 'Customers' && <span className="badge">Beta</span>}</a>
      </React.Fragment>)}</nav>
      <div className="sidebar-bottom"><div className="sidebar-note"><span className="dot"></span> {cast.company} intelligence</div>
        <button className="profile" style={{width: '100%', textAlign: 'left'}}><span className="avatar">{cast.initials}</span><span><strong>{cast.person}</strong><small>{cast.company}</small></span><Icon name="down"/></button></div>
    </aside>
    <div className="workspace">
      <div className="topbar"><div className="breadcrumbs"><span className="root-crumb">{cast.company}</span><span className="root-separator"><Icon name="chevron"/></span><strong>{active}</strong>{crumb && <><Icon name="chevron"/><span>{crumb}</span></>}</div>
        <div className="top-tools"><button className="command-trigger"><Icon name="search"/><span>Search GrowthIQ</span><kbd>⌘ K</kbd></button><a className="icon-button help-trigger"><Icon name="support"/></a></div></div>
      <main className="main"><header className="page-header"><div><h1>{title}</h1><p>{subtitle}</p></div>{actions && <div className="header-actions">{actions}</div>}</header><div id="view">{children}</div></main>
    </div>
  </div>;
}
