import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import Shell, {sheets, extra} from './Shell.jsx';
import {Icon} from './icons.jsx';
import {order} from './timing.mjs';
import {markets, cast, illustrative} from '../story.mjs';

const initials = name => name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const own = '.ecosystem{min-height:520px}.selected-row td{background:var(--selected)}';

// Market explorer, as app.js marketView() and marketInspector() render it: the ecosystem view
// first, then the list with the selected market in the inspector.
export default forwardRef(function Markets({stepId, index, ...host}, ref) {
  const list = index >= order('market');
  const selected = markets.rows[markets.selected];
  return <Sealed ref={ref} sheets={sheets} extra={extra + own} className="stage-screen" data-theme="advisory" {...host}>
    <Shell active="Markets" title={markets.title} subtitle={markets.subtitle} actions={<a className="btn primary"><Icon name="ask"/>Ask about a market</a>}>
      <nav className="tabs"><a className="active">Explorer</a><a>My markets</a></nav>
      <div className="toolbar"><div className="tool-group"><label className="search-field"><Icon name="search"/><input type="search" placeholder="Search markets" readOnly/></label></div>
        <div className="segmented"><a className={list ? 'active' : undefined}><Icon name="list"/>List</a><a className={list ? undefined : 'active'}><Icon name="branch"/>Ecosystem</a></div></div>
      {list ? <div className="market-workspace">
        <section className="table-panel"><div className="table-heading"><div><h2>Your market ecosystem</h2><p>Growth and market size, in one view.</p></div><span className="tag outline">{illustrative}</span></div>
          <div className="table-wrap"><table><thead><tr><th><button>Market <Icon name="sort"/></button></th><th className="num"><button>CAGR <Icon name="sort"/></button></th><th className="num"><button>TAM · USD B <Icon name="sort"/></button></th><th>Actions</th></tr></thead>
            <tbody>{markets.rows.map((row, i) => <tr key={row[0]} className={i === markets.selected ? 'selected-row' : undefined}>
              <td><div className="name-cell"><span className={'entity-mark ' + (i === markets.selected ? 'green' : 'gray')} aria-hidden="true">{initials(row[0])}</span><strong>{row[0]}</strong></div></td>
              <td className="num"><div className="cagr-cell"><div className="mini-bar" aria-hidden="true"><span style={{width: row[1] / 26 * 100 + '%'}}></span></div>{row[1]}%</div></td>
              <td className="num">{row[2]}</td><td><button className="row-action">Inspect <Icon name="arrow"/></button></td></tr>)}</tbody></table></div>
          <div className="table-footer"><span>{markets.rows.length} markets shown</span><span>CAGR · next five years</span></div></section>
        <aside className="market-inspector"><div className="reader-top"><span className="meta">Market overview</span><Icon name="market"/></div>
          <div data-focus="inspector"><h2>{selected[0]}</h2>
          <dl className="market-facts"><div><dt>CAGR · next five years</dt><dd>{selected[1]}<small>%</small></dd></div><div><dt>Total addressable market</dt><dd>{selected[2]}<small>USD B</small></dd></div></dl>
          <p>{markets.inspector}</p></div>
          <button className="btn primary">Build a market model <Icon name="arrow"/></button><button className="btn quiet">Ask about this market <Icon name="arrow"/></button>
          <div className="inspector-foot">{illustrative} · {markets.mapped} mapped markets</div></aside>
      </div> : <section className="ecosystem surface" data-focus="ecosystem">
        <div className="ecosystem-top"><h2>Your business ecosystem</h2><span>Company → Business segments</span></div>
        <div className="company-hub"><span className="entity-mark green" aria-hidden="true">{cast.companyInitials}</span><strong>{cast.company}</strong></div>
        <div className="ecosystem-branches">{markets.segments.map(name => <button className="segment-node" key={name}><Icon name="branch"/>{name}</button>)}</div>
      </section>}
    </Shell>
  </Sealed>;
});
