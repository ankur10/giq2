import React,{Suspense,lazy,useCallback,useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {scenes,evidence,marketNames,chain,question,brief} from './keynote-story.js';
const Scene=lazy(()=>import('./keynote-scene.jsx'));
const glyphs={arrow:'M4 12h15m-6-6 6 6-6 6',back:'M20 12H5m6-6-6 6 6 6',close:'m6 6 12 12M6 18 18 6',expand:'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5',pause:'M8 5v14M16 5v14',play:'m8 4 12 8-12 8Z',notes:'M5 3h14v18H5zM9 8h6m-6 4h6m-6 4h4',source:'M8 5H4v16h16v-4M13 3h8v8m0-8L10 14',download:'M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4',check:'m5 12 4 4L19 6'};
function Icon({name}){return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={glyphs[name]||glyphs.arrow}/></svg>}
class SceneBoundary extends React.Component{
  constructor(p){super(p);this.state={failed:false}}
  static getDerivedStateFromError(){return{failed:true}}
  componentDidCatch(){this.props.onFail()}
  render(){return this.state.failed?null:this.props.children}
}
function useReducedMotion(){
  const [value,set]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{const m=matchMedia('(prefers-reduced-motion: reduce)'),cb=()=>set(m.matches);m.addEventListener('change',cb);return()=>m.removeEventListener('change',cb)},[]);
  return value;
}
function Network({step,still,selected,onSelect,simple}){
  const labels=useRef([]),chainLabels=useRef([]);
  const [ready,setReady]=useState(false),[failed,setFailed]=useState(false);
  const [webgl]=useState(()=>{try{const c=document.createElement('canvas'),gl=c.getContext('webgl2');if(!gl)return false;gl.getExtension('WEBGL_lose_context')?.loseContext();return true}catch{return false}});
  const handleReady=useCallback(ok=>{setReady(ok);if(!ok)setFailed(true)},[]);
  const fail=useCallback(()=>setFailed(true),[]);
  const showScene=webgl&&!failed&&!simple;
  const chainMode=step===3;
  return <div className={'kn-network '+(chainMode?'kn-network-chain':'')} data-ready={ready&&showScene}>
    <div className="kn-canvas" aria-hidden="true">{showScene&&<SceneBoundary onFail={fail}><Suspense fallback={null}><Scene step={step} still={still} selected={selected} labels={labels} chainLabels={chainLabels} onReady={handleReady}/></Suspense></SceneBoundary>}</div>
    {!showScene&&!chainMode&&<svg className="kn-flat-network" viewBox="0 0 640 440" aria-hidden="true"><path d="M320 220 120 110 300 65 520 120 560 325 170 345 120 110M320 220 520 120M320 220 560 325M320 220 170 345"/><path className="kn-flat-path" d="M300 65 480 220 350 325 320 220"/>{[[120,110],[300,65],[520,120],[560,325],[170,345],[480,220],[350,325]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="4"/>)}</svg>}
    {!chainMode&&<div className="kn-map-labels" aria-label="Illustrative market network">{marketNames.map((name,i)=><button key={name} ref={el=>labels.current[i]=el} className={'kn-map-label '+(i===0?'kn-company':'')+(selected===i?' kn-map-selected':'')} style={{'--i':i}} onClick={()=>onSelect(i)} tabIndex={step<2&&i>0?-1:0} aria-pressed={selected===i}>{i===0?<><span>OSTREL</span><small>COATINGS</small></>:name}</button>)}</div>}
    {chainMode&&<div className="kn-chain-labels" aria-label="Opportunity chain">{chain.map((name,i)=><div key={name} ref={el=>chainLabels.current[i]=el}><span className="kn-chain-number">0{i+1}</span><strong>{name}</strong><small>{['Get bigger','Need grows','A new requirement','An opportunity'][i]}</small></div>)}</div>}
    <div className="kn-orbit-note">{chainMode?'Follow the need. Find the opportunity.':step===0?'One business. An interconnected world.':step===1?'A familiar field of view.':<>Illustrative connections <span>·</span> Select a market to focus</>}</div>
  </div>;
}
function Customer(){
  return <div className="kn-customer">
    <div className="kn-customer-name"><span>Talmir Motors</span><small>Illustrative customer</small></div>
    <div className="kn-shift-charts">
      <div className="kn-chart-block"><div className="kn-donut" style={{'--share':'22%'}}><div><strong>22<span>%</span></strong><small>electric</small></div></div><p>Revenue · five years ago</p></div>
      <Icon name="arrow"/>
      <div className="kn-chart-block"><div className="kn-donut kn-donut-new" style={{'--share':'70%'}}><div><strong>70<span>%</span></strong><small>electric</small></div></div><p>Pipeline · today</p></div>
    </div>
    <p className="kn-measure-note">Different measures: historical revenue and current pipeline.</p>
    <div className="kn-shifts">{[['Buyer','Powertrain purchasing','Battery engineering'],['Specification','Corrosion & finish','Thermal runaway & fire safety'],['Timing','Model-year cycles','New battery-pack line']].map(([label,from,to],i)=><div key={label} style={{'--order':i}}><span>{label}</span><s>{from}</s><Icon name="arrow"/><strong>{to}</strong></div>)}</div>
  </div>;
}
function Competition({inspect}){
  return <div className="kn-competition"><div className="kn-company-name">Quendra Chemicals <span>Illustrative competitor</span></div>
    <div className="kn-signal-stack">{[['Capability','Battery engineers hired','People follow a new technical need.'],['Intellectual property','Patents filed','Research becomes a strategic direction.'],['Production','Pilot line built','The direction starts taking physical shape.']].map(([label,title,desc],i)=><button key={title} className="kn-signal" style={{'--order':i}} onClick={()=>inspect('competitor')}><span className="kn-signal-index">0{i+1}</span><div><h3>{title}</h3><p>{label}: {desc}</p></div><Icon name="source"/></button>)}</div>
    <p className="kn-competition-caption">The opportunity is becoming visible to others.</p>
  </div>;
}
function Lenses({lens,setLens,inspect}){
  const lensData=[['markets','Markets','A new technical need','Battery fire protection'],['customer','Customers','A project taking shape','Talmir’s battery-pack line'],['competitor','Competitors','Capabilities in motion','Quendra’s investment signals']];
  return <div className="kn-lenses">
    <div className="kn-lens-orbits" aria-label="Intelligence perspectives">{lensData.map(([id,title,desc],i)=><button key={id} style={{'--order':i}} className={lens===id?'is-selected':''} onClick={()=>setLens(id)} aria-pressed={lens===id}><span>{title}</span><small>{desc}</small></button>)}<div className="kn-lens-center" aria-hidden="true"><Icon name="check"/></div></div>
    <div className="kn-lens-insight" key={lens}><h3>{lensData.find(x=>x[0]===lens)[3]}</h3><button className="kn-text-button" onClick={()=>inspect(lens)}>Inspect the story evidence <Icon name="source"/></button></div>
  </div>;
}
function Research({answer,setAnswer,inspect}){
  const answerHeading=useRef();
  useEffect(()=>{if(answer)answerHeading.current?.focus({preventScroll:true})},[answer]);
  return <div className="kn-research">
    <div className="kn-research-top"><span className="kn-mini-brand">GrowthIQ</span><span>Prepared example</span></div>
    <div className="kn-question"><p>{question}</p><div>{['Market need','Customer project','Competitor movement'].map(x=><span key={x}>{x}</span>)}</div></div>
    {!answer?<div className="kn-answer-prompt"><p>The context stays with the question.</p><button className="kn-primary" onClick={()=>setAnswer(true)}>Reveal the prepared perspective <Icon name="arrow"/></button><small>A synthesis of the illustrated story. No live research is run.</small></div>:<div className="kn-answer"><h3 ref={answerHeading} tabIndex={-1}>Investigate battery fire-protection coatings for Talmir’s new line.</h3><p>Start with battery engineering. Understand the thermal-runaway requirement and the weight constraint, then validate the fit of Ostrel’s coatings.</p><div className="kn-answer-sources">{[['battery','Market need'],['customer','Customer shift'],['competitor','Competitor signals']].map(([id,label])=><button key={id} onClick={()=>inspect(id)}>{label}<Icon name="source"/></button>)}</div><div className="kn-answer-bottom"><span>Prepared from the Ostrel explainer</span><a href="ask-results.html" target="_blank" rel="noreferrer">Open captured product results <Icon name="source"/></a></div></div>}
  </div>;
}
function Action({download,inspect}){
  const items=[['Opportunity','Battery fire-protection coatings'],['Customer','Talmir Motors'],['Project','New battery-pack line'],['Relevant role','Head of battery engineering']];
  return <div className="kn-action"><div className="kn-action-path">{items.map(([label,value],i)=><div key={label} style={{'--order':i}}><span>0{i+1} <small>{label}</small></span><strong>{value}</strong>{i<3&&<Icon name="arrow"/>}</div>)}</div><div className="kn-conversation"><span>The conversation</span><blockquote>“How can your new battery-pack line pass thermal-runaway tests <em>without adding weight?</em>”</blockquote></div><div className="kn-action-tools"><button className="kn-primary" onClick={download}>Download the illustrative brief <Icon name="download"/></button><button className="kn-text-button" onClick={()=>inspect('action')}>Inspect the story evidence <Icon name="source"/></button></div></div>;
}
function EvidenceDialog({item,onClose,dialogRef}){
  return <dialog className="kn-dialog" ref={dialogRef} aria-labelledby="kn-evidence-title" onClose={onClose} onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close()}}}>
    <div className="kn-dialog-top"><span>Story evidence</span><button aria-label="Close evidence" onClick={()=>dialogRef.current.close()}><Icon name="close"/></button></div>
    {item&&<><h2 id="kn-evidence-title">{item.title}</h2><p>{item.text}</p><div className="kn-implication"><h3>What it means in this example</h3><p>{item.implication}</p></div><div className="kn-source-record"><strong>Ostrel growth explainer</strong><span>Video · {item.time}</span><small>MnM_Growth_Explainer_Ostrel.mp4 · supplied reference</small></div><p className="kn-dialog-disclosure">Fictional companies and events, used for illustration. This is scenario evidence from the film, not independently verified market research.</p></>}
  </dialog>;
}
export function Keynote({session={}}){
  const [step,setStep]=useState(()=>Math.max(0,Math.min(8,session.keynoteStep||0)));
  const [paused,setPaused]=useState(session.keynotePaused||false),[simple,setSimple]=useState(session.keynoteSimple||false),[notes,setNotes]=useState(false),[blank,setBlank]=useState(false),[full,setFull]=useState(false);
  const [selected,setSelected]=useState(0),[lens,setLens]=useState('markets'),[answer,setAnswer]=useState(false),[source,setSource]=useState(null),[status,setStatus]=useState('');
  const reduced=useReducedMotion(),still=paused||reduced;
  const root=useRef(),heading=useRef(),dialog=useRef(),opener=useRef(),notesButton=useRef();
  const scene=scenes[step];
  const go=useCallback(n=>{setStep(Math.max(0,Math.min(scenes.length-1,n)));setStatus('');setBlank(false)},[]);
  const restart=()=>{setAnswer(false);setSelected(0);setLens('markets');setNotes(false);go(0)};
  const inspect=id=>{opener.current=document.activeElement;setSource(id)};
  const closeEvidence=()=>{setSource(null);opener.current?.isConnected&&opener.current.focus()};
  useEffect(()=>{if(source&&!dialog.current.open)dialog.current.showModal()},[source]);
  useEffect(()=>{session.keynoteStep=step;session.keynotePaused=paused;session.keynoteSimple=simple},[step,paused,simple,session]);
  useEffect(()=>{heading.current?.focus({preventScroll:true});root.current?.querySelector('.kn-stage')?.scrollTo({top:0});window.scrollTo({top:0,behavior:'instant'})},[step]);
  useEffect(()=>{const original=document.title;document.title='GrowthIQ · The next growth story';return()=>{document.title=original}},[]);
  useEffect(()=>{const change=()=>setFull(Boolean(document.fullscreenElement));document.addEventListener('fullscreenchange',change);return()=>document.removeEventListener('fullscreenchange',change)},[]);
  useEffect(()=>{
    const handler=e=>{
      if(e.altKey||e.metaKey||e.ctrlKey||e.shiftKey||e.target.closest('input,textarea,select,[contenteditable="true"]')||dialog.current?.open)return;
      if(e.key==='Escape'){setBlank(false);setNotes(false);return}
      if(blank){if(['b','B',' ','ArrowRight','PageDown'].includes(e.key)){e.preventDefault();setBlank(false)}return}
      if(['ArrowRight','PageDown'].includes(e.key)||(e.key===' '&&!e.target.closest('button,a,summary'))){e.preventDefault();go(step+1)}
      else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(step-1)}
      else if(e.key==='Home'){e.preventDefault();go(0)}
      else if(e.key==='End'){e.preventDefault();go(8)}
      else if(/^[1-9]$/.test(e.key)){go(Number(e.key)-1)}
      else if(e.key.toLowerCase()==='n')setNotes(v=>!v);
      else if(e.key.toLowerCase()==='m')setPaused(v=>!v);
      else if(e.key.toLowerCase()==='b')setBlank(true);
    };document.addEventListener('keydown',handler);return()=>document.removeEventListener('keydown',handler);
  },[step,go,blank]);
  const fullscreen=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(root.current.requestFullscreen)await root.current.requestFullscreen();else throw Error()}catch{setStatus('Fullscreen is unavailable in this browser. You can continue in this window.')}};
  const download=()=>{const url=URL.createObjectURL(new Blob([brief],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='Ostrel-illustrative-growth-brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);setStatus('Illustrative brief download requested. No research was generated.')};
  return <div className="kn-app" data-step={step} data-still={still} ref={root}>
    <div className="kn-presentation" inert={blank?true:undefined}>
      <header className="kn-header"><a className="kn-brand" href="#home">Growth<span>IQ</span></a><span className="kn-edition">The next growth story</span><div className="kn-presenter-controls"><button onClick={()=>setPaused(v=>!v)} aria-pressed={paused} aria-label={paused?'Resume motion':'Pause motion'} title={reduced?'System reduced motion is active':'Pause or resume motion (M)'}><Icon name={paused?'play':'pause'}/><span>{paused?'Resume':'Motion'}</span></button><button ref={notesButton} onClick={()=>setNotes(v=>!v)} aria-expanded={notes} aria-controls="kn-notes" aria-label="Rehearsal notes" title="On-screen rehearsal notes (N)"><Icon name="notes"/><span>Notes</span></button><button onClick={fullscreen} title="Toggle fullscreen" aria-label={full?'Exit fullscreen':'Enter fullscreen'}><Icon name="expand"/></button><a href="#demo" className="kn-product-link">Product tour <Icon name="source"/></a></div></header>
      <main className={'kn-stage kn-stage-'+step}>
        <div className="kn-narrative" key={'title-'+step}><h2 ref={heading} tabIndex={-1}>{scene.title[0]}<br/><em>{scene.title[1]}</em></h2><p>{scene.body}</p>{scene.evidence&&step<7&&<button className="kn-text-button" onClick={()=>inspect(scene.evidence)}>Inspect the story evidence <Icon name="source"/></button>}{step===1&&<div className="kn-familiar"><span>Our market</span><span>Our customers</span><span>Our usual rivals</span></div>}{step===2&&selected>0&&<div className="kn-market-focus"><span>In focus</span><strong>{marketNames[selected]}</strong><small>{selected===2?'Follow the battery-pack story in the next scene.':'One of the adjacent markets in the illustrated world.'}</small></div>}</div>
        {step<=3&&<Network step={step} still={still} selected={selected} onSelect={setSelected} simple={simple}/>}
        {step===4&&<Customer/>}
        {step===5&&<Competition inspect={inspect}/>}
        {step===6&&<Lenses lens={lens} setLens={setLens} inspect={inspect}/>}
        {step===7&&<Research answer={answer} setAnswer={setAnswer} inspect={inspect}/>}
        {step===8&&<Action download={download} inspect={inspect}/>}
      </main>
      <footer className="kn-footer"><div className="kn-footnote"><span>Ostrel Coatings</span><small>Illustrative story · fictional companies</small></div><nav className="kn-progress" aria-label="Story chapters">{scenes.map((s,i)=><button key={s.name} aria-label={`${i+1}. ${s.name}`} aria-current={step===i?'step':undefined} onClick={()=>go(i)} title={s.name}><span className={i<=step?'is-complete':''}/></button>)}<span>{String(step+1).padStart(2,'0')} / 09</span></nav><div className="kn-navigation"><button className="kn-prev" onClick={()=>go(step-1)} disabled={step===0} aria-label="Previous scene"><Icon name="back"/></button><button className="kn-next" onClick={()=>step===8?restart():go(step+1)}>{scene.next}<Icon name="arrow"/></button></div></footer>
      {notes&&<aside id="kn-notes" className="kn-notes"><div><strong>Rehearsal notes · visible on screen</strong><button aria-label="Close notes" onClick={()=>{setNotes(false);notesButton.current?.focus()}}><Icon name="close"/></button></div><p>{scene.note}</p><dl><dt>Next / previous</dt><dd>→ / ← · Page Down / Up</dd><dt>Jump to scene</dt><dd>1–9 · Home / End</dd><dt>Motion / blank stage</dt><dd>M / B</dd><dt>Close notes</dt><dd>N or Escape</dd></dl><div className="kn-notes-actions"><button onClick={restart}>Restart story</button><button onClick={()=>{setNotes(false);setBlank(true)}}>Blank the stage</button><button aria-pressed={simple} onClick={()=>setSimple(v=>!v)}>{simple?'Use 3D graphics':'Use simple graphics'}</button></div></aside>}
    </div>
    {blank&&<div className="kn-blank"><button autoFocus onClick={()=>setBlank(false)}>Resume presentation <Icon name="play"/></button></div>}
    <EvidenceDialog item={source?evidence[source]:null} onClose={closeEvidence} dialogRef={dialog}/>
    <div className="kn-status" role="status">{status}</div>
  </div>;
}
class KeynoteBoundary extends React.Component{constructor(p){super(p);this.state={failed:false}}static getDerivedStateFromError(){return{failed:true}}render(){return this.state.failed?<div className="kn-error"><h2>The presentation could not open.</h2><p>Reload the page to try again, or continue with the product tour.</p><a href="#demo">Open GrowthIQ Live</a></div>:this.props.children}}
export function mount(element,props){const root=createRoot(element);root.render(<KeynoteBoundary><Keynote {...props}/></KeynoteBoundary>);return()=>root.unmount()}
