
export function atlasModel(data){
 const graph=data.responses.connected_graph.response.data;
 const circles=data.responses.yc_circle_segments.response.data;
 const G=[];
 for(const b of circles.inner_circle_segments){
  let group=G.find(g=>g.name===b.hot_bet);if(!group){group={name:b.hot_bet,bets:[]};G.push(group);}
  group.bets.push({name:b.name,items:b.disruptive_technologies.map(t=>[t,circles.outer_circle_segments.find(f=>f.next_hot_bet===b.name&&f.disruptive_technology===t)?.name||'No linked trend'])});
 }
 const CG=graph.customers.map(g=>g.name), MK=[], CO=[];
 graph.customers.forEach((g,gi)=>g.companies.forEach(c=>{
  const aliases={'Amazon.com, Inc.':'Amazon','Jd.com':'JD.com','WALMART INC.':'Walmart','United Parcel Service, Inc.':'UPS','FedEx Corporation':'FedEx','LYFT, INC.':'Lyft'};
  const company={name:aliases[c.name]||c.name,raw:c.name,g:gi,i:CO.length,m:[]};
  for(const m of c.revenueSources){let market=MK.find(x=>x.id===m.id);if(!market){market={i:MK.length,id:m.id,name:m.name.replace(/ Market$/,''),size:parseFloat(m.size.replace(/[^0-9.]/g,'')),cagr:parseFloat(m.cagr),year:new Date(parseInt(m.id.slice(0,8),16)*1000).getUTCFullYear(),cos:[]};MK.push(market);}market.cos.push(company.i);company.m.push(market.i);}
  CO.push(company);
 }));
 const MORD=MK.slice().sort((a,b)=>a.cos.reduce((s,x)=>s+x,0)/a.cos.length-b.cos.reduce((s,x)=>s+x,0)/b.cos.length||b.cagr-a.cagr);
 const values=[...graph.core.summary.matchAll(/USD ([\d,.]+) billion/g)].map(x=>Number(x[1].replaceAll(',','')));
 const CORE={name:graph.core.label,v25:values[0],v35:values[1],node:parseFloat(graph.core.size.replace(/[^0-9.]/g,'')),cagr:parseFloat(graph.core.cagr)};
 if(G.length!==3||G.some(g=>g.bets.length!==3||g.bets.some(b=>b.items.length!==3))||CO.length!==6||MK.length!==13||values.length<2)throw new Error('The export does not match this EV atlas layout.');
 return {G,CG,MK,CO,MORD,CORE};
}
export async function mount(host){
 const root=host.shadowRoot||host.attachShadow({mode:'open'});
 root.innerHTML='<p role="status">Loading connected market data…</p>';
 try{
  const responses=await Promise.all(['data/data1.json','connected-markets.html','connected-markets.css'].map(url=>fetch(url)));
  if(responses.some(r=>!r.ok))throw new Error('Atlas files unavailable');
  const [data,markup,css]=await Promise.all([responses[0].json(),responses[1].text(),responses[2].text()]);
  if(!host.isConnected)return;
  const model=atlasModel(data);
  root.innerHTML='<style>'+css+'</style>'+markup;
  render(root,model);
 }catch(error){
  root.innerHTML='<p role="alert">Connected market data could not be loaded. Check that the EV export is available and try again.</p><button type="button">Try again</button>';
  root.querySelector('button').onclick=()=>mount(host);
  console.error('Connected Markets:',error);
 }
}
function render(root,{G,CG,MK,CO,MORD,CORE}){
root.querySelector('.market-title').textContent=CORE.name;
root.querySelectorAll('.facts b').forEach((el,i)=>el.textContent=[1,G.length,G.flatMap(g=>g.bets).length,G.flatMap(g=>g.bets).flatMap(b=>b.items).length,G.flatMap(g=>g.bets).flatMap(b=>b.items).length,CO.length,MK.length][i]);
var LEVELS=['Hot bet','Next hot bet','Disruptive technology','Future trend'];
/* flatten taxonomy */
var N=[];
G.forEach(function(g,gi){
  var gn={level:0,name:g.name,g:gi,path:'g'+gi,row:gi*9+4,a0:gi*120,a1:gi*120+120,line:[g.name]};N.push(gn);
  g.bets.forEach(function(b,bi){
    var bn={level:1,name:b.name,g:gi,path:gn.path+'.b'+bi,row:gi*9+bi*3+1,parent:gn,a0:gi*120+bi*40,a1:gi*120+bi*40+40,line:[g.name,b.name]};N.push(bn);b.node=bn;b.g=gi;
    b.items.forEach(function(it,ti){
      var leaf=gi*9+bi*3+ti, s=360/27;
      var tn={level:2,name:it[0],g:gi,path:bn.path+'.t'+ti,row:leaf,parent:bn,a0:leaf*s,a1:(leaf+1)*s,line:[g.name,b.name,it[0]]};N.push(tn);
      N.push({level:3,name:it[1],g:gi,path:tn.path+'.f',row:leaf,parent:tn,a0:leaf*s,a1:(leaf+1)*s,line:[g.name,b.name,it[0],it[1]]});
    });
  });
});

/* ---------- helpers ---------- */
var NS='http://www.w3.org/2000/svg';
function $(s){return root.querySelector(s);}
function S(tag,attrs,parent,text){var e=document.createElementNS(NS,tag);for(var k in attrs)e.setAttribute(k,attrs[k]);if(text!=null)e.textContent=text;if(parent)parent.appendChild(e);return e;}
function H(tag,attrs,parent,text){var e=document.createElement(tag);for(var k in attrs||{})e.setAttribute(k,attrs[k]);if(text!=null)e.textContent=text;if(parent)parent.appendChild(e);return e;}
function wrap(str,max){var w=str.split(' '),out=[],cur='';w.forEach(function(x){if(cur&&(cur+' '+x).length>max){out.push(cur);cur=x;}else cur=cur?cur+' '+x:x;});if(cur)out.push(cur);return out;}
function money(v){return '$'+v.toLocaleString('en-US',{maximumFractionDigits:2})+'B';}
function pt(r,a){var t=(a-90)*Math.PI/180;return [+(r*Math.cos(t)).toFixed(2),+(r*Math.sin(t)).toFixed(2)];}

var tipEl=$('#tip');
function showTip(e,t){
  tipEl.replaceChildren();
  if(t.e)H('div',{class:'te'},tipEl,t.e);
  H('div',{class:'tt'},tipEl,t.t);
  (t.l||[]).forEach(function(x){H('div',{class:'tl'},tipEl,x);});
  tipEl.hidden=false;place(e);
}
function place(e){
  var x,y;
  if(e.type&&e.type.indexOf('pointer')===0){x=e.clientX;y=e.clientY;}
  else{var r=e.target.getBoundingClientRect();x=r.left+r.width/2;y=r.top+r.height/2;}
  var w=tipEl.offsetWidth,h=tipEl.offsetHeight,L=x+14,T=y+14;
  if(L+w>innerWidth-8)L=x-w-14;if(L<8)L=8;
  if(T+h>innerHeight-8)T=y-h-14;if(T<8)T=8;
  tipEl.style.left=L+'px';tipEl.style.top=T+'px';
}
function tip(el,get,onIn,onOut){
  const description=get({});el.setAttribute('aria-label',[description.e,description.t,...(description.l||[])].filter(Boolean).join('. '));
  function i(e){showTip(e,get(e));if(onIn)onIn();}
  function o(){tipEl.hidden=true;if(onOut)onOut();}
  el.addEventListener('pointerenter',i);el.addEventListener('pointermove',function(e){if(!tipEl.hidden)place(e);});
  el.addEventListener('pointerleave',o);el.addEventListener('focus',i);el.addEventListener('blur',o);
}
function related(a,b){return a===b||a.indexOf(b+'.')===0||b.indexOf(a+'.')===0;}
function bindNode(el,n,svg){
  tip(el,function(){return {e:LEVELS[n.level],t:n.name,l:n.line.length>1?[n.line.slice(0,-1).join(' › ')]:['Under '+CORE.name]};},
    function(){svg.classList.add('focus');svg.querySelectorAll('[data-p]').forEach(function(x){x.classList.toggle('on',related(x.getAttribute('data-p'),n.path));});},
    function(){svg.classList.remove('focus');});
}
root.querySelectorAll('[data-groups]').forEach(function(l){G.forEach(function(g,i){var s=H('span',{class:'c'+i},l);H('i',{},s);s.appendChild(document.createTextNode(g.name));});});

/* ---------- 1. horizon map ---------- */
(function(){
  var svg=$('#s-horizon'),W=1004,top=32,rh=19,Ht=top+27*rh+6;
  svg.setAttribute('viewBox','0 0 '+W+' '+Ht);
  var cols=[[0,140],[186,372],[418,656],[702,1000]];
  LEVELS.forEach(function(h,i){S('text',{x:cols[i][0],y:14,class:'cap'},svg,h);});
  S('line',{x1:0,y1:28,x2:W-9,y2:28,class:'axis'},svg);S('path',{d:'M'+(W-9)+' 24L'+(W-1)+' 28L'+(W-9)+' 32Z',class:'axis-head'},svg);
  function y(r){return top+r*rh+rh/2;}
  var gl=S('g',{},svg),gn=S('g',{},svg);
  N.forEach(function(n){
    var c=cols[n.level],yy=y(n.row);
    if(n.parent){var pc=cols[n.level-1],x1=pc[1],x2=c[0],m=(x1+x2)/2,py=y(n.parent.row);
      S('path',{d:'M'+x1+' '+py+'C'+m+' '+py+' '+m+' '+yy+' '+x2+' '+yy,class:'link c'+n.g,'data-p':n.path},gl);}
    var g=S('g',{class:'node lv'+n.level+' c'+n.g,'data-p':n.path,tabindex:0},gn);
    S('rect',{x:c[0],y:yy-8,width:c[1]-c[0],height:16,rx:4,class:'tint'},g);
    S('text',{x:c[0]+9,y:yy+4.6},g,n.name);
    bindNode(g,n,svg);
  });
})();

/* ---------- 2. sunburst ---------- */
function sector(r0,r1,a0,a1){var p0=pt(r1,a0),p1=pt(r1,a1),p2=pt(r0,a1),p3=pt(r0,a0);
  return 'M'+p0+'A'+r1+' '+r1+' 0 0 1 '+p1+'L'+p2+'A'+r0+' '+r0+' 0 0 0 '+p3+'Z';}
function arc(r,a0,a1,rev){var s=pt(r,rev?a1:a0),e=pt(r,rev?a0:a1);return 'M'+s+'A'+r+' '+r+' 0 0 '+(rev?0:1)+' '+e;}
function radialLabel(parent,lines,a,r,o){
  var flip=a>180,g=S('g',{transform:'rotate('+(a-90).toFixed(2)+') translate('+r+' 0)'+(flip?' rotate(180)':'')},parent);
  var dir=o.dir||0,far=dir>0?!flip:flip,lh=o.lh||15,x=dir?(far?o.dx:-o.dx):0,lift=lines.length===1&&o.lift?o.lift:0;
  var t=S('text',{'text-anchor':dir?(far?'start':'end'):'middle',class:o.cls||''},g);
  lines.forEach(function(ln,i){S('tspan',{x:x,y:((i-(lines.length-1)/2)*lh+(o.fs||13)*0.35-lift).toFixed(1)},t,ln);});
  return g;
}
function coreMark(svg,r){
  S('circle',{r:r,class:'corering'},svg);
  S('text',{y:-9,class:'coretxt'},svg,'Electric');S('text',{y:13,class:'coretxt'},svg,'Vehicle');
  S('text',{y:31,class:'coresub'},svg,'CORE MARKET');
}
(function(){
  var svg=$('#s-sunburst'),R=[[74,112],[112,228],[228,384],[384,552]],V=560;
  svg.setAttribute('viewBox',-V+' '+-V+' '+2*V+' '+2*V);
  var defs=S('defs',{},svg),gs=S('g',{},svg),gt=S('g',{},svg);
  var wr=[0,14,20,21];
  N.forEach(function(n){
    var r=R[n.level],p=S('path',{d:sector(r[0],r[1],n.a0,n.a1),class:'seg tint lv'+n.level+' c'+n.g,'data-p':n.path,tabindex:0},gs);
    bindNode(p,n,svg);
    var mid=(n.a0+n.a1)/2;
    if(n.level===0){
      var rev=mid>90&&mid<270,rm=(r[0]+r[1])/2+(rev?4:-4),id='sb-g'+n.g;
      S('path',{id:id,d:arc(rm,n.a0+4,n.a1-4,rev),fill:'none'},defs);
      var t=S('text',{class:'glabel','text-anchor':'middle','data-p':n.path},gt);
      S('textPath',{href:'#'+id,startOffset:'50%'},t,n.name);
    }else{
      var g=radialLabel(gt,wrap(n.name,wr[n.level]),mid,(r[0]+r[1])/2,{cls:n.level===1?'b':'',fs:13});
      g.setAttribute('data-p',n.path);
    }
  });
  coreMark(svg,68);
})();

/* ---------- 3. radial tree ---------- */
(function(){
  var svg=$('#s-radial'),V=622,RB=206,RT=300,RF=452;
  svg.setAttribute('viewBox',-V+' '+-V+' '+2*V+' '+2*V);
  var defs=S('defs',{},svg),gl=S('g',{},svg),gn=S('g',{},svg);
  N.forEach(function(n){
    var a=(n.a0+n.a1)/2;
    if(n.level===0){
      var id='rt-g'+n.g,rev=a>90&&a<270;
      var hit=S('g',{'data-p':n.path,class:'c'+n.g,tabindex:0},gn);
      S('path',{d:arc(58,n.a0+5,n.a1-5,false),class:'garc'},hit);
      S('path',{id:id,d:arc(rev?78:68,n.a0+5,n.a1-5,rev),fill:'none'},defs);
      var t=S('text',{class:'glabel','text-anchor':'middle'},hit);S('textPath',{href:'#'+id,startOffset:'50%'},t,n.name);
      bindNode(hit,n,svg);return;
    }
    var r=n.level===1?RB:n.level===2?RT:RF,p=pt(r,a);
    if(n.level===1){S('path',{d:'M'+pt(48,a)+'L'+pt(RB,a),class:'link c'+n.g,'data-p':n.path},gl);}
    else if(n.level===2){var pa=(n.parent.a0+n.parent.a1)/2,rm=(RB+RT)/2+6;
      S('path',{d:'M'+pt(RB,pa)+'C'+pt(rm,pa)+' '+pt(rm,a)+' '+p,class:'link c'+n.g,'data-p':n.path},gl);}
    else{S('path',{d:'M'+pt(RT,a)+'L'+p,class:'link c'+n.g,'data-p':n.path},gl);}
    var g=S('g',{class:'node lv'+n.level+' c'+n.g,'data-p':n.path,tabindex:0},gn);
    S('circle',{cx:p[0],cy:p[1],r:n.level===1?6.5:n.level===2?4:5},g);
    var o=n.level===1?{dir:-1,dx:13,fs:13.5,lh:17,lift:8,cls:'halo'}:n.level===2?{dir:1,dx:10,fs:12.5,lh:17,lift:7.5,cls:'halo'}:{dir:1,dx:11,fs:13};
    radialLabel(g,wrap(n.name,n.level===1?14:n.level===2?19:21),a,r,o);
    bindNode(g,n,svg);
  });
  coreMark(svg,44);
})();

/* ---------- 4. value chain ---------- */
(function(){
  var stages=[['Battery and materials',['Battery Technology','Battery Production']],['Vehicle and software',['EV Manufacturing','Autonomous Driving','Technology']],['Charging',['Charging Infrastructure','Charging Stations']],['Energy and grid',['Energy']],['Mobility and fleets',['Automotive']]];
  var all={};G.forEach(function(g){g.bets.forEach(function(b){all[b.name]=b;});});
  var root=$('#chain');
  stages.forEach(function(s,i){
    var sec=H('section',{class:'stage'},root),hd=H('header',{},sec);
    H('div',{class:'cap'},hd,'Stage '+(i+1));H('h3',{},hd,s[0]);
    s[1].forEach(function(bn){var b=all[bn],c=H('div',{class:'bet c'+b.g},sec);H('h4',{},c,b.name);
      var ul=H('ul',{},c);b.items.forEach(function(it){var li=H('li',{},ul,it[0]);H('small',{},li,'→ '+it[1]);});});
  });
  var d=$('#demand');H('div',{class:'cap'},d,'Demand · customer groups in the export');
  CG.forEach(function(g,gi){var b=H('div',{class:'box'},d);H('h4',{},b,g);H('p',{},b,CO.filter(function(c){return c.g===gi;}).map(function(c){return c.name;}).join(' · '));});
})();

/* ---------- 5. theme matrix ---------- */
(function(){
  var themes=[['AI',/\bAI\b/],['Quantum',/Quantum/],['Edge and connectivity',/Edge|5G|V2X|IoT/],['Autonomy',/Autonomous|LiDAR/],['Battery',/Batter|Electrolyte/],['Charging',/Charging|V2G|Power Transfer/],['Grid and energy',/Energy|Grid|Power Plant|Solar/],['Materials',/Graphene|Nano|Lightweight|Solid|Lithium|Cobalt/],['Mobility models',/Mobility|Fleet|Leasing|Subscription|Trucks/]];
  var bets=[];G.forEach(function(g){g.bets.forEach(function(b){bets.push(b);});});
  var t=$('#t-themes'),th=H('thead',{},t),r1=H('tr',{},th),r2=H('tr',{},th);
  H('th',{rowspan:2},r1,'Theme');
  G.forEach(function(g,i){H('th',{colspan:3,class:'gh c'+i},r1,g.name);});
  H('th',{rowspan:2,class:'num tot'},r1,'Branches');
  bets.forEach(function(b){H('th',{class:'bh'},r2,b.name);});
  var tb=H('tbody',{},t);
  themes.forEach(function(tm){
    var tr=H('tr',{},tb),n=0;H('th',{scope:'row'},tr,tm[0]);
    bets.forEach(function(b){
      var hits=[];b.items.forEach(function(it){it.forEach(function(x){if(tm[1].test(x))hits.push(x);});});
      var td=H('td',{class:'h',style:'--v:'+(hits.length?Math.min(72,10+12*hits.length):0)+'%'},tr,hits.length?String(hits.length):'');
      if(hits.length){n++;td.setAttribute('tabindex',0);tip(td,function(){return {e:tm[0]+' in '+b.name,t:hits.length+' of 6 labels',l:hits};});}
    });
    H('td',{class:'num tot'},tr,n+' / 9');
  });
})();

/* ---------- 6. company × market matrix ---------- */
(function(){
  var t=$('#t-matrix'),th=H('thead',{},t),r1=H('tr',{},th),r2=H('tr',{},th);
  H('th',{rowspan:2},r1,'Linked market');
  H('th',{colspan:3,class:'ctr grph'},r1,CG[0]);H('th',{class:'gap',rowspan:2},r1);H('th',{colspan:3,class:'ctr grph'},r1,CG[1]);
  H('th',{rowspan:2,class:'num'},r1,'Size');H('th',{rowspan:2,class:'num'},r1,'CAGR');
  CO.forEach(function(c){H('th',{class:'ctr'},r2,c.name);});
  var tb=H('tbody',{},t);
  MORD.forEach(function(m){
    var tr=H('tr',{},tb);H('th',{scope:'row'},tr,m.name);
    CO.forEach(function(c,ci){
      if(ci===3)H('td',{class:'gap'},tr);
      var on=m.cos.indexOf(ci)>=0,td=H('td',{class:'cell'},tr);H('span',{class:on?'dot':'nodot'},td);
      if(on){td.setAttribute('tabindex',0);td.setAttribute('aria-label',c.name+' linked to '+m.name);
        tip(td,function(){return {e:CG[c.g],t:c.name+' → '+m.name,l:['Listed as '+c.raw,money(m.size)+' · '+m.cagr+'% CAGR']};});}
    });
    H('td',{class:'num'},tr,money(m.size));
    var cg=H('td',{class:'num cagr'},tr),tk=H('span',{class:'trk'},cg);H('span',{class:'bar',style:'width:'+(m.cagr*0.5).toFixed(0)+'px'},tk);cg.appendChild(document.createTextNode(m.cagr+'%'));
  });
})();

/* ---------- 7. network ---------- */
(function(){
  var svg=$('#s-network'),W=940,rh=40,top=30,Ht=top+12*rh+44;
  svg.setAttribute('viewBox','34 0 '+(W-34)+' '+Ht);
  var cx=262,mx=560,cy=[],my={};
  MORD.forEach(function(m,i){my[m.i]=top+i*rh;});
  cy=[70,170,270,345,405,475]; /* near each company's linked rows, with a gap between the two groups */
  var gl=S('g',{},svg),gn=S('g',{},svg);
  function focus(keys){svg.classList.add('focus');svg.querySelectorAll('[data-n]').forEach(function(x){var k=x.getAttribute('data-n').split(' ');x.classList.toggle('on',k.some(function(v){return keys.indexOf(v)>=0;}));});}
  function blur(){svg.classList.remove('focus');}
  CO.forEach(function(c){c.m.forEach(function(mi){var y1=cy[c.i],y2=my[mi],m=(cx+mx)/2;
    S('path',{d:'M'+cx+' '+y1+'C'+m+' '+y1+' '+m+' '+y2+' '+mx+' '+y2,class:'nlink','data-n':'c'+c.i+' m'+mi},gl);});});
  CG.forEach(function(g,gi){var idx=CO.filter(function(c){return c.g===gi;}),y0=cy[idx[0].i]-16,y1=cy[idx[2].i]+16,ym=(y0+y1)/2,lines=wrap(g,16);
    S('path',{d:'M128 '+y0+'H120V'+y1+'H128',class:'brk'},svg);
    var t=S('text',{class:'glab','text-anchor':'end'},svg);lines.forEach(function(ln,i){S('tspan',{x:110,y:ym+(i-(lines.length-1)/2)*15+4},t,ln);});});
  CO.forEach(function(c){
    var g=S('g',{'data-n':'c'+c.i+' '+c.m.map(function(x){return 'cm'+x;}).join(' '),tabindex:0},gn);
    S('circle',{cx:cx,cy:cy[c.i],r:8,class:'cnode'},g);S('text',{x:cx-15,y:cy[c.i]+5,'text-anchor':'end',class:'clabel'},g,c.name);
    tip(g,function(){return {e:CG[c.g],t:c.name,l:['Listed as '+c.raw].concat(c.m.map(function(mi){return MK[mi].name;}))};},
      function(){focus(['c'+c.i,'mc'+c.i]);},blur);
  });
  MORD.forEach(function(m){
    var keys=['m'+m.i].concat(m.cos.map(function(ci){return 'mc'+ci;}));
    var g=S('g',{'data-n':keys.join(' '),tabindex:0},gn),y=my[m.i],r=4+2.5*m.cos.length;
    S('circle',{cx:mx,cy:y,r:r,class:'mnode'},g);
    S('text',{x:mx+22,y:y+1,class:'mlabel'},g,m.name);
    S('text',{x:mx+22,y:y+15,class:'mmeta'},g,money(m.size)+' · '+m.cagr+'%');
    tip(g,function(){return {e:'Linked market',t:m.name,l:[money(m.size)+' · '+m.cagr+'% CAGR','Linked to '+m.cos.map(function(ci){return CO[ci].name;}).join(', ')]};},
      function(){focus(['m'+m.i,'cm'+m.i]);},blur);
  });
})();

/* ---------- 8. size vs growth ---------- */
(function(){
  var svg=$('#s-bubble'),W=940,Ht=516,PL=64,PR=880,PT=38,PB=452;
  svg.setAttribute('viewBox','0 0 '+W+' '+Ht);
  var LX=Math.log10(2000);
  function x(v){return PL+Math.log10(v)/LX*(PR-PL);}
  function y(v){return PB-v/100*(PB-PT);}
  [0,20,40,60,80,100].forEach(function(v){S('line',{x1:PL,x2:PR,y1:y(v),y2:y(v),class:v?'grid':'axis'},svg);S('text',{x:PL-10,y:y(v)+4,'text-anchor':'end',class:'tick'},svg,v+'%');});
  [1,10,100,1000].forEach(function(v){S('line',{x1:x(v),x2:x(v),y1:PB,y2:PB+5,class:'axis'},svg);S('text',{x:x(v),y:PB+20,'text-anchor':'middle',class:'tick'},svg,'$'+v.toLocaleString('en-US')+'B');});
  S('text',{x:(PL+PR)/2,y:Ht-12,'text-anchor':'middle',class:'axt'},svg,'Market size, log scale (year not stated in the export)');
  S('text',{x:14,y:16,class:'axt'},svg,'CAGR');
  var P=MK.map(function(m){return {m:m,x:x(m.size),y:y(m.cagr),r:Math.sqrt(m.cos.length)*7.5,label:m.name};});
  var core={core:1,x:x(CORE.node),y:y(CORE.cagr),r:8,label:'Electric Vehicle (core)'};
  P.forEach(function(a,i){P.slice(i+1).forEach(function(b){if(a.label&&b.label&&Math.hypot(a.x-b.x,a.y-b.y)<6){a.label+=', '+b.label;b.label='';}});});
  var all=[core].concat(P.slice().sort(function(a,b){return a.y-b.y;}));
  var boxes=all.map(function(p){return {x:p.x-p.r,y:p.y-p.r,w:2*p.r,h:2*p.r};}),placed=[];
  function hit(a,b){return a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;}
  var gm=S('g',{},svg),gt=S('g',{},svg);
  all.forEach(function(p,i){
    var w=p.label.length*6.5+4,h=15,d=p.r+5,k=d*0.72,e=d+12;
    var c=[[p.x+d,p.y-h/2],[p.x-d-w,p.y-h/2],[p.x-w/2,p.y-d-h],[p.x-w/2,p.y+d],[p.x+k,p.y-k-h],[p.x+k,p.y+k],[p.x-k-w,p.y-k-h],[p.x-k-w,p.y+k],[p.x-w/2,p.y+e],[p.x-w/2,p.y-e-h],[p.x+k,p.y+e],[p.x-k-w,p.y+e]],best=c[0],low=1e9;
    if(p.core)c=[[p.x-d-w,p.y-h/2]];
    for(var j=0;j<c.length;j++){var b={x:c[j][0],y:c[j][1],w:w,h:h};
      if(b.x<PL+2||b.x+w>W-2||b.y<PT-8||b.y+h>PB-2)continue;
      var cost=placed.filter(function(q){return hit(b,q);}).length*2+boxes.filter(function(q,n){return n!==i&&Math.hypot(all[n].x-p.x,all[n].y-p.y)>6&&hit(b,q);}).length;
      if(cost<low){low=cost;best=c[j];}
      if(!cost)break;}
    if(p.label)placed.push({x:best[0],y:best[1],w:w,h:h});
    if(p.label)S('text',{x:best[0]+2,y:best[1]+11.5,class:'lab halo'},gt,p.label);
    var el;
    if(p.core){el=S('path',{d:'M'+p.x+' '+(p.y-9)+'L'+(p.x+9)+' '+p.y+'L'+p.x+' '+(p.y+9)+'L'+(p.x-9)+' '+p.y+'Z',class:'corept',tabindex:0},gm);
      tip(el,function(){return {e:'Core market',t:CORE.name,l:[money(CORE.node)+' on the graph node · '+CORE.cagr+'% CAGR']};});}
    else{el=S('circle',{cx:p.x,cy:p.y,r:p.r,class:'pt',tabindex:0},gm);
      tip(el,function(){var near=P.filter(function(q){return Math.hypot(q.x-p.x,q.y-p.y)<6;});
        if(near.length>1)return {e:'Overlapping markets',t:near.map(function(q){return q.m.name;}).join(' and '),l:near.map(function(q){return q.m.name+': '+money(q.m.size)+' · '+q.m.cagr+'%';})};
        return {e:'Linked market',t:p.m.name,l:[money(p.m.size)+' · '+p.m.cagr+'% CAGR','Linked to '+p.m.cos.map(function(ci){return CO[ci].name;}).join(', ')]};});}
  });
})();

/* ---------- 9. growth curve ---------- */
(function(){
  var svg=$('#s-growth'),W=900,Ht=420,PL=70,PR=860,PT=24,PB=366;
  svg.setAttribute('viewBox','0 0 '+W+' '+Ht);
  var r=Math.pow(CORE.v35/CORE.v25,0.1)-1;
  function val(yr){return CORE.v25*Math.pow(1+r,yr-2025);}
  function x(yr){return PL+(yr-2025)/10*(PR-PL);}
  function y(v){return PB-v/1400*(PB-PT);}
  [0,350,700,1050,1400].forEach(function(v){S('line',{x1:PL,x2:PR,y1:y(v),y2:y(v),class:v?'grid':'axis'},svg);S('text',{x:PL-10,y:y(v)+4,'text-anchor':'end',class:'tick'},svg,'$'+v.toLocaleString('en-US')+'B');});
  for(var yr=2025;yr<=2035;yr++){S('text',{x:x(yr),y:PB+20,'text-anchor':'middle',class:'tick'},svg,String(yr));}
  var d='';for(var q=2025;q<=2035;q+=0.25){d+=(d?'L':'M')+x(q).toFixed(1)+' '+y(val(q)).toFixed(1);}
  S('path',{d:d+'L'+x(2035)+' '+y(0)+'L'+x(2025)+' '+y(0)+'Z',class:'area'},svg);
  S('path',{d:d,class:'line'},svg);
  var yn=2025+Math.log(CORE.node/CORE.v25)/Math.log(1+r);
  var cross=S('line',{y1:PT,y2:PB,class:'cross',visibility:'hidden'},svg),hov=S('circle',{r:4.5,class:'hov',visibility:'hidden'},svg);
  S('circle',{cx:x(2025),cy:y(CORE.v25),r:5.5,class:'stated'},svg);
  S('circle',{cx:x(2035),cy:y(CORE.v35),r:5.5,class:'stated'},svg);
  S('circle',{cx:x(yn),cy:y(CORE.node),r:6,class:'shown'},svg);
  function lab(px,py,anchor,a,b){var t=S('text',{x:px,y:py,'text-anchor':anchor,class:'lab halo'},svg);S('tspan',{'font-weight':600},t,a);S('tspan',{x:px,dy:16,fill:'var(--ink2)'},t,b);}
  lab(x(2025)+10,y(CORE.v25)-30,'start','$698.63B','2025, stated');
  lab(x(2035)-2,y(CORE.v35)-30,'end','$1,189.59B','2035, stated');
  lab(x(yn),y(CORE.node)-32,'middle','$910.2B','graph node, no year given');
  var hitr=S('rect',{x:PL,y:PT,width:PR-PL,height:PB-PT,fill:'transparent',tabindex:0,'aria-label':'Core market size by year'},svg),cur=2030;
  function at(e){
    if(e.type.indexOf('pointer')===0){var point=svg.createSVGPoint();point.x=e.clientX;point.y=e.clientY;var local=point.matrixTransform(svg.getScreenCTM().inverse());cur=Math.round(2025+(local.x-PL)/(PR-PL)*10);}
    cur=Math.max(2025,Math.min(2035,cur));
    cross.setAttribute('x1',x(cur));cross.setAttribute('x2',x(cur));cross.setAttribute('visibility','visible');
    hov.setAttribute('cx',x(cur));hov.setAttribute('cy',y(val(cur)));hov.setAttribute('visibility','visible');
    var st=cur===2025||cur===2035;
    showTip(e,{e:String(cur),t:money(+val(cur).toFixed(1)),l:[st?'Stated in the report summary':'Interpolated at '+(r*100).toFixed(2)+'% a year']});
  }
  function off(){tipEl.hidden=true;cross.setAttribute('visibility','hidden');hov.setAttribute('visibility','hidden');}
  hitr.addEventListener('pointermove',at);hitr.addEventListener('pointerleave',off);hitr.addEventListener('focus',at);hitr.addEventListener('blur',off);
  hitr.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){cur++;at(e);}else if(e.key==='ArrowLeft'){cur--;at(e);}});
})();

