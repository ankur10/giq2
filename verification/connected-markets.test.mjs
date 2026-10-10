import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('../connected-markets.js',import.meta.url),'utf8');
const {atlasModel}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const data=JSON.parse(fs.readFileSync(new URL('../data/data1.json',import.meta.url),'utf8'));
test('preserves every source taxonomy relationship and customer market link',()=>{
 const model=atlasModel(data);
 const circles=data.responses.yc_circle_segments.response.data;
 for(const trend of circles.outer_circle_segments){
  const branch=model.G.find(g=>g.name===trend.hot_bet).bets.find(b=>b.name===trend.next_hot_bet);
  assert.ok(branch.items.some(([technology,name])=>technology===trend.disruptive_technology&&name===trend.name));
 }
 for(const group of data.responses.connected_graph.response.data.customers){
  for(const company of group.companies){
   const mapped=model.CO.find(c=>c.raw===company.name);
   assert.deepEqual(mapped.m.map(i=>model.MK[i].id),company.revenueSources.map(m=>m.id));
   for(const market of company.revenueSources){
    const mappedMarket=model.MK.find(m=>m.id===market.id);
    assert.equal(mappedMarket.size,Number(market.size.replace(/[^0-9.]/g,'')));
    assert.equal(mappedMarket.cagr,parseFloat(market.cagr));
   }
  }
 }
 assert.equal(model.CORE.node,910.2);
 assert.equal(model.CORE.v25,698.63);
 assert.equal(model.CORE.v35,1189.59);
});
test('rejects an incompatible export instead of drawing misleading geometry',()=>{
 const invalid=structuredClone(data);
 invalid.responses.yc_circle_segments.response.data.inner_circle_segments.pop();
 assert.throws(()=>atlasModel(invalid),/does not match/);
});
const {zoomCamera,clampCamera}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
test('zoom preserves the focal point and reset restores negative-origin chart bounds',()=>{
 const base=[-560,-560,1120,1120],anchor={x:120,y:80};
 const zoomed=zoomCamera(base,base,2,anchor);
 assert.equal((anchor.x-zoomed[0])/zoomed[2],(anchor.x-base[0])/base[2]);
 assert.equal((anchor.y-zoomed[1])/zoomed[3],(anchor.y-base[1])/base[3]);
 assert.deepEqual(zoomCamera(base,zoomed,1,anchor),base);
 assert.deepEqual(clampCamera(base,[900,-900,560,560]),[0,-560,560,560]);
});
