import React,{Suspense,lazy,useCallback,useEffect,useRef,useState} from 'react';
import{createRoot}from'react-dom/client';
const Film=lazy(()=>import('./keynote-film.jsx'));
const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>1-Math.pow(1-clamp(v),4);
const mix=(a,b,t)=>a+(b-a)*t;
const implication='Sika’s acquisition intensifies competition for H.B. Fuller in Turkey.';
const question='How should H.B. Fuller respond to Sika’s acquisition of Akkim?';
const stops=[0,7.8,13.5,22];
const captions=['Every growth story starts with a signal.','A competitor moves. You see what matters.','The headline becomes a business implication.','A sharper question. With the context already there.'];
function Icon({name}){return <svg viewBox="0 0 24 24" aria-hidden="true">{name==='play'?<path d="m9 5 11 7-11 7Z"/>:name==='pause'?<path d="M8 5v14M16 5v14"/>:name==='next'?<path d="m9 6 6 6-6 6"/>:name==='previous'?<path d="m15 6-6 6 6 6"/>:name==='full'?<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>:<path d="M5 12h14m-6-6 6 6-6 6"/>}</svg>}
class Boundary extends React.Component{constructor(p){super(p);this.state={failed:false}}static getDerivedStateFromError(){return{failed:true}}render(){return this.state.failed?this.props.fallback:this.props.children}}
function Keynote({signal,onContinue}){
 const[playing,setPlaying]=useState(true),[loaded,setLoaded]=useState(false),[seek,setSeek]=useState(0),[full,setFull]=useState(false),[shot,setShot]=useState(0),[error,setError]=useState('');
 const[reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const clock=useRef({time:0,playing:!reduced});const root=useRef(),signalCard=useRef(),relevance=useRef(),composer=useRef(),progress=useRef(),time=useRef(),currentShot=useRef(0),caption=useRef(),action=useRef();
 const tick=useCallback((t,anchor,size)=>{
   if(!root.current)return;
   const W=size.width,H=size.height,unit=Math.min(W/1440,H/720);
   const phase=t<4?0:t<10?1:t<16?2:3;
   if(phase!==currentShot.current){currentShot.current=phase;setShot(phase)}
   root.current.dataset.shot=String(phase);
   if(progress.current)progress.current.value=String(t);
   if(time.current)time.current.textContent=String(Math.floor(t)).padStart(2,'0')+' / 22';
   const lift=ease((t-3.6)/2.3),retreat=ease((t-9.5)/2.3),exit=ease((t-15)/1.2);
   const scale=mix(.39,unit,lift)*(1-.44*retreat);
   const x=mix(anchor.x,W*.5,lift)-W*.34*retreat;
   const y=mix(anchor.y,H*.46,lift)-H*.12*retreat;
   Object.assign(signalCard.current.style,{opacity:String(t<3.6?0:(1-exit)*(1-.62*retreat)),transform:`translate(-50%,-50%) translate(${x-W/2}px,${y-H/2}px) perspective(1100px) rotateY(${mix(-14,0,lift)-12*retreat}deg) rotateX(${mix(7,0,lift)}deg) scale(${scale})`,filter:`blur(${retreat*1.2}px)`});
   const reveal=ease((t-10)/2),leave=ease((t-15)/1.3);
   Object.assign(relevance.current.style,{opacity:String(reveal*(1-leave)),transform:`translate(-50%,-50%) translate(${mix(W*.22,0,reveal)-W*.22*leave}px,${mix(80,0,reveal)}px) perspective(1400px) rotateY(${mix(-18,0,reveal)+16*leave}deg) scale(${unit*mix(.82,1,reveal)})`,filter:`blur(${(1-reveal)*4+leave*4}px)`});
   const arrive=ease((t-19)/2.2);
   Object.assign(composer.current.style,{opacity:String(arrive),transform:`translate(-50%,-50%) translate(${mix(W*.18,0,arrive)}px,${mix(35,0,arrive)}px) perspective(1400px) rotateY(${mix(-16,0,arrive)}deg) scale(${unit*mix(.88,1,arrive)})`});
   action.current.style.opacity=t>=22?'1':'0';action.current.style.pointerEvents=t>=22?'auto':'none';action.current.inert=t<22;
   caption.current.style.opacity=String(Math.min(1,Math.abs(t-[0,4,10,16][phase])*2));
   if(t>=22&&clock.current.playing){clock.current.playing=false;setPlaying(false)}
 },[]);
 const ready=useCallback(()=>setLoaded(true),[]);
 const jump=useCallback(t=>{clock.current.time=Math.max(0,Math.min(22,t));clock.current.playing=false;setPlaying(false);setSeek(v=>v+1)},[]);
 const play=useCallback(()=>{if(reduced){jump(stops[Math.min(3,currentShot.current+1)]);return}if(clock.current.time>=22)clock.current.time=0;clock.current.playing=!clock.current.playing;setPlaying(clock.current.playing);setSeek(v=>v+1)},[reduced,jump]);
 useEffect(()=>{clock.current.playing=playing&&!reduced},[playing,reduced]);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const change=()=>{setReduced(mq.matches);if(mq.matches){clock.current.playing=false;setPlaying(false);jump(stops[currentShot.current])}};mq.addEventListener('change',change);const fs=()=>setFull(Boolean(document.fullscreenElement));document.addEventListener('fullscreenchange',fs);return()=>{mq.removeEventListener('change',change);document.removeEventListener('fullscreenchange',fs)}},[jump]);
 useEffect(()=>{if(reduced){clock.current.time=3;clock.current.playing=false;setPlaying(false);setSeek(v=>v+1)}},[]);
 useEffect(()=>{const key=e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,select,[contenteditable="true"]'))return;if(e.key===' '&&!e.target.closest('button,a')){e.preventDefault();play()}if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();jump(stops[Math.min(3,currentShot.current+1)])}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();jump(stops[Math.max(0,currentShot.current-1)])}if(e.key.toLowerCase()==='r'||e.key==='Home'){e.preventDefault();jump(reduced?3:0)}if(e.key==='End'){e.preventDefault();jump(22)}};document.addEventListener('keydown',key);return()=>document.removeEventListener('keydown',key)},[play,jump,reduced]);
 const fullscreen=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{setError('Fullscreen is unavailable in this window.')}};
 const fallback=<div className="kf-fallback"><img src="assets/keynote/briefing.jpg" alt="GrowthIQ briefing with the captured Sika acquisition signal"/><div><h2>Continue with the product</h2><p>The cinematic renderer is unavailable in this browser.</p><button onClick={()=>onContinue(question)}>Open the contextual question <Icon/></button></div></div>;
 return <section ref={root} className="kf-film" aria-label="GrowthIQ cinematic product sequence" data-shot="0">
   <div className="kf-canvas"><Boundary fallback={fallback}><Suspense fallback={<div className="kf-loading">Preparing the product film…</div>}><Film clock={clock} playing={playing} seek={seek} tick={tick} ready={ready}/></Suspense></Boundary></div>
   <header className="kf-header"><a href="#home" className="kf-brand">Growth<span>IQ</span></a><span>From a signal to a decision</span><a href="#home" className="kf-exit">Exit film</a></header>
   <div className="kf-material" aria-hidden="true">
     <article ref={signalCard} className="kf-signal"><div className="kf-meta"><span>Competitor</span><span>Captured signal</span><span className="kf-mark">Sika</span></div><h2>{signal.title}</h2><p>{signal.summary}</p><div className="kf-card-foot">Your Briefing<Icon/></div></article>
     <article ref={relevance} className="kf-relevance"><div className="kf-reader-brand">GrowthIQ <span>Your Briefing</span></div><h2>What this means for H.B. Fuller</h2><p>{implication}</p><div className="kf-reading-rule"/><div className="kf-reader-foot"><span>From the captured signal</span><span>Ask GrowthIQ <Icon/></span></div></article>
     <article ref={composer} className="kf-composer"><div className="kf-context-link"><Icon/><span>Sika’s acquisition of Akkim</span><span>Context carried forward</span></div><div className="kf-question"><h2>{question}</h2><div className="kf-composer-tools"><span>Fast</span><span>Attach</span><span>Voice</span><strong>Start research <Icon/></strong></div></div><p>Ask GrowthIQ</p></article>
   </div>
   <div className="kf-caption"><p ref={caption}>{captions[shot]}</p><button ref={action} inert className="kf-enter" onClick={()=>onContinue(question)}>Continue in the product <Icon/></button></div>
   <footer className="kf-controls"><div className="kf-playback"><button onClick={play} disabled={!loaded} aria-label={reduced?'Next shot':playing?'Pause film':'Play film'}><Icon name={playing&&!reduced?'pause':'play'}/></button><button onClick={()=>jump(stops[Math.max(0,shot-1)])} aria-label="Previous shot"><Icon name="previous"/></button><button onClick={()=>jump(stops[Math.min(3,shot+1)])} aria-label="Next shot"><Icon name="next"/></button><span ref={time} className="kf-time">00 / 22</span></div><input ref={progress} type="range" min="0" max="22" step="0.05" defaultValue="0" onChange={e=>jump(Number(e.target.value))} aria-label="Film playhead in seconds"/><span className="kf-provenance">Captured product · prepared question</span><button className="kf-full" onClick={fullscreen} aria-label={full?'Exit fullscreen':'Fullscreen'}><Icon name="full"/></button></footer>
   <div className="sr-only" aria-live="polite">{captions[shot]} {shot===1?signal.title:shot===2?implication:shot===3?question:''}</div>
   {error&&<p className="kf-error" role="status">{error}</p>}
 </section>
}
export function mount(element,props){const root=createRoot(element);root.render(<Keynote {...props}/>);return()=>root.unmount()}