/* ---------- 10. data tables ---------- */
(function(){
  var t=$('#t-markets'),hr=H('tr',{},H('thead',{},t));
  ['Market','Size','CAGR','Companies','ID timestamp year'].forEach(function(h,i){H('th',{class:i===1||i===2||i===4?'num':''},hr,h);});
  var tb=H('tbody',{},t);
  MORD.forEach(function(m){var tr=H('tr',{},tb);H('th',{scope:'row'},tr,m.name);H('td',{class:'num'},tr,money(m.size));H('td',{class:'num'},tr,m.cagr+'%');
    H('td',{},tr,m.cos.map(function(ci){return CO[ci].name;}).join(', '));H('td',{class:'num'},tr,String(m.year));});
  var t2=$('#t-tax'),h2=H('tr',{},H('thead',{},t2));LEVELS.forEach(function(h){H('th',{},h2,h);});
  var b2=H('tbody',{},t2);
  G.forEach(function(g,gi){g.bets.forEach(function(b){b.items.forEach(function(it){var tr=H('tr',{},b2);
    var td=H('td',{class:'c'+gi},tr);H('span',{class:'sw'},td);td.appendChild(document.createTextNode(g.name));
    H('td',{},tr,b.name);H('td',{},tr,it[0]);H('td',{},tr,it[1]);});});});
})();

