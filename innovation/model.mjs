export const KEY='growthiq-innovation-os-v1';
export const evidence=[
 {id:'market',title:'Electric vehicle market context',type:'Captured export',date:'Baseline · saved export',summary:'Market context and taxonomy from the saved EV export. This is not evidence of the example company’s revenue or customer relationships.',relationship:'Context for the thesis; does not validate obtainable share.',reference:'data/data1.json → responses.connected_graph.response.data.core'},
 {id:'expansion',title:'A customer plans additional battery capacity',type:'Illustrative source',date:'New evidence',summary:'Example Customer A has announced a capacity expansion. The scenario team estimates this could increase eligible annual materials demand from 10,000 to 14,000 tonnes. No purchasing commitment has been made.',relationship:'Supports reviewing eligible annual volume; not a confirmed order.',reference:'Scenario fixture → sample customer expansion announcement'},
 {id:'interview',title:'Customer interest is not a purchase commitment',type:'Illustrative customer evidence',date:'Baseline',summary:'A sample customer interview indicates interest in the application. Pricing, purchasing volume, and willingness to switch suppliers remain unverified.',relationship:'Limits demand certainty and the assumed 5% obtainable share.',reference:'Scenario fixture → sample customer interview'},
 {id:'technical',title:'Qualification remains an open gate',type:'Illustrative technical evidence',date:'Baseline',summary:'The example application requires technical qualification. The team has not yet established whether performance and production requirements can be met.',relationship:'Technical feasibility could delay or prevent adoption.',reference:'Scenario fixture → sample technical assessment'},
 {id:'interpretation',title:'More capacity could expand eligible volume',type:'Sample AI interpretation',date:'New evidence',summary:'The expansion may justify a larger scenario, but capacity does not establish procurement demand. Review 14,000 tonnes as a working assumption and validate it with customers.',relationship:'Interpretation of the expansion record; proposes a volume revision only.',reference:'Prepared analysis → expansion'}
];
export const challenges=[
 {id:'capacity',title:'Capacity is not procurement demand',source:'expansion',question:'How much announced capacity will translate into addressable materials procurement?'},
 {id:'payment',title:'Interest is not willingness to pay',source:'interview',question:'What price and purchasing commitment will customers support?'},
 {id:'qualification',title:'Qualification may prevent adoption',source:'technical',question:'Which technical and production criteria must we meet to qualify?'},
 {id:'share',title:'Obtainable share remains an assumption',source:'assumptions',question:'What evidence supports the assumed share of eligible demand?'}
];
export const gaps=['Customer willingness to pay unresolved','Technical qualification unresolved'];
export const outcomes={fund:'Validation funded',hold:'Held',stop:'Stopped'};
export const money=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(v);
export function seed(){return {version:1,opportunity:{name:'Battery Materials Expansion',thesis:'Explore whether our specialty-material capabilities could support a battery-materials application worth validating with customers.',owner:'Innovation lead',stage:'Validate'},assumptions:{volume:10000,share:5,price:4000},origins:{volume:'Illustrative baseline',share:'Illustrative baseline',price:'Illustrative baseline'},review:{status:'pending',reason:''},plan:{budget:150000,weeks:8,interviews:5,owner:'Innovation lead',tasks:'Conduct customer interviews.\nAssess technical qualification requirements.',questions:[]},decisions:[],revisions:[],activity:[],drafts:{}};}
export function validateAssumptions(a){return a&&['volume','share','price'].every(k=>typeof a[k]==='number'&&Number.isFinite(a[k])&&a[k]>=0)&&a.share<=100&&Number.isFinite(a.volume*a.share/100*a.price);}
export function revenue(a){if(!validateAssumptions(a))throw Error('Enter finite, nonnegative inputs and a share between 0 and 100%.');return a.volume*a.share/100*a.price;}
export function validPlan(p){return !!(p&&['budget','weeks','interviews'].every(k=>typeof p[k]==='number'&&Number.isFinite(p[k])&&p[k]>0)&&Number.isInteger(p.interviews)&&typeof p.owner==='string'&&p.owner.trim()&&typeof p.tasks==='string'&&p.tasks.trim()&&Array.isArray(p.questions)&&p.questions.every(q=>typeof q==='string'));}
export function fingerprint(s){return JSON.stringify({opportunity:s.opportunity,assumptions:s.assumptions,plan:s.plan,review:s.review});}
export function latest(s){return s.decisions.at(-1);}
export function changed(s){return !!latest(s)&&latest(s).fingerprint!==fingerprint(s);}
export function nextAction(s){const d=latest(s);if(changed(s))return {title:'Review changes since the decision',section:'decision'};if(d)return {title:d.outcome==='fund'?'Continue validation plan':d.outcome==='hold'?'Review the hold condition':'Revisit the decision record',section:'decision'};return s.review.status==='pending'?{title:'Review new evidence',section:'evidence'}:{title:'Prepare validation decision',section:'decision'};}
function log(s,text,now){s.activity.unshift({text,at:now});}
export function transition(state,action,now=new Date().toISOString()){
 const s=structuredClone(state);
 if(action.type==='draft'){s.drafts[action.key]=action.value;return s;}
 if(action.type==='overview'){
  if(!action.value.owner.trim()||!action.value.thesis.trim())throw Error('Enter an owner and a thesis.');
  s.opportunity={...s.opportunity,...action.value};delete s.drafts.overview;log(s,'Updated opportunity thesis and owner',now);
 }
 if(action.type==='assumptions'){
  revenue(action.value);s.revisions.unshift({at:now,kind:'User revision',before:s.assumptions,after:action.value});
  for(const k of Object.keys(s.assumptions))if(s.assumptions[k]!==action.value[k])s.origins[k]='User assumption';
  s.assumptions=action.value;delete s.drafts.assumptions;log(s,'Revised revenue scenario assumptions',now);
 }
 if(action.type==='review'){
  if(action.expected!==JSON.stringify(s.assumptions))throw Error('Inputs changed during review. Review the refreshed comparison before confirming.');
  if(s.review.status!=='pending')throw Error('This evidence update has already been reviewed.');
  if(!['accepted','rejected'].includes(action.status))throw Error('Choose an update outcome.');
  if(action.status==='rejected'&&!action.reason?.trim())throw Error('Explain why you are rejecting the proposed update.');
  const before=structuredClone(s.assumptions);
  if(action.status==='accepted'){revenue({...s.assumptions,volume:14000});s.assumptions.volume=14000;s.origins.volume='Evidence-linked user assumption · expansion';delete s.drafts.assumptions;}
  s.review={status:action.status,reason:action.reason||'',at:now};
  s.revisions.unshift({at:now,kind:'Evidence update '+action.status,source:'expansion',before,after:structuredClone(s.assumptions),reason:action.reason||''});
  log(s,'Expansion update '+action.status,now);delete s.drafts.review;
 }
 if(action.type==='plan'){
  if(!validPlan(action.value))throw Error('Enter a positive budget and duration, a positive whole interview count, an owner, and validation tasks.');
  const value={...action.value,questions:[...new Set([...s.plan.questions,...action.value.questions])]};
  s.revisions.unshift({at:now,kind:'Validation plan revision',before:s.plan,after:value});s.plan=value;delete s.drafts.plan;log(s,'Updated validation plan',now);
 }
 if(action.type==='question'){
  const q=challenges.find(c=>c.id===action.id);if(!q)throw Error('Unknown validation question.');
  if(!s.plan.questions.includes(q.question)){const before=structuredClone(s.plan);s.plan.questions.push(q.question);s.revisions.unshift({at:now,kind:'Validation question added',before,after:structuredClone(s.plan)});log(s,'Added validation question: '+q.question,now);}
 }
 if(action.type==='decision'){
  if(s.drafts.plan||s.drafts.assumptions||s.drafts.overview)throw Error('Save or discard working edits before recording the decision.');
  if(!outcomes[action.outcome])throw Error('Choose a decision outcome.');
  if(!action.rationale?.trim())throw Error('A decision requires a rationale.');
  if(action.outcome==='fund'&&(!validPlan(s.plan)||!action.ack))throw Error('Save a valid plan and acknowledge the unresolved evidence gaps.');
  if(action.outcome==='hold'&&!action.condition?.trim())throw Error('Enter the condition for reconsidering this opportunity.');
  const snapshot={opportunity:s.opportunity,assumptions:s.assumptions,origins:s.origins,plan:s.plan,review:s.review,evidence:structuredClone(evidence),gaps:[...gaps],revenue:revenue(s.assumptions)};
  s.decisions.push({id:'decision-'+(s.decisions.length+1),at:now,outcome:action.outcome,rationale:action.rationale,condition:action.condition||'',ack:!!action.ack,snapshot:structuredClone(snapshot),fingerprint:fingerprint(s)});
  delete s.drafts.decision;log(s,'Recorded decision: '+outcomes[action.outcome],now);
 }
 return s;
}
const isObject=v=>!!v&&typeof v==='object'&&!Array.isArray(v);
const isDate=v=>typeof v==='string'&&Number.isFinite(Date.parse(v));
const strings=(v,keys)=>isObject(v)&&keys.every(k=>typeof v[k]==='string');
function validDrafts(drafts){
 if(!isObject(drafts))return false;
 const shapes={overview:{thesis:'string',owner:'string'},assumptions:{volume:'input',share:'input',price:'input'},plan:{budget:'input',weeks:'input',interviews:'input',owner:'string',tasks:'string',questions:'array'},decision:{outcome:'string',rationale:'string',condition:'string',ack:'boolean'}};
 return Object.entries(drafts).every(([key,v])=>{
  if(!['overview','assumptions','plan','decision','review','expert'].includes(key))return false;
  if(v===null)return true;
  if(key==='review'||key==='expert')return typeof v==='string';
  return isObject(v)&&Object.entries(shapes[key]).every(([k,t])=>t==='input'?['string','number'].includes(typeof v[k]):t==='array'?Array.isArray(v[k])&&v[k].every(q=>typeof q==='string'):typeof v[k]===t);
 });
}
export function restore(raw){
 try{
  const s=JSON.parse(raw);
  if(s.version!==1||!validateAssumptions(s.assumptions)||!validPlan(s.plan)||!strings(s.opportunity,['name','thesis','owner','stage'])||!Array.isArray(s.decisions)||!Array.isArray(s.revisions)||!Array.isArray(s.activity)||!strings(s.review,['status','reason'])||!['pending','accepted','rejected'].includes(s.review?.status)||!strings(s.origins,['volume','share','price'])||!validDrafts(s.drafts))return null;
  if(!s.activity.every(a=>typeof a.text==='string'&&isDate(a.at))||!s.revisions.every(r=>typeof r.kind==='string'&&isDate(r.at)&&isObject(r.before)&&isObject(r.after)&&(r.reason===undefined||typeof r.reason==='string')&&(!r.source||evidence.some(e=>e.id===r.source))))return null;
  for(const d of s.decisions){const x=d.snapshot;if(!outcomes[d.outcome]||!strings(d,['id','rationale','condition','fingerprint'])||!isDate(d.at)||!x||!validateAssumptions(x.assumptions)||x.revenue!==revenue(x.assumptions)||!strings(x.opportunity,['name','thesis','owner'])||!strings(x.origins,['volume','share','price'])||!strings(x.review,['status','reason'])||!Array.isArray(x.evidence)||!x.evidence.every(e=>strings(e,['title','type','date','summary','reference']))||!Array.isArray(x.gaps)||!x.gaps.every(g=>typeof g==='string')||!validPlan(x.plan))return null;}
  return s;
 }catch{return null;}
}
export function memo(d){const x=d.snapshot;return [`# ${x.opportunity.name}`,`Illustrative prototype decision · ${d.at}`,`Owner: ${x.opportunity.owner}`,`## ${outcomes[d.outcome]}`,d.rationale,d.condition?`Reconsider when: ${d.condition}`:'','## User thesis',x.opportunity.thesis,'## Annual revenue scenario',`${money(x.revenue)} = ${x.assumptions.volume} tonnes × ${x.assumptions.share}% × ${money(x.assumptions.price)}/tonne`,'Illustrative inputs; excludes costs and does not establish profitability.',...Object.entries(x.origins).map(([k,v])=>`- ${k}: ${v}`),`Evidence update review: ${x.review.status}${x.review.reason?' — '+x.review.reason:''}`,'## Validation plan',`${money(x.plan.budget)} · ${x.plan.weeks} weeks · ${x.plan.interviews} interviews · Owner: ${x.plan.owner}`,x.plan.tasks,...x.plan.questions.map(q=>'- '+q),'## Evidence',...x.evidence.map(e=>`- ${e.title} [${e.type}; ${e.date}]\n  ${e.summary}\n  Reference: ${e.reference}`),'## Remaining gaps',...x.gaps.map(g=>'- '+g),'No payment, expert request, or external approval was made.'].join('\n\n');}
