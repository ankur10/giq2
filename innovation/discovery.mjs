// An authored discovery scenario, never a claim of live research or partner access.
import {investigationBasis,qualificationBlocked} from './investigation.mjs';
export const DISCOVERY_KEY='growthiq-opportunity-discovery-v1';
export const alternativeSource={id:'E-05',title:'The next design may be decided one tier upstream',type:'Illustrative engineering interview',date:'New evidence · scenario follow-up',reference:'Scenario E-05 · fictional Aster engineering follow-up',statement:'For the announced expansion, Aster expects to retain its current pack design and approved materials. For its next platform, Aster is asking an unnamed component integrator to evaluate thermal-protection assemblies. Material proposals would be evaluated through that integrator before Aster’s pack-level qualification.',limit:'A single fictional interview. No integrator is identified, no selection window is confirmed, and no invitation, test result, price or order is provided.'};
export const alternativeQuestions=[
 {id:'alternative-access',test:'demand',question:'Who is the integrator? Will it evaluate Meridian’s material, and when?'},
 {id:'alternative-fit',test:'qualification',question:'Which assembly and pack tests must the material pass? Who approves each?'}
];
export const initialDiscovery=()=>({version:1,records:[],draft:null});
export const routeRecord=s=>s.discovery?.records.at(-1);
export const discoveryBasis=s=>JSON.stringify({case:investigationBasis(s),opportunity:s.opportunity,plan:s.plan,experiments:s.experiments,findings:s.learning.findings,previous:s.discovery?.records.length||0});
export function routeImplications(s){return [
 {id:'window',title:'Timing',before:'Expansion might reopen direct supplier selection.',after:'Current materials may stay. Investigate the next platform.',source:'E-05 · current design retained',limit:'The procurement decision is unconfirmed.'},
 {id:'access',title:'Customer access',before:'Reach Aster’s material-selection team.',after:'Find the integrator and confirm its interest in Meridian’s material.',source:'E-05 · integrator evaluates material proposals',limit:'Partner identity, access and terms are unknown.'},
 {id:'fit',title:'Qualification',before:'Demonstrate material performance for the pack.',after:qualificationBlocked(s)?'The qualification blocker still applies. Establish a remedy, then assembly and pack approval.':'Pass the integrator’s assembly tests, then Aster’s pack qualification.',source:'E-05 + current qualification judgment',limit:'Partner access is not a shortcut around qualification.'}
 ];}
export function applyDiscovery(s,a,at){
 if(!a.type.startsWith('discovery-'))return false;
 if(!s.discovery)throw Error('This action belongs to the alternative-route experience.');
 const d=s.discovery;
 if(a.type==='discovery-draft'){
  if(!a.value||!['','pursue','dismiss'].includes(a.value.outcome)||typeof a.value.reason!=='string'||typeof a.value.basis!=='string')throw Error('Choose a route response and write your reasoning.');
  d.draft=structuredClone(a.value);
 }else if(a.type==='discovery-cancel'){d.draft=null;}
 else if(a.type==='discovery-record'){
  if(!['pursue','dismiss'].includes(a.outcome)||typeof a.reason!=='string'||!a.reason.trim())throw Error('Choose whether to pursue or dismiss and explain why.');
  if(a.expected!==discoveryBasis(s))throw Error('The opportunity changed. Review the updated implications before recording your response.');
  if(Object.keys(s.drafts).some(k=>['opportunity','assumptions','plan'].includes(k)||k.startsWith('test-')||k.startsWith('impact-')))throw Error('Save or discard open case and evidence-assessment drafts before recording this route response.');
  const record={id:'route-response-'+(d.records.length+1),at,outcome:a.outcome,reason:a.reason.trim(),source:structuredClone(alternativeSource),implications:routeImplications(s),basis:investigationBasis(s),questions:structuredClone(alternativeQuestions),assumptions:structuredClone(s.assumptions)};
  d.records.push(record);d.draft=null;
  s.questions=s.questions.filter(q=>!alternativeQuestions.some(x=>x.id===q.id));
  if(a.outcome==='pursue')s.questions.push(...structuredClone(alternativeQuestions));
  s.activity.unshift({at,message:(a.outcome==='pursue'?'Pursuing the component-integrator route. Two validation questions added.':'Dismissed the component-integrator route. Its questions are deferred; source and rationale retained.')+' '+record.reason});
 }else throw Error('Unknown alternative-route action.');
 return true;
}
const text=x=>typeof x==='string'&&!!x.trim();
export function validDiscovery(d){return !!d&&d.version===1&&Array.isArray(d.records)&&(d.draft===null||(d.draft&&['','pursue','dismiss'].includes(d.draft.outcome)&&typeof d.draft.reason==='string'&&typeof d.draft.basis==='string'))&&d.records.every((r,n)=>r.id==='route-response-'+(n+1)&&Number.isFinite(Date.parse(r.at))&&['pursue','dismiss'].includes(r.outcome)&&text(r.reason)&&text(r.basis)&&r.source?.id==='E-05'&&['title','type','date','reference','statement','limit'].every(k=>text(r.source[k]))&&Array.isArray(r.implications)&&r.implications.length===3&&r.implications.every(i=>['id','title','before','after','source','limit'].every(k=>text(i[k])))&&Array.isArray(r.questions)&&r.questions.length===2&&r.questions.every(q=>text(q.id)&&text(q.question)&&['demand','qualification'].includes(q.test))&&['volume','share','price'].every(k=>Number.isFinite(r.assumptions?.[k])&&r.assumptions[k]>=0)&&r.assumptions.share<=100);}
export function discoveryMemo(d){if(!d)return '';return ['## Alternative route: component integrator',...d.records.map(r=>`### ${r.outcome==='pursue'?'Pursue for validation':'Dismissed'} · ${r.at}\n${r.reason}\n\nSource: ${r.source.reference} · ${r.source.type} · ${r.source.date}\n${r.source.statement}\nLimitation: ${r.source.limit}\n\n${r.implications.map(i=>`- ${i.title}: ${i.before} → ${i.after} Limit: ${i.limit}`).join('\n')}\n\n${r.outcome==='pursue'?'Validation questions':'Deferred questions'}:\n${r.questions.map(q=>'- '+q.question).join('\n')}\nRevenue inputs were not revised by this response. Partner economics and technical fit remain unverified.`)].join('\n\n');}
