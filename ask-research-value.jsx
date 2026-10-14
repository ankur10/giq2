import React,{useState,useEffect,useRef} from 'react';

// A concept: how much proprietary MnM research an answer draws on, priced at catalogue list price.
// The reports and prices below are illustrative, not the catalogue.
export const research=[
 {title:'Electronics Manufacturing Services (EMS) Market – Global Forecast to 2030',area:'Contract manufacturing',tables:7,price:7150},
 {title:'AI Data Center Market – Global Forecast to 2031',area:'AI infrastructure',tables:6,price:7150},
 {title:'Data Center Networking Market – Global Forecast to 2030',area:'Cloud and networking',tables:4,price:4950},
 {title:'Warehouse Robotics Market – Global Forecast to 2030',area:'Connected Living',tables:4,price:4950},
 {title:'Smart Home Market – Global Forecast to 2030',area:'Connected Living',tables:3,price:4950},
 {title:'Retail Automation Market – Global Forecast to 2030',area:'Digital Commerce',tables:3,price:4950},
 {title:'Medical Device Contract Manufacturing Market – Global Forecast to 2030',area:'Healthcare',tables:3,price:4950},
 {title:'Semiconductor Capital Equipment Market – Global Forecast to 2030',area:'Capital equipment',tables:4,price:5650},
 {title:'Electric Vehicle Power Electronics Market – Global Forecast to 2031',area:'Mobility',tables:2,price:4950},
 {title:'Printed Circuit Board Market – Global Forecast to 2030',area:'Components',tables:3,price:4950},
 {title:'Supply Chain Management Software Market – Global Forecast to 2030',area:'Digital Commerce',tables:2,price:4950},
 {title:'Industrial IoT Market – Global Forecast to 2031',area:'Industrial',tables:3,price:5650},
];
export const total=research.reduce((sum,r)=>sum+r.price,0);
const tables=research.reduce((sum,r)=>sum+r.tables,0);
const money=n=>'$'+Math.round(n).toLocaleString('en-US');
const still=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

// Counts from zero to `to` once, the first time `box` comes into view.
function useCountUp(box,to,ms=1800){
 const [value,setValue]=useState(()=>still()?to:0);
 useEffect(()=>{
  if(still())return;
  let frame;
  const observer=new IntersectionObserver(entries=>{
   if(!entries.some(e=>e.isIntersecting))return;
   observer.disconnect();
   const start=performance.now();
   const step=now=>{const t=Math.min(1,(now-start)/ms);setValue(to*(1-Math.pow(2,-10*t)));if(t<1)frame=requestAnimationFrame(step);else setValue(to)};
   frame=requestAnimationFrame(step);
  },{threshold:.4});
  observer.observe(box.current);
  return()=>{observer.disconnect();cancelAnimationFrame(frame)};
 },[to]);
 return value;
}

// A quiet line under the answer, linking to the reports on the Sources tab.
export function ResearchLine({onOpen}){
 const box=useRef(),value=useCountUp(box,total,1200);
 return <button ref={box} className="ar-value-line" onClick={onOpen}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5"/></svg><span>Draws on <strong>{money(value)}</strong> of MnM proprietary research</span><span className="ar-value-go" aria-hidden="true">→</span></button>
}

// The reports behind the answer, as one more group of sources, with the amount in its heading.
export function ResearchValue(){
 const box=useRef(),value=useCountUp(box,total,1200);
 return <section ref={box} className="ar-source-group ar-value">
  <h2>MnM proprietary research <span className="ar-count">{research.length}</span></h2>
  <div className="ar-value-summary"><p><strong className="ar-value-number">{money(value)}</strong><span>of proprietary research by MnM behind this answer</span></p><dl><div><dt>Reports</dt><dd>{research.length}</dd></div><div><dt>Tables cited</dt><dd>{tables}</dd></div></dl></div>
  {research.map(r=><div className="ar-source-row ar-value-row" key={r.title}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5"/></svg><span><strong>{r.title}</strong><small>{r.area} · {r.tables} tables used</small></span><span className="ar-value-price">{money(r.price)}</span></div>)}
  <p className="ar-small">Concept: report titles and list prices are illustrative.</p>
 </section>
}