/* Zoom the SVG camera rather than the page; each view keeps its own camera. */
root.querySelectorAll('.scroll > svg').forEach(svg=>{
 const base=svg.getAttribute('viewBox').split(/\s+/).map(Number);
 let camera=base.slice(),zoom=1,drag=null;
 const viewport=svg.parentElement;
 viewport.classList.add('chart-viewport');
 const bar=H('div',{class:'chart-zoom',role:'group','aria-label':'Chart zoom controls'},viewport);
 const minus=H('button',{type:'button','aria-label':'Zoom out',title:'Zoom out'},bar,'−');
 const percent=H('output',{'aria-label':'Chart zoom level','aria-live':'polite'},bar,'100%');
 const plus=H('button',{type:'button','aria-label':'Zoom in',title:'Zoom in'},bar,'+');
 const reset=H('button',{type:'button',class:'zoom-reset',title:'Reset zoom and pan to fit the chart'},bar,'Reset to fit');
 const hint=H('span',{class:'zoom-hint'},bar,'Drag to pan · Ctrl/⌘ + scroll to zoom');
 svg.setAttribute('tabindex','0');
 svg.setAttribute('aria-description','Use plus and minus to zoom, arrow keys to pan, and Home to reset. Drag to pan after zooming.');
 function paint(){
  svg.setAttribute('viewBox',camera.join(' '));
  viewport.classList.toggle('is-zoomed',zoom>1);
  percent.textContent=Math.round(zoom*100)+'%';minus.disabled=zoom<=1;plus.disabled=zoom>=6;
  tipEl.hidden=true;
 }
 function local(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
 function change(factor,anchor){
  const next=Math.min(6,Math.max(1,zoom*factor));
  const p=anchor||{x:camera[0]+camera[2]/2,y:camera[1]+camera[3]/2};
  camera=zoomCamera(base,camera,next,p);zoom=next;paint();
 }
 function fit(){zoom=1;camera=base.slice();paint();}
 plus.addEventListener('click',()=>change(1.3));minus.addEventListener('click',()=>change(1/1.3));reset.addEventListener('click',fit);
 svg.addEventListener('wheel',e=>{if(!e.ctrlKey&&!e.metaKey)return;e.preventDefault();change(Math.exp(-e.deltaY*.003),local(e));},{passive:false});
 svg.addEventListener('pointerdown',e=>{
  if(zoom<=1||e.button!==0||drag)return;
  drag={id:e.pointerId,x:e.clientX,y:e.clientY,camera:camera.slice(),matrix:svg.getScreenCTM().inverse()};
  svg.setPointerCapture(e.pointerId);viewport.classList.add('is-panning');tipEl.hidden=true;
 });
 svg.addEventListener('pointermove',e=>{
  if(!drag||drag.id!==e.pointerId)return;
  e.stopImmediatePropagation();
  const dx=(e.clientX-drag.x)*drag.matrix.a,dy=(e.clientY-drag.y)*drag.matrix.d;
  camera=clampCamera(base,[drag.camera[0]-dx,drag.camera[1]-dy,camera[2],camera[3]]);paint();
 },true);
 function end(e){if(drag?.id!==e.pointerId)return;drag=null;viewport.classList.remove('is-panning');if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);}
 ['pointerup','pointercancel','lostpointercapture'].forEach(name=>svg.addEventListener(name,end));
 svg.addEventListener('keydown',e=>{
  if(e.target!==svg)return;
  if(e.key==='+'||e.key==='=')change(1.3);
  else if(e.key==='-')change(1/1.3);
  else if(e.key==='Home'||e.key==='0')fit();
  else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
   camera=clampCamera(base,[camera[0]+(e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0)*camera[2]*.1,camera[1]+(e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:0)*camera[3]*.1,camera[2],camera[3]]);paint();
  }else return;
  e.preventDefault();
 });
 paint();
});

