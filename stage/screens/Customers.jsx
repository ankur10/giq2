import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import Shell, {sheets, extra} from './Shell.jsx';
import {Icon} from './icons.jsx';
import {order, useAfter} from './timing.mjs';
import {customers} from '../story.mjs';

const initials = name => name.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const own = '.stage-filter{transition:background .4s,color .4s,border-color .4s}.stage-filter[aria-pressed="true"]{background:var(--primary);color:var(--on-primary);border-color:var(--primary)}tbody tr{transition:opacity .6s}tbody tr[data-out="true"]{opacity:.18}tbody tr[data-match="true"]>td{background:#fff4e8}tbody tr[data-match="true"]>td:first-child{box-shadow:inset 3px 0 0 #e07a26}';

// A customer view staged in the product's table style. In this repository the Customers screen
// is only a SalesPlay sign-in boundary, so this is one light beat: which customers are building.
export default forwardRef(function Customers({stepId, index, ...host}, ref) {
  const filtered = useAfter(index >= order('customers'), 5.6, host['data-settled']);
  return <Sealed ref={ref} sheets={sheets} extra={extra + own} className="stage-screen" data-theme="advisory" {...host}>
    <Shell active="Customers" title={customers.title} subtitle={customers.subtitle}>
      <div className="toolbar"><div className="tool-group"><label className="search-field"><Icon name="search"/><input type="search" placeholder="Search customers" readOnly/></label>
        <button className="btn stage-filter" data-focus="filter" aria-pressed={filtered}><Icon name="check"/>{customers.filter}</button></div><span className="tag outline">SalesPlay</span></div>
      <section className="table-panel" data-focus="customer-list"><div className="table-heading"><div><h2>Your customers</h2><p>What they buy from you, and what is changing for them.</p></div><span className="meta">{filtered ? 1 : customers.rows.length} of {customers.rows.length} shown</span></div>
        <div className="table-wrap"><table><thead><tr><th>Customer</th><th>Business</th><th>Supplied today</th><th>Latest signal</th></tr></thead>
          <tbody>{customers.rows.map(([name, business, supplied, signal]) => <tr key={name} data-out={filtered && name !== customers.match} data-match={filtered && name === customers.match}>
            <td><div className="name-cell"><span className="entity-mark gray" aria-hidden="true">{initials(name)}</span><strong>{name}</strong></div></td><td>{business}</td><td>{supplied}</td><td>{signal}</td></tr>)}</tbody></table></div>
        <div className="table-footer"><span>Illustrative customers</span><span>Customer intelligence · SalesPlay</span></div></section>
    </Shell>
  </Sealed>;
});
