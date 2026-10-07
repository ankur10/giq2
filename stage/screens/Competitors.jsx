import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import Shell, {sheets, extra} from './Shell.jsx';
import {Icon} from './icons.jsx';
import {competitors} from '../story.mjs';

const own = '.presence-table tr[data-lit="true"]>*{background:#fff4e8}.presence-table tr[data-lit="true"]>th{box-shadow:inset 3px 0 0 #e07a26}.stage-note{margin:0;padding:12px 18px;font-size:13px;color:var(--muted)}';

// Competitor intelligence, as app.js competitors() renders it: who is present in which market.
export default forwardRef(function Competitors({stepId, index, ...host}, ref) {
  const {companies, presence, lit, note} = competitors;
  return <Sealed ref={ref} sheets={sheets} extra={extra + own} className="stage-screen" data-theme="advisory" {...host}>
    <Shell active="Competitors" title={competitors.title} subtitle={competitors.subtitle}>
      <nav className="tabs"><a className="active">Explorer</a><a>My competitors</a></nav>
      <div className="comparison-intro"><div><h2>Where do you compete?</h2><p>Select companies, then compare their market presence.</p></div><label className="check-control"><input type="checkbox" readOnly/>Show differences only</label></div>
      <div className="company-picker">{companies.map(name => <label className="company-toggle selected" key={name}><input type="checkbox" checked readOnly/><span>{name}</span></label>)}</div>
      <section className="table-panel" data-focus="presence"><div className="table-heading"><h2>Market presence</h2><span className="meta">{companies.length} companies · {presence.length} markets</span></div>
        <div className="table-wrap"><table className="presence-table"><thead><tr><th>Market</th>{companies.map(name => <th key={name}>{name}</th>)}</tr></thead>
          <tbody>{presence.map(([market, values]) => <tr key={market} data-lit={market === lit}><th scope="row">{market}</th>{values.map((yes, i) => <td key={i}>{yes ? <span className="presence yes"><Icon name="check"/>Present</span> : <span className="presence no">— No presence</span>}</td>)}</tr>)}</tbody></table></div>
        <p className="stage-note">{note}</p>
        <div className="table-footer"><span>Illustrative disclosures</span><a className="btn quiet" data-focus="compare-financials">Compare financials <Icon name="arrow"/></a></div></section>
    </Shell>
  </Sealed>;
});