// Expedition is retained for future iteration but is not mounted or offered in navigation.

/* Motion is local to the mounted page; all sequences are finite and CSS handles OS preferences. */
const sizeButton=root.querySelector('.chart-size-toggle');
sizeButton.addEventListener('click',()=>{const large=root.host.dataset.chartSize!=='large';root.host.dataset.chartSize=large?'large':'fit';sizeButton.setAttribute('aria-pressed',String(large));sizeButton.textContent=large?'Fit chart':'Enlarge chart';});
const motionButton=root.querySelector('.motion-toggle');
let motionEnabled=true;
try{motionEnabled=localStorage.getItem('ev-atlas-motion')!=='off';}catch{}
function updateMotion(){root.host.dataset.motion=motionEnabled?'on':'off';motionButton.setAttribute('aria-pressed',String(motionEnabled));motionButton.textContent=motionEnabled?'Motion on':'Motion off';}
updateMotion();
motionButton.addEventListener('click',()=>{motionEnabled=!motionEnabled;updateMotion();try{localStorage.setItem('ev-atlas-motion',motionEnabled?'on':'off');}catch{}});
root.querySelectorAll('path.link,path.nlink,#s-growth path.line').forEach((path,i)=>{path.setAttribute('pathLength','1');path.style.setProperty('--arrival',Math.min(200,i*7)+'ms');});
root.querySelectorAll('.view').forEach(panel=>{
 panel.querySelectorAll('.node,.seg,#s-network g[data-n],.pt,.corept,.stage,tbody tr').forEach((mark,i)=>{
  const level=[...mark.classList].find(c=>/^lv[0-3]$/.test(c));
  mark.style.setProperty('--arrival',(level?Number(level.slice(2))*85+Math.min(110,i*3):Math.min(240,i*18))+'ms');
 });
 // Restore ordinary strokes after the finite drawing sequence.
 panel.addEventListener('animationend',event=>{if(event.target.matches('path.link,path.nlink,#s-growth path.line'))event.target.style.strokeDasharray=event.target.matches('#s-growth path.line')?'0.008 0.008':'none';});
});
/* ---------- tabs ---------- */
var btns=[].slice.call(root.querySelectorAll('.rail button')),ids=btns.map(function(b){return b.getAttribute('data-v');});
function show(id,push){
  if(ids.indexOf(id)<0)id=ids[0];
  const current=root.querySelector('.view:not([hidden])');
  if(current?.id==='v-'+id&&current.classList.contains('is-entering'))return;
  ids.forEach(function(v){const panel=$('#v-'+v);panel.classList.remove('is-entering');panel.hidden=v!==id;});
  const next=$('#v-'+id);
  sizeButton.hidden=id==='expedition';
  next.querySelectorAll('path.link,path.nlink,#s-growth path.line').forEach(p=>p.style.removeProperty('stroke-dasharray'));
  void next.offsetWidth;
  next.classList.add('is-entering');
  btns.forEach(function(b){b.setAttribute('aria-selected',b.getAttribute('data-v')===id?'true':'false');b.tabIndex=b.getAttribute('data-v')===id?0:-1;});
  tipEl.hidden=true;
  if(push){try{localStorage.setItem('ev-atlas-view',id);}catch(e){}}
}
btns.forEach(function(b){b.addEventListener('click',function(){show(b.getAttribute('data-v'),true);});});
var start='';
if(!start){try{start=localStorage.getItem('ev-atlas-view')||'';}catch(e){}}
show(start||ids[0],false);


