import React,{useEffect,useRef,useState} from 'react';
import{createRoot}from'react-dom/client';

const beats=[
 {name:'The signal',cue:'A competitor moves. What changes for us?',next:'Show why it matters',note:'“Sika has acquired Akkim. This is in my briefing because it could change the competitive picture for H.B. Fuller.”'},
 {name:'The significance',cue:'From a headline to a business implication.',next:'Frame the question',note:'“GrowthIQ connects the event to my business. Regional competition, innovation, partnerships—now I know what to investigate.”'},
 {name:'The question',cue:'The next question already has context.',next:'Continue in Ask GrowthIQ',note:'“The signal becomes a focused research question. I can refine it before continuing.” This proof ends at the question; no research answer is generated.'}
];
function Arrow({back=false}){return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={back?'M19 12H5m6-6-6 6 6 6':'M5 12h14m-6-6 6 6-6 6'}/></svg>}
function Controls({session,onStep,onContinue}){
 const[step,setStep]=useState(session.step??0),[paused,setPaused]=useState(session.paused??false),[notes,setNotes]=useState(false),[full,setFull]=useState(false),[message,setMessage]=useState('');
 const controls=useRef(null);
 const motion=useRef(null),first=useRef(true),previous=useRef(step),cue=useRef(null);
 const[reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const still=paused||reduced;
 const go=n=>setStep(Math.max(0,Math.min(2,n)));
 useEffect(()=>{session.step=step;session.paused=paused},[step,paused]);
 useEffect(()=>{
   const shell=document.querySelector('[data-route="keynote"]'),topbar=shell.querySelector('.topbar'),workspace=shell.querySelector('.workspace');
   const measure=()=>{shell.style.setProperty('--kp-controls-height',controls.current.getBoundingClientRect().height+'px');shell.style.setProperty('--kp-header-height',topbar.getBoundingClientRect().height+'px');shell.style.setProperty('--kp-left',workspace.getBoundingClientRect().left+'px')};
   measure();const observer=new ResizeObserver(measure);observer.observe(controls.current);observer.observe(topbar);observer.observe(workspace);return()=>observer.disconnect();
 },[]);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>setReduced(mq.matches);mq.addEventListener('change',update);const fs=()=>setFull(Boolean(document.fullscreenElement));document.addEventListener('fullscreenchange',fs);return()=>{mq.removeEventListener('change',update);document.removeEventListener('fullscreenchange',fs)}},[]);
 useEffect(()=>{const shell=document.querySelector('[data-route="keynote"]');if(shell)shell.dataset.keynoteStill=String(still);if(still)motion.current?.finish()},[still]);
 useEffect(()=>{
   motion.current?.cancel();
   const reader=document.querySelector('.signal-reader');const before=reader?.getBoundingClientRect();
   const target=onStep(step);
   const main=document.getElementById('main');
   main.scrollTop=0;
   if(step>0&&target){const box=target.getBoundingClientRect(),area=main.getBoundingClientRect();main.scrollTop=Math.max(0,box.top-area.top-Math.max(24,(area.height-box.height)/2))}
   const nextReader=document.querySelector('.signal-reader');
   const after=nextReader?.getBoundingClientRect();
   if(!first.current&&!still&&before&&after&&previous.current<2&&step<2){
     motion.current=nextReader.animate([{transform:`translate(${before.x-after.x}px,${before.y-after.y}px) scale(${before.width/after.width},${before.height/after.height})`},{transform:'none'}],{duration:620,easing:'cubic-bezier(.16,1,.3,1)'});
   }else if(!first.current&&!still&&step===2){
     motion.current=document.querySelector('.ask-workspace')?.animate([{opacity:.55,transform:'translateY(18px)'},{opacity:1,transform:'none'}],{duration:480,easing:'cubic-bezier(.16,1,.3,1)'});
   }
   window.scrollTo({top:0,behavior:'instant'});
   if(!first.current)cue.current?.focus({preventScroll:true});
   first.current=false;previous.current=step;
 },[step]);
 useEffect(()=>{
   const keyboard=e=>{
     if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.target.closest('input,textarea,select,[contenteditable="true"]')||document.querySelector('dialog[open]'))return;
     if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();go(step+1)}
     if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(step-1)}
     if(e.key===' '&&!e.target.closest('button,a,summary')){e.preventDefault();go(step+1)}
     if(e.key.toLowerCase()==='n')setNotes(v=>!v);
     if(e.key.toLowerCase()==='m')setPaused(v=>!v);
     if(e.key==='Escape')setNotes(false);
   };
   const action=e=>{if(e.target.closest('[data-research-signal]')){e.preventDefault();e.stopPropagation();go(2)}};
   document.addEventListener('keydown',keyboard);document.getElementById('keynote-product')?.addEventListener('click',action,true);
   return()=>{document.removeEventListener('keydown',keyboard);document.getElementById('keynote-product')?.removeEventListener('click',action,true)};
 },[step]);
 useEffect(()=>()=>{motion.current?.cancel()},[]);
 const fullscreen=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{setMessage('Fullscreen is unavailable in this window. You can continue presenting here.')}};
 return <div className="kp-presenter" ref={controls}>
   {notes&&<aside className="kp-notes" aria-label="On-screen rehearsal notes"><strong>Rehearsal notes · visible on screen</strong><p>{beats[step].note}</p><p>← / → advance · N notes · M motion. Your pace; no timed playback.</p><button className="btn" onClick={()=>setNotes(false)}>Close notes</button></aside>}
   <div className="kp-transport">
     <div className="kp-cue"><p ref={cue} tabIndex={-1} aria-live="polite">{beats[step].cue}</p><nav aria-label="Keynote sequence">{beats.map((beat,i)=><button key={beat.name} onClick={()=>go(i)} aria-current={step===i?'step':undefined}><span>{i+1}</span>{beat.name}</button>)}</nav></div>
     <div className="kp-actions"><button className="btn kp-back" aria-label="Previous beat" disabled={step===0} onClick={()=>go(step-1)}><Arrow back/></button><button className="btn primary kp-next" onClick={()=>step===2?onContinue():go(step+1)}>{beats[step].next}<Arrow/></button></div>
   </div>
   <div className="kp-utility"><span>Product keynote · short proof</span><div><button onClick={()=>setNotes(v=>!v)} aria-expanded={notes}>Notes</button><button onClick={()=>setPaused(v=>!v)} aria-pressed={paused}>{paused?'Resume motion':'Pause motion'}</button><button onClick={fullscreen}>{full?'Exit fullscreen':'Fullscreen'}</button><a href="#home">Exit keynote</a></div></div>
   {message&&<p role="status" className="kp-message">{message}</p>}
 </div>
}
export function mount(element,props){const root=createRoot(element);root.render(<Controls {...props}/>);return()=>root.unmount()}
