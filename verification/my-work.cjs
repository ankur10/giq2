const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const storage=new Map(),events={};
const ctx={window:{},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},document:{addEventListener:(k,f)=>(events[k]??=[]).push(f),querySelector:()=>null,querySelectorAll:()=>[]},location:{hash:'#work'},crypto:require('node:crypto').webcrypto,console};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('my-work.js','utf8'),ctx);
const work=ctx.window.GROWTHIQ_WORK;
function click(attrs){const b={dataset:Object.fromEntries(Object.entries(attrs).map(([k,v])=>[k.replace(/^data-/,'').replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),v])),hasAttribute:k=>k in attrs};const target={closest:selector=>Object.keys(attrs).some(k=>selector.includes('['+k+']'))?b:null};for(const f of events.click)f({target,preventDefault(){}})}
work.openProject('portfolio');assert.match(work.view(),/Start work/);
for(const route of ['ask','studio','radar','domain-expert']){
 click({'data-project-launch':route});assert.equal(ctx.location.hash,route);
 assert.match(work.contextBanner(route==='studio'?'studio-workspace':route),/Portfolio strategy/);
 work.captureActivity('test:'+route,route);
 assert.equal(JSON.parse(storage.get('growthiq-my-work-v1')).assignments['test:'+route],'portfolio');
}
click({'data-project-launch':'ask'});work.captureActivity('wrong-route','radar');assert.equal(JSON.parse(storage.get('growthiq-my-work-v1')).assignments['wrong-route'],undefined);
work.contextBanner('feed');work.captureActivity('detached','ask');assert.equal(JSON.parse(storage.get('growthiq-my-work-v1')).assignments.detached,undefined);
click({'data-project-archive':''});assert.match(work.view(),/Restore project/);click({'data-project-launch':'ask'});assert.equal(work.contextBanner('ask'),'');
click({'data-project-archive':''});assert.match(work.view(),/Start work/);
click({'data-project-view':'Findings'});assert.match(work.view(),/Project decision/);
storage.set('growthiq-studio-drafts',JSON.stringify({'market-model':{subject:'Market opportunity'}}));assert(work.snapshot().activities.some(r=>r.id==='studio:market-model'&&r.status==='Draft'));
console.log('Project checks passed: navigation, all four launch contexts, assignment, detached context, archive/restore, findings and Studio draft adapter.');