btns.forEach((b,i)=>{b.id='atlas-tab-'+ids[i];b.setAttribute('aria-controls','v-'+ids[i]);const panel=$('#v-'+ids[i]);panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',b.id);b.addEventListener('keydown',e=>{let n=i;if(e.key==='ArrowDown'||e.key==='ArrowRight')n=(i+1)%btns.length;else if(e.key==='ArrowUp'||e.key==='ArrowLeft')n=(i+btns.length-1)%btns.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=btns.length-1;else return;e.preventDefault();show(ids[n],true);btns[n].focus();});});
root.addEventListener('keydown',e=>{if(e.key==='Escape')tipEl.hidden=true;});

}

// Keep the camera inside the original chart bounds, including radial charts with negative origins.
export function clampCamera(base,camera){
 const [x,y,w,h]=camera;
 return [Math.max(base[0],Math.min(base[0]+base[2]-w,x)),Math.max(base[1],Math.min(base[1]+base[3]-h,y)),w,h];
}
export function zoomCamera(base,camera,zoom,anchor){
 const w=base[2]/zoom,h=base[3]/zoom;
 return clampCamera(base,[anchor.x-(anchor.x-camera[0])*w/camera[2],anchor.y-(anchor.y-camera[1])*h/camera[3],w,h]);
}

function mountExpedition(host,groups,core){
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const arrow='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
 const records=groups.flatMap((g,gi)=>g.bets.flatMap((b,bi)=>b.items.map(([technology,trend],ti)=>({id:JSON.stringify([g.name,b.name,technology,trend]),group:g.name,branch:b.name,technology,trend,gi,bi,ti}))));
 const key='growthiq-expedition-v1:'+core.name;
 let gi=0,bi=0,selected=null,pins=[],thesis='',saved=true,lastBranch=null;
 const connection='<svg class="exp-connection" viewBox="0 0 100 40" aria-hidden="true"><path class="exp-track" d="M3 20C35 20 65 20 94 20"/><path class="exp-trace" pathLength="1" d="M3 20C35 20 65 20 94 20"/><circle class="exp-origin" cx="3" cy="20" r="2.5"/><path class="exp-arrowhead" d="m88 14 6 6-6 6"/></svg>';
 try{const raw=JSON.parse(localStorage.getItem(key)||'{}');thesis=typeof raw.thesis==='string'?raw.thesis:'';pins=Array.isArray(raw.pins)?[...new Set(raw.pins)].filter(id=>records.some(r=>r.id===id)):[];}catch{saved=false;}
 function persist(){try{localStorage.setItem(key,JSON.stringify({pins,thesis}));saved=true;}catch{saved=false;}const label=host.querySelector('.exp-save');if(label)label.textContent=saved?'Saved in this browser':'Browser storage unavailable. Export to keep your work.';}
 function announce(message){host.querySelector('.exp-status').textContent=message;}
 function render(focus){
  const changed=lastBranch!==gi+':'+bi;lastBranch=gi+':'+bi;
  const group=groups[gi],branch=group.bets[bi];
  const rows=records.filter(r=>r.gi===gi&&r.bi===bi);
  const record=records.find(r=>r.id===selected);
  host.innerHTML=`<div class="exp-heading"><div><h2>Market Expedition</h2><p>Follow a branch. Collect the ideas worth investigating.</p></div><span class="exp-source">Source: EV market export</span></div>
  <div class="exp-layout">
   <nav class="exp-index" aria-label="Explore market branches"><h3>Choose a direction</h3>${groups.map((g,gIndex)=>`<div class="exp-family"><h4>${esc(g.name)}</h4>${g.bets.map((b,bIndex)=>`<button type="button" data-branch="${gIndex}:${bIndex}" ${gi===gIndex&&bi===bIndex?'aria-current="true"':''}>${esc(b.name)}${arrow}</button>`).join('')}</div>`).join('')}</nav>
   <section class="exp-journey ${changed?'exp-travelling':''}" aria-label="Branch exploration"><div class="exp-breadcrumb">${esc(core.name)} <span>/</span> ${esc(group.name)}</div><h3 class="exp-anchor" tabindex="-1">${esc(branch.name)}</h3><p class="exp-intro">Three technologies. Three possible next directions.</p>
    <div class="exp-column-labels"><span>Disruptive technology</span><span>Future trend</span></div>
    <div class="exp-paths">${rows.map((r,i)=>`<button type="button" class="exp-path ${selected===r.id?'selected':''}" data-trend="${r.ti}" aria-pressed="${selected===r.id}" style="--step:${i}"><span>${esc(r.technology)}</span>${connection}<strong>${esc(r.trend)}</strong></button>`).join('')}</div>
    ${record?`<div class="exp-inspect"><div class="exp-inspect-heading"><h4>${esc(record.trend)}</h4><button type="button" class="exp-pin" data-pin="${record.ti}" ${pins.includes(record.id)?'disabled':''}>${pins.includes(record.id)?'Added to workbench':'Add to workbench'}</button></div><p>${esc(record.group)} / ${esc(record.branch)} / ${esc(record.technology)} / <strong>${esc(record.trend)}</strong></p><small>This is a relationship in the export, not an impact forecast or investment recommendation.</small></div>`:`<div class="exp-invitation"><span class="exp-line"></span><p>Select a future trend to inspect its full lineage and add it to your workbench.</p></div>`}
    <p class="exp-boundary">The export describes a taxonomy. It does not establish timing, commercial readiness, or links from these trends to customers.</p>
   </section>
   <aside class="exp-bench" aria-label="Opportunity Workbench"><div class="exp-bench-head"><h3>Opportunity Workbench</h3><span>${pins.length} saved</span></div><label for="exp-thesis">What opportunity are you investigating?</label><textarea id="exp-thesis" rows="3" placeholder="Write a question or working hypothesis…">${esc(thesis)}</textarea><small class="exp-hypothesis">Your hypothesis · not a source finding</small>
    <ol class="exp-pins">${pins.map((id,index)=>{const r=records.find(x=>x.id===id);return `<li><button class="exp-revisit" type="button" data-revisit="${index}" title="Revisit this trend">${esc(r.trend)}</button><p>${esc(r.branch)}<br><span>${esc(r.technology)}</span></p><div class="exp-pin-actions"><button type="button" data-move="${index}:-1" aria-label="Move ${esc(r.trend)} up" ${index===0?'disabled':''}>Move up</button><button type="button" data-move="${index}:1" aria-label="Move ${esc(r.trend)} down" ${index===pins.length-1?'disabled':''}>Move down</button><button type="button" data-remove="${index}" aria-label="Remove ${esc(r.trend)}">Remove</button></div></li>`;}).join('')}</ol>
    ${pins.length?'':`<div class="exp-empty"><h4>Your next opportunity starts with a question.</h4><p>Choose a trend and add it here. Collect ideas across branches to build a research shortlist.</p></div>`}
    <button type="button" class="exp-export" ${!pins.length&&!thesis.trim()?'disabled':''}>Export workbench</button><p class="exp-save">${saved?'Saved in this browser':'Browser storage unavailable. Export to keep your work.'}</p>
   </aside>
  </div><div class="exp-status" role="status" aria-live="polite"></div>`;
  if(focus)host.querySelector(focus)?.focus({preventScroll:true});
 }
 host.addEventListener('input',e=>{if(e.target.id==='exp-thesis'){thesis=e.target.value;persist();host.querySelector('.exp-export').disabled=!pins.length&&!thesis.trim();}});
 host.addEventListener('click',e=>{
  const button=e.target.closest('button');if(!button||button.disabled)return;
  if(button.dataset.branch){[gi,bi]=button.dataset.branch.split(':').map(Number);selected=null;render('.exp-anchor');}
  else if(button.dataset.trend!==undefined){selected=records.find(r=>r.gi===gi&&r.bi===bi&&r.ti===Number(button.dataset.trend)).id;render(`[data-trend="${button.dataset.trend}"]`);}
  else if(button.dataset.pin!==undefined){if(selected&&!pins.includes(selected)){
   const origin=host.querySelector('.exp-path.selected strong').getBoundingClientRect();
   const label=records.find(r=>r.id===selected).trend;
   pins.push(selected);persist();render(`[data-trend="${button.dataset.pin}"]`);
   const target=host.querySelector('.exp-pins li:last-child');target.classList.add('exp-arrived');
   const receipt=document.createElement('button');receipt.type='button';receipt.className='exp-receipt';receipt.textContent='Added to workbench · View idea';receipt.addEventListener('click',()=>{target.scrollIntoView({behavior:'instant',block:'nearest'});target.querySelector('button').focus({preventScroll:true});});host.querySelector('.exp-inspect').append(receipt);
   const destination=target.getBoundingClientRect();
   const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||host.getRootNode().host.dataset.motion==='off';
   if(!reduced&&destination.top>=0&&destination.bottom<=innerHeight&&origin.top>=0){
    const flight=document.createElement('div');flight.className='exp-transfer';flight.setAttribute('aria-hidden','true');flight.textContent=label;
    flight.style.left=origin.left+'px';flight.style.top=origin.top+'px';flight.style.width=Math.min(240,Math.max(150,origin.width))+'px';
    flight.style.setProperty('--flight-x',(destination.left-origin.left)+'px');flight.style.setProperty('--flight-y',(destination.top-origin.top)+'px');
    host.append(flight);flight.addEventListener('animationend',()=>flight.remove(),{once:true});setTimeout(()=>flight.remove(),800);
   }
   announce(label+' added to your workbench.');
  }}
  else if(button.dataset.remove!==undefined){const index=Number(button.dataset.remove);pins.splice(index,1);persist();render(pins.length?`[data-revisit="${Math.min(index,pins.length-1)}"]`:'#exp-thesis');announce('Removed from your workbench.');}
  else if(button.dataset.move){const [i,d]=button.dataset.move.split(':').map(Number);[pins[i],pins[i+d]]=[pins[i+d],pins[i]];persist();render(`[data-revisit="${i+d}"]`);announce('Workbench order updated.');}
  else if(button.dataset.revisit!==undefined){const r=records.find(r=>r.id===pins[Number(button.dataset.revisit)]);gi=r.gi;bi=r.bi;selected=r.id;render('.exp-anchor');}
  else if(button.classList.contains('exp-export')){
   const lines=[`# ${core.name} — Opportunity Workbench`,'','## Working hypothesis (user authored)',thesis||'Not specified','','## Research shortlist',...pins.flatMap((id,i)=>{const r=records.find(r=>r.id===id);return [`${i+1}. ${r.trend}`,`   Lineage: ${r.group} > ${r.branch} > ${r.technology} > ${r.trend}`,''];}),'Source: data/data1.json, responses.yc_circle_segments.response.data.','Taxonomy relationships do not establish timing, commercial readiness, causality, or customer relevance.'];
   const url=URL.createObjectURL(new Blob([lines.join('\n')],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='ev-opportunity-workbench.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);announce('Workbench exported.');
  }
 });
 render();
}
