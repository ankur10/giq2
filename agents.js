/* GrowthIQ agents: the views every agent output is drawn with, the agent hub and agent pages,
   and the agent panels other product pages show. Data: agents-catalogue.js and agents-examples.js.
   All outputs are illustrative examples for the H.B. Fuller workspace. */
(() => {
  'use strict';
  const C = window.GROWTHIQ_AGENT_CATALOGUE, X = window.GROWTHIQ_AGENT_EXAMPLES, MON = window.GROWTHIQ_MONITORS;
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const agent = id => C.find(a => a.id === id);
  const STAGES = [['Spot','Notice what changed and what it means'],['Find','Find and size where to grow'],['Decide','Choose what to pursue and how'],['Test','Check the case before committing'],['Send up','Get the work in front of leadership'],['Watch','Know when something that matters changes']];
  const tone = t => ({up:'ag-up',down:'ag-down',you:'ag-you',neutral:'ag-neutral',flat:'ag-neutral'}[t]||'ag-neutral');
  // Drawn icons, one stroke weight, used everywhere instead of text glyphs.
  const ICON={up:'M6 14l6-6 6 6',down:'M6 10l6 6 6-6',flat:'M6 12h12',arrow:'M5 12h14m-5-5 5 5-5 5',back:'M19 12H5m5-5-5 5 5 5',run:'M7 5v14l11-7z',watch:'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',send:'M4 12 20 4l-6 16-3-7z',change:'M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15m0 5v-5h5',search:'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm9 2-4-4',plus:'M12 5v14M5 12h14',source:'M6 3h9l4 4v14H6zM14 3v5h5'};
  const icon=(n,cls='')=>`<svg class="ag-icon ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICON[n]}"/></svg>`;
  const arrow = d => icon(d==='up'?'up':d==='down'?'down':'flat');
  const link = (target, label, cls='') => `<a class="${cls}" href="#${esc(target)}">${esc(label)}</a>`;

  /* ---------- Signature views ---------- */
  function field(v){
    const W=640,H=340,L=56,R=24,T=20,B=48,sx=x=>L+(x-v.x.min)/(v.x.max-v.x.min)*(W-L-R),sy=y=>H-B-(y-v.y.min)/(v.y.max-v.y.min)*(H-T-B);
    const grid=[0,.25,.5,.75,1].map(f=>`<line x1="${L}" x2="${W-R}" y1="${T+f*(H-T-B)}" y2="${T+f*(H-T-B)}" class="ag-grid"/>`).join('');
    const ghosts=v.points.filter(p=>p.prev).map(p=>`<circle cx="${sx(p.prev.x)}" cy="${sy(p.prev.y)}" r="${p.r}" class="ag-ghost"/><line x1="${sx(p.prev.x)}" y1="${sy(p.prev.y)}" x2="${sx(p.x)}" y2="${sy(p.y)}" class="ag-move" marker-end="url(#ag-arrow)"/>`).join('');
    const dots=v.points.map(p=>{const x=sx(p.x),y=sy(p.y),right=x>W*.62;return `<g class="${tone(p.tone)}"><circle cx="${x}" cy="${y}" r="${p.r}" class="ag-dot"/><text x="${right?x-p.r-6:x+p.r+6}" y="${y+4}" text-anchor="${right?'end':'start'}" class="ag-label">${esc(p.label)}${p.tag?` · ${esc(p.tag)}`:''}</text></g>`}).join('');
    return `<figure class="ag-view"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(v.x.label)} against ${esc(v.y.label)}"><defs><marker id="ag-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" class="ag-arrowhead"/></marker></defs>${grid}<line x1="${L}" x2="${L}" y1="${T}" y2="${H-B}" class="ag-axis"/><line x1="${L}" x2="${W-R}" y1="${H-B}" y2="${H-B}" class="ag-axis"/>${ghosts}${dots}<text x="${(W+L)/2}" y="${H-12}" text-anchor="middle" class="ag-axis-label">${esc(v.x.label)} →</text><text x="16" y="${(H-B+T)/2}" text-anchor="middle" transform="rotate(-90 16 ${(H-B+T)/2})" class="ag-axis-label">${esc(v.y.label)} →</text></svg>${v.size?`<figcaption>Circle size: ${esc(v.size)}. Faint circles show the previous run.</figcaption>`:v.points.some(p=>p.prev)?'<figcaption>Faint circles show the previous run.</figcaption>':''}</figure>`;
  }
  function timeline(v){
    const W=640,H=300,L=44,R=150,T=20,B=40,all=v.series.flatMap(s=>s.values),min=Math.floor(Math.min(...all)-.5),max=Math.ceil(Math.max(...all)+.5),n=v.labels.length;
    const sx=i=>L+i/(n-1)*(W-L-R),sy=y=>H-B-(y-min)/(max-min)*(H-T-B);
    const ticks=[min,(min+max)/2,max].map(y=>`<line x1="${L}" x2="${W-R}" y1="${sy(y)}" y2="${sy(y)}" class="ag-grid"/><text x="${L-8}" y="${sy(y)+4}" text-anchor="end" class="ag-tick">${y.toFixed(1)}</text>`).join('');
    const marks=(v.marks||[]).map(m=>`<line x1="${sx(m.i)}" x2="${sx(m.i)}" y1="${T}" y2="${H-B}" class="ag-mark"/><text x="${sx(m.i)}" y="${T-6}" text-anchor="middle" class="ag-tick">${esc(m.label)}</text>`).join('');
    const lines=v.series.map(s=>{const pts=s.values.map((y,i)=>`${sx(i)},${sy(y)}`).join(' '),last=s.values.at(-1);return `<g class="${tone(s.tone)}"><polyline points="${pts}" class="ag-line"/><circle cx="${sx(n-1)}" cy="${sy(last)}" r="4.5" class="ag-dot"/><text x="${sx(n-1)+10}" y="${sy(last)+4}" class="ag-label">${esc(s.label)} ${last}</text></g>`}).join('');
    const xl=v.labels.map((l,i)=>`<text x="${sx(i)}" y="${H-B+18}" text-anchor="middle" class="ag-tick">${esc(l)}</text>`).join('');
    return `<figure class="ag-view"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Forecast revisions over time">${ticks}${marks}${lines}${xl}</svg><figcaption>${esc(v.unit)}, as MnM forecast it each quarter.</figcaption></figure>`;
  }
  function path(v){
    return `<figure class="ag-view"><ol class="ag-path">${v.steps.map(s=>`<li class="${tone(s.tone)}"><span class="ag-path-value">${esc(s.value)}</span><strong>${esc(s.label)}</strong><small>${esc(s.sub)}</small></li>`).join('')}</ol></figure>`;
  }
  function chain(v){
    const W=640,rowL=Math.max(v.left.length,1),rowM=Math.max(v.mid.length,1),H=Math.max(rowL,rowM)*44+30;
    const yl=i=>20+i*(H-40)/(rowL-1||1),ym=i=>20+i*(H-40)/(rowM-1||1),xL=150,xM=360,xR=560;
    const links=v.links.map(([a,b,w])=>`<path d="M${xL} ${yl(a)} C ${(xL+xM)/2} ${yl(a)}, ${(xL+xM)/2} ${ym(b)}, ${xM-8} ${ym(b)}" class="ag-link ${tone(v.mid[b].dir)}" style="stroke-width:${w*2.2}"/>`).join('')+v.mid.map((m,i)=>`<path d="M${xM+150} ${ym(i)} C ${xR-40} ${ym(i)}, ${xR-60} ${H/2}, ${xR-6} ${H/2}" class="ag-link ${tone(m.dir)}" style="stroke-width:3"/>`).join('');
    const left=v.left.map((n,i)=>`<text x="${xL-10}" y="${yl(i)+4}" text-anchor="end" class="ag-label">${esc(n.label)} <tspan class="ag-tick">${esc(n.growth)}</tspan></text>`).join('');
    const mid=v.mid.map((m,i)=>`<g class="${tone(m.dir)}"><rect x="${xM-6}" y="${ym(i)-13}" width="160" height="26" rx="3" class="ag-node"/><circle cx="${xM+6}" cy="${ym(i)}" r="3.5" class="ag-node-dot"/><text x="${xM+15}" y="${ym(i)+4}" class="ag-label">${esc(m.label)}</text></g>`).join('');
    return `<figure class="ag-view"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Demand chain from end markets through key customers to you"><text x="${xL-10}" y="10" text-anchor="end" class="ag-tick">Their customers' markets</text><text x="${xM}" y="10" class="ag-tick">Your key customers</text>${links}${left}${mid}<g class="ag-you"><rect x="${xR-6}" y="${H/2-16}" width="84" height="32" rx="3" class="ag-node"/><text x="${xR+4}" y="${H/2+4}" class="ag-label ag-strong">${esc(v.right.label)}</text></g></svg><figcaption>Line thickness shows how much of each customer's business the end market drives.</figcaption></figure>`;
  }
  function board(v){
    return `<figure class="ag-view"><div class="ag-board">${v.tiles.map(t=>`<div class="ag-tile ${tone(t.dir)}"><span class="ag-tile-delta">${arrow(t.dir)} ${esc(t.delta)}</span><strong>${esc(t.label)}</strong><small>${esc(t.sub)}</small><em>${esc(t.note)}</em></div>`).join('')}</div></figure>`;
  }
  function grid(v){
    const max=v.heat?Math.max(...v.rows.flatMap(r=>r.cells)):0;
    const cell=c=>v.heat?`<td class="ag-heat" style="--heat:${(c/max).toFixed(2)}">${c}</td>`:c==='New'?'<td class="ag-cell-new"><span>New</span></td>':c==='Yes'?'<td class="ag-cell-yes"><i></i><span class="sr-only">Present</span></td>':'<td class="ag-cell-no"><i></i><span class="sr-only">Absent</span></td>';
    return `<figure class="ag-view"><div class="ag-table-wrap"><table class="ag-grid-table"><thead><tr><th></th>${v.cols.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${v.rows.map(r=>`<tr><th>${esc(r.label)}</th>${r.cells.map(cell).join('')}</tr>`).join('')}</tbody></table></div>${v.responses?`<ol class="ag-responses">${v.responses.map(r=>`<li>${esc(r)}</li>`).join('')}</ol>`:''}<figcaption>${v.heat?'Open roles in the last 30 days. Darker means more hiring.':'Filled: present. Hollow: absent. New: since the last run.'}</figcaption></figure>`;
  }
  function dial(v){
    const spark=v.trend?(()=>{const w=200,h=46,mn=Math.min(...v.trend)-2,mx=Math.max(...v.trend)+2,p=v.trend.map((y,i)=>`${i/(v.trend.length-1)*w},${h-(y-mn)/(mx-mn)*h}`).join(' ');return `<svg viewBox="0 0 ${w} ${h}" class="ag-spark" role="img" aria-label="Trend"><polyline points="${p}"/></svg>`})():'';
    return `<figure class="ag-view"><div class="ag-dial"><div class="ag-dial-value"><span>${esc(v.label)}</span><strong>${esc(v.value)}</strong><small>${esc(v.sub)}</small>${spark}</div><div class="ag-dial-bars${v.level?' level':''}">${v.bars.map(b=>`<div class="ag-bar-row"><span>${esc(b.label)}</span><span class="ag-bar"><i class="${b.value<0?'neg':'pos'}" style="--w:${Math.abs(b.value)*(v.level?100:50)}%"></i></span><small>${esc(b.note)}</small></div>`).join('')}</div></div><figcaption>${v.trend?'Bars show each factor; the line shows the score month by month.':'Bars rank what moves the answer most.'}</figcaption></figure>`;
  }
  function scoreboard(v){
    const cls=x=>/Confirmed|Quiet/.test(x)?'ag-up':/Refuted|lit/.test(x)?'ag-down':'ag-neutral';
    return `<figure class="ag-view"><div class="ag-score">${v.rows.map(r=>`<div class="ag-score-row ${cls(r.verdict)}"><p>${esc(r.claim)}</p><span class="ag-verdict">${esc(r.verdict)}</span><span class="ag-bar"><i class="pos" style="--w:${r.score}%"></i></span><small>${r.score}%</small>${r.lane?`<em>${esc(r.lane)}</em>`:''}</div>`).join('')}</div></figure>`;
  }
  function stages(v){
    return `<figure class="ag-view"><div class="ag-stages" style="--n:${v.stages.length}">${v.stages.map((s,i)=>`<section><h4>${esc(s)}</h4>${v.items.filter(it=>it.stage===i).map(it=>`<div class="ag-stage-item"><strong>${esc(it.label)}</strong><small>${esc(it.date)}</small><em>${esc(it.note)}</em></div>`).join('')}</section>`).join('')}</div></figure>`;
  }
  function bars(v){
    const W=640,H=300,L=48,R=20,T=20,B=40,all=[...v.series[0].values,...v.line.values],max=Math.ceil(Math.max(...all)/100)*100,min=Math.floor(Math.min(...all)*.8/100)*100,n=v.labels.length,bw=(W-L-R)/n;
    const sy=y=>H-B-(y-min)/(max-min)*(H-T-B);
    const b=v.series[0].values.map((y,i)=>{const over=y>v.line.values[i];return `<rect x="${L+i*bw+bw*.2}" y="${sy(y)}" width="${bw*.6}" height="${H-B-sy(y)}" class="${over?'ag-bar-over':'ag-bar-ok'}"/><text x="${L+i*bw+bw/2}" y="${H-B+18}" text-anchor="middle" class="ag-tick">${esc(v.labels[i])}</text>`}).join('');
    const pts=v.line.values.map((y,i)=>`${L+i*bw+bw/2},${sy(y)}`).join(' ');
    return `<figure class="ag-view"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(v.series[0].label)} against ${esc(v.line.label)}">${[min,max].map(y=>`<text x="${L-8}" y="${sy(y)+4}" text-anchor="end" class="ag-tick">${y}</text>`).join('')}${b}<polyline points="${pts}" class="ag-line ag-you-line"/></svg><figcaption>Bars: ${esc(v.series[0].label)}; red where it exceeds demand. Line: ${esc(v.line.label)}.</figcaption></figure>`;
  }
  function brief(v){
    return `<figure class="ag-view"><div class="ag-brief"><h4>${esc(v.title)}</h4><div class="ag-brief-figures">${v.figures.map(([n,l,s])=>`<div><strong>${esc(n)}</strong><span>${esc(l)}</span><a class="ag-source" href="#agent-hub">${esc(s)}</a></div>`).join('')}</div><ul>${v.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul><p class="ag-ask"><b>Decision asked for:</b> ${esc(v.ask)}</p></div></figure>`;
  }
  const VIEWS={field,timeline,path,chain,board,grid,dial,scoreboard,stages,bars,brief};
  const view=v=>VIEWS[v.type](v);

  /* ---------- One agent output ---------- */
  const status=x=>`<span class="ag-status ag-status-${esc(x.status.toLowerCase())}"><i></i>${esc(x.status)}</span>`;
  const changedLine=x=>x.changed?.length?`<p class="ag-delta">${icon('change')}<span><b>Since last run</b> ${x.changed.map(esc).join('<span class="ag-sep">·</span>')}</span></p>`:'';
  function card(id){
    const a=agent(id),x=X[id];if(!a||!x)return '';
    return `<article class="ag-card" aria-labelledby="ag-card-${id}">
      <header class="ag-card-head"><div><h3 id="ag-card-${id}">${link('agent/'+id,a.name)}</h3><p class="ag-meta">${esc(a.stage)} · ${esc(a.freq)} · last run ${esc(x.lastRun)}</p></div>${status(x)}</header>
      <p class="ag-call">${esc(x.call)}</p>
      ${changedLine(x)}
      ${view(x.view)}
      <footer class="ag-card-foot"><span class="ag-confidence">${esc(x.confidence)} confidence</span><span class="ag-example">Example output</span><div class="ag-actions">${x.actions.slice(0,2).map(([l,t])=>link(t,l,'ag-action')).join('')}<a class="ag-action ag-open" href="#agent/${id}">Open agent ${icon('arrow')}</a></div></footer>
    </article>`;
  }

  /* ---------- Agents on product pages: a list of calls beside one open output ---------- */
  const picked={};
  function reader(key,title,sub,ids){
    const sel=ids.includes(picked[key])?picked[key]:ids[0];
    return `<section class="ag-reader" data-ag-reader="${key}" aria-label="${esc(title)}">
      <header class="ag-reader-head"><div><h2>${esc(title)}</h2><p>${esc(sub)}</p></div><a class="ag-all" href="#agent-hub">All agents ${icon('arrow')}</a></header>
      <div class="ag-reader-body${ids.length===1?' single':''}">
        ${ids.length>1?`<div class="ag-reader-list" role="tablist" aria-label="${esc(title)}">${ids.map(id=>{const a=agent(id),x=X[id];return `<button role="tab" id="ag-tab-${key}-${id}" aria-selected="${id===sel}" aria-controls="ag-panel-${key}" data-ag-pick="${key}:${id}"><span class="ag-reader-name">${esc(a.name)}${status(x)}</span><span class="ag-reader-call">${esc(x.call)}</span></button>`}).join('')}</div>`:''}
        <div class="ag-reader-panel" id="ag-panel-${key}" role="tabpanel" ${ids.length>1?`aria-labelledby="ag-tab-${key}-${sel}"`:''}>${card(sel)}</div>
      </div>
    </section>`;
  }

  /* ---------- Intelligence Studio: the agent hub ---------- */
  function hub(){
    const live=C.filter(a=>X[a.id]&&['Live','Sent'].includes(X[a.id].status));
    return `<div class="ag-hub">
      <section class="ag-door"><label class="ag-door-field" for="ag-door-input">${icon('search')}<span class="sr-only">Describe what you need to know</span><input id="ag-door-input" type="search" placeholder="What do you need to know? For example: which of our customers are changing?" autocomplete="off"></label><div id="ag-door-results" class="ag-door-results" aria-live="polite"></div></section>
      <section class="ag-section"><header class="ag-section-head"><h2>Running for you</h2><p>${live.length} agents run on a schedule or watch continuously for H.B. Fuller.</p></header>
        <ul class="ag-rows">${live.map(a=>`<li><a href="#agent/${a.id}" class="ag-row"><span class="ag-row-name">${esc(a.name)}</span>${status(X[a.id])}<span class="ag-row-call">${esc(X[a.id].call)}</span><span class="ag-row-when">${esc(X[a.id].lastRun)}</span>${icon('arrow','ag-row-go')}</a></li>`).join('')}</ul></section>
      ${STAGES.map(([s,line])=>`<section class="ag-section" aria-label="${esc(s)}"><header class="ag-section-head"><h2>${esc(s)}</h2><p>${esc(line)}</p></header>
        <ul class="ag-rows ag-catalog">${C.filter(a=>a.stage===s).map(a=>`<li><a href="#agent/${a.id}" class="ag-row"><span class="ag-row-name">${esc(a.name)}<small>${esc(a.question)}</small></span><span class="ag-row-sig">${esc(a.signature.split('.')[0])}</span><span class="ag-row-when">${esc(a.freq)}</span>${icon('arrow','ag-row-go')}</a></li>`).join('')}</ul></section>`).join('')}
      <p class="ag-note">Agent outputs in this preview are illustrative examples for H.B. Fuller; customers are invented. <a href="#studio">Open the earlier Studio tasks</a>.</p>
    </div>`;
  }
  function suggest(q){
    const words=q.toLowerCase().split(/\W+/).filter(w=>w.length>2);if(!words.length)return '';
    const score=a=>words.reduce((s,w)=>s+((a.name+' '+a.question+' '+a.call+' '+a.for).toLowerCase().includes(w)?1:0),0);
    const top=C.map(a=>[score(a),a]).filter(([s])=>s).sort((x,y)=>y[0]-x[0]).slice(0,3);
    return top.length?top.map(([,a])=>`<a href="#agent/${a.id}" class="ag-row"><span class="ag-row-name">${esc(a.name)}<small>${esc(a.question)}</small></span>${icon('arrow','ag-row-go')}</a>`).join(''):'<p class="ag-door-empty">No agent matches yet. Ask GrowthIQ handles open questions.</p>';
  }

  /* ---------- One agent ---------- */
  function page(id){
    const a=agent(id),x=X[id];if(!a)return `<p>This agent does not exist. ${link('agent-hub','Back to all agents')}</p>`;
    return `<div class="ag-page">
      <a class="ag-back" href="#agent-hub">${icon('back')}All agents</a>
      <header class="ag-page-head"><div><h2>${esc(a.name)}</h2><p class="ag-q-lg">${esc(a.question)}</p><p class="ag-meta">${esc(a.stage)} · ${esc(a.freq)} · for ${esc(a.for.toLowerCase())}</p></div><div class="ag-page-tools"><button class="btn" data-ag-run="${id}">${icon('run')}Run again</button><button class="btn" data-ag-watch="${id}">${icon('watch')}Watch</button><button class="btn primary" data-ag-brief="${id}">${icon('send')}Send up as a brief</button></div></header>
      <dl class="ag-facts"><div><dt>Status</dt><dd>${status(x)}</dd></div><div><dt>Last run</dt><dd>${esc(x.lastRun)}</dd></div><div><dt>Next run</dt><dd>${esc(x.nextRun)}</dd></div><div><dt>Confidence</dt><dd>${esc(x.confidence)}</dd></div><div><dt>Monitors</dt><dd>${esc(a.sources)}</dd></div></dl>
      <div class="ag-page-grid">
        <section class="ag-main" aria-label="Latest output"><p class="ag-call ag-call-lg">${esc(x.call)}</p>${changedLine(x)}${view(x.view)}<p class="ag-example-line"><span class="ag-example">Example output</span>Figures and events are illustrative.</p></section>
        <aside class="ag-side">
          <section><h3>Evidence</h3><ul class="ag-evidence">${x.evidence.map(([l,s])=>`<li>${icon('source')}<span>${esc(l)}<small>${esc(s)}</small></span></li>`).join('')}</ul></section>
          <section><h3>Next actions</h3><div class="ag-next">${x.actions.map(([l,t])=>`<a class="ag-next-link" href="#${esc(t)}">${esc(l)}${icon('arrow')}</a>`).join('')}</div></section>
          <section><h3>Watching for</h3><p>${esc(a.watch)}</p></section>
          <section><h3>Run history</h3><ol class="ag-history"><li><b>${esc(x.lastRun)}</b><span>This run</span></li>${x.history.map(([w,t])=>`<li><b>${esc(w)}</b><span>${esc(t)}</span></li>`).join('')}</ol></section>
          <section><h3>You give</h3><p>${esc(a.give)}</p></section>
          <section><h3>Why only GrowthIQ</h3><p>${esc(a.only)}</p></section>
        </aside>
      </div>
    </div>`;
  }

  /* ---------- Customers: a workspace for H.B. Fuller's key customers ---------- */
  const CUSTOMERS=[["Corvex Automotive","Auto & transport OEMs","Structural and pack-bonding adhesives","EV assembly","up"],["Brightline Packaging","Packaging converters","Hot melts and laminating adhesives","E-commerce parcels","up"],["Solara Modules","Industrial OEMs","Encapsulants and edge sealants","Solar installations","up"],["Meridian MedTech","Medical & healthcare OEMs","Skin-contact adhesives","Medical wearables","up"],["Kestrel Building Products","Building materials OEMs","Panel and insulation adhesives","New housing","flat"],["Alder Woodworks","Construction contractors","Wood and flooring adhesives","Renovation","flat"],["Northway Hygiene","Disposable hygiene OEMs","Elastic and construction adhesives","Baby care, adult incontinence","down"],["Harbor Electronics","Industrial OEMs","Conformal coatings","Consumer electronics","down"]];
  function customers(){
    const n=d=>CUSTOMERS.filter(c=>c[4]===d).length;
    return `<div class="ag-customers">
      ${reader('customers','Customer agents','Shifts in your customers, and in their customers.',['customer-shift','customers-customers'])}
      <section class="ag-section"><header class="ag-section-head ag-section-split"><div><h2>Key customers</h2><p>${n('up')} rising, ${n('flat')} steady and ${n('down')} falling in demand for what you sell them.</p></div><button class="btn" data-ag-add-customer>${icon('plus')}Add a customer</button></header>
      <div class="ag-table-wrap"><table class="ag-table"><thead><tr><th scope="col">Customer</th><th scope="col">Segment</th><th scope="col">What you sell them</th><th scope="col">Their main end market</th><th scope="col">Demand for you</th></tr></thead><tbody>${CUSTOMERS.map(([nm,sg,w,e,d])=>`<tr><th scope="row">${esc(nm)}</th><td>${esc(sg)}</td><td>${esc(w)}</td><td>${esc(e)}</td><td><span class="ag-dir ${tone(d)}">${arrow(d)}${d==='up'?'Rising':d==='down'?'Falling':'Steady'}</span></td></tr>`).join('')}</tbody></table></div><p class="ag-note">Example customers, invented for this preview.</p></section>
    </div>`;
  }

  /* ---------- Radar: alerts, monitors and emails ---------- */
  const monitorsOn=new Set(MON.map((m,i)=>m[5]?i:-1).filter(i=>i>=0));
  const EMAILS=[["Morning brief","Strategy, market intelligence","Daily, only when there is something worth reading","Signal Triage · Customer Shift · Launch Watch"],["Alert","The owner of the call","Rarely: when a watch flips a call; at most two a week","Watch"],["Growth bets","Leadership","Weekly","Growth Portfolio"],["Market shifts","Strategy, leadership","Monthly","Growth Score · Market Shift Radar · Capacity Tracker · Regulation Watch"],["Customer outlook","Strategy, sales leadership","Quarterly","Customers' Customers · Customer Shift"],["What GrowthIQ did for you","Leadership, account owner","Quarterly","Growth Portfolio · research value"]];
  function monitorRows(){
    const areas=[...new Set(MON.map(m=>m[0]))];
    return areas.map(area=>`<section class="ag-mon-area"><h3>${esc(area)}</h3><ul>${MON.map((m,i)=>[m,i]).filter(([m])=>m[0]===area).map(([m,i])=>`<li class="ag-mon"><span><b>${esc(m[1])}</b><small>${esc(m[2])} · ${esc(m[3])} · feeds ${esc(m[4])}</small></span><button class="ag-switch" role="switch" aria-checked="${monitorsOn.has(i)}" aria-label="${esc(m[1])}, ${esc(area)}" data-ag-monitor="${i}"></button></li>`).join('')}</ul></section>`).join('');
  }
  function morningBrief(){
    const items=['signal-triage','customer-shift','launch-watch'].map(id=>[agent(id).name,X[id].call]);
    return `<div class="ag-email" aria-label="Morning brief preview"><div class="ag-email-top"><span>GrowthIQ · Morning brief</span><span>06:30</span></div><h3>Three things worth your attention</h3>${items.map(([n,c],i)=>`<div class="ag-email-item"><p class="ag-meta">${i===0?'Act':'Watch'} · ${esc(n)}</p><p>${esc(c)}</p><p class="ag-email-actions"><span>Add to portfolio</span><span>Forward as brief</span><span>Not relevant</span></p></div>`).join('')}<p class="ag-email-foot">Sent because three signals passed your threshold. Quiet days send nothing.</p></div>`;
  }
  function radar(){
    return `<div class="ag-radar">
      <p class="ag-radar-status"><span><b id="ag-mon-count">${monitorsOn.size}</b> monitors on</span><span><b>${monitorsOn.size*6}</b> watches across 5 competitors, 8 key customers and 4 markets</span><span><b>2</b> triggers this week</span></p>
      ${reader('radar','Alerts','What fired this week, and which call it affects.',['watch'])}
      <section class="ag-section"><header class="ag-section-head"><h2>Monitor library</h2><p>Switch on ready-made monitors. GrowthIQ sets each one up from your competitors, customers and markets, maps every event to MnM's markets, and removes duplicates.</p></header><div class="ag-mon-grid">${monitorRows()}</div></section>
      <section class="ag-section"><header class="ag-section-head"><h2>Emails</h2><p>Each email has one job. None is sent when there is nothing worth reading.</p></header><div class="ag-email-layout"><div class="ag-table-wrap"><table class="ag-table"><thead><tr><th scope="col">Email</th><th scope="col">For</th><th scope="col">When</th><th scope="col">Drawn from</th></tr></thead><tbody>${EMAILS.map(e=>`<tr><th scope="row">${esc(e[0])}</th><td>${esc(e[1])}</td><td>${esc(e[2])}</td><td>${esc(e[3])}</td></tr>`).join('')}</tbody></table></div>${morningBrief()}</div></section>
      <h2 class="ag-radar-trackers">Your trackers</h2>
    </div>`;
  }

  /* ---------- Panels for existing product pages ---------- */
  function panel(route){
    if(route==='feed')return reader('feed','Agents for you','Your growth position and today\'s signals.',['growth-score','signal-triage']);
    if(route==='home')return reader('home','Signal Triage','Today\'s signals, ranked by what is at stake for you.',['signal-triage']);
    if(route==='markets')return reader('markets','Market agents','Where your markets are heading, and where to grow next.',['opportunity-scout','market-shift-radar','capacity-tracker','regulation-watch']);
    if(route==='ecosystem')return reader('ecosystem','Ecosystem agents','How changes and capital travel through your connected markets.',['demand-tracer','deal-radar']);
    if(route==='competitors')return reader('competitors','Competitor agents','What your rivals are doing, often before they announce it.',['competitor-move','living-landscape','launch-watch','hiring-signals']);
    if(route==='work')return reader('work','For leadership','Your growth bets, and the briefs sent up.',['growth-portfolio','stakeholder-brief']);
    if(route==='radar')return radar();
    return '';
  }

  /* ---------- Interaction ---------- */
  let toastTimer;
  function toast(text){let el=document.getElementById('ag-toast');if(!el){el=document.createElement('div');el.id='ag-toast';el.setAttribute('role','status');document.body.append(el)}el.textContent=text;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),4000)}
  document.addEventListener('keydown',e=>{const t=e.target.closest?.('[data-ag-pick]');if(!t||!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft'].includes(e.key))return;e.preventDefault();const tabs=[...t.parentElement.querySelectorAll('[role=tab]')],i=tabs.indexOf(t),n=tabs[(i+(['ArrowDown','ArrowRight'].includes(e.key)?1:tabs.length-1))%tabs.length];n.focus();n.click()});
  document.addEventListener('input',e=>{if(e.target.id==='ag-door-input')document.getElementById('ag-door-results').innerHTML=suggest(e.target.value)});
  document.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    if(b.dataset.agMonitor!==undefined){const i=Number(b.dataset.agMonitor),on=!monitorsOn.has(i);on?monitorsOn.add(i):monitorsOn.delete(i);b.setAttribute('aria-checked',String(on));const c=document.getElementById('ag-mon-count');if(c)c.textContent=monitorsOn.size;toast(on?'Monitor switched on in this preview.':'Monitor switched off in this preview.')}
    if(b.dataset.agPick){const [key,id]=b.dataset.agPick.split(':');picked[key]=id;const root=b.closest('[data-ag-reader]');root.querySelectorAll('[role=tab]').forEach(t=>t.setAttribute('aria-selected',String(t===b)));const panelEl=root.querySelector('[role=tabpanel]');panelEl.setAttribute('aria-labelledby',b.id);panelEl.innerHTML=card(id)}
    if(b.dataset.agRun)toast('Example agent: no new run in this preview.');
    if(b.dataset.agWatch)toast('Added to Watch in this preview.');
    if(b.dataset.agBrief){location.hash='agent/stakeholder-brief'}
    if(b.hasAttribute('data-ag-add-customer'))toast('Adding customers is not connected in this preview.');
  });

  window.GROWTHIQ_AGENTS={hub,page,customers,panel,card,view};
})();
