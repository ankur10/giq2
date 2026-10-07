import React, {forwardRef} from 'react';
import {Sealed} from '../Sealed.jsx';
import Shell, {sheets, extra} from './Shell.jsx';
import {Icon} from './icons.jsx';
import {order} from './timing.mjs';
import {benchmark, illustrative} from '../story.mjs';

const own = '.financial-bar{transform-origin:bottom;transform:scaleY(0)}.financial-bar-value{opacity:0}'
  + '[data-risen="true"] .financial-bar{animation:rise 1.1s cubic-bezier(.16,1,.3,1) calc(1.9s + var(--i) * .14s) both}[data-risen="true"] .financial-bar-value{animation:show .5s calc(2.7s + var(--i) * .14s) both}'
  + '.financial-bar-group[data-lit="true"] .financial-bar{background:#e07a26!important}.chart-area{padding-top:8px}.financial-bar-group[data-lit="true"] .financial-bar-label{font-weight:650;color:var(--ink)}'
  + '@keyframes rise{to{transform:none}}@keyframes show{to{opacity:1}}';

// Competitor benchmarking, as app.js benchmarking() renders its chart view.
export default forwardRef(function Benchmark({stepId, index, ...host}, ref) {
  const max = Math.max(...benchmark.rows.map(row => row[1]));
  return <Sealed ref={ref} sheets={sheets} extra={extra + own} className="stage-screen" data-theme="advisory" {...host}>
    <Shell active="Competitors" crumb="Benchmarking" title={benchmark.title} subtitle={benchmark.subtitle}>
      <nav className="tabs"><a>All companies</a><a className="active">Benchmarking</a></nav>
      <nav className="benchmark-modes"><a className="active">Financial performance & strategy</a><a>Market position</a><a>Product & innovation</a></nav>
      <section className="table-panel" data-risen={index >= order('benchmark')}>
        <div className="table-heading"><div><h2>Financial comparison</h2><p>{benchmark.rows.length} companies · {benchmark.metric}</p></div><a className="btn small"><Icon name="plus"/>New comparison</a></div>
        <div className="benchmark-controls"><div className="tool-group"><span className="tag outline">{illustrative} · $Mn</span></div>
          <div className="tool-group"><div className="segmented"><button><Icon name="list"/>Table</button><button className="active"><Icon name="market"/>Chart</button></div><button className="btn small"><Icon name="download"/>Export</button></div></div>
        <div className="chart-area" data-focus="chart"><div className="financial-chart">{benchmark.rows.map(([name, value], i) => <div className="financial-bar-group" key={name} data-lit={name === benchmark.lit} style={{'--i': i}}>
          <div className="financial-bar" style={{height: Math.max(value / max * 84, 1) + '%'}}><span className="financial-bar-value">{value.toLocaleString('en-GB')}</span></div><span className="financial-bar-label">{name}</span></div>)}</div>
          <p className="zero-label">Zero baseline · Figures in $Mn</p></div>
        <div className="table-footer"><span>{illustrative}</span><button className="row-action">Methodology <Icon name="info"/></button></div></section>
    </Shell>
  </Sealed>;
});
