import React, {useEffect,useMemo,useRef,useState} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import * as THREE from 'three';

function paperTexture(title,lines,dark,active) {
  const c=document.createElement('canvas');c.width=640;c.height=800;
  const x=c.getContext('2d');
  x.fillStyle=dark?'#122b42':'#ffffff';x.fillRect(0,0,640,800);
  x.fillStyle=active?(dark?'#83c3ff':'#2459ce'):(dark?'#a4bdd3':'#526476');
  x.fillRect(46,48,42,6);
  x.font='500 36px "Source Sans 3", sans-serif';
  const wrap=(text,start,size,color)=>{x.fillStyle=color;x.font=`500 ${size}px "Source Sans 3", sans-serif`;let y=start,line='';for(const word of text.split(' ')){if(x.measureText(line+word).width>540&&line){x.fillText(line,46,y);y+=size*1.25;line='';}line+=word+' ';}x.fillText(line,46,y);return y+size*1.25;};
  let y=wrap(title,125,44,dark?'#f2f7fc':'#122236')+45;
  for(const line of lines.slice(0,4)){x.strokeStyle=dark?'#36526c':'#d9e1eb';x.beginPath();x.moveTo(46,y-22);x.lineTo(594,y-22);x.stroke();y=wrap(line,y+14,26,dark?'#b7ccdf':'#526476')+39;}
  x.fillStyle=dark?'#9fbbd3':'#65778b';x.font='500 21px "Source Sans 3", sans-serif';x.fillText('GrowthIQ / Intelligence Studio',46,758);
  const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;return texture;
}
function Paper({title,lines,position,rotation,active,dark,onSelect,reduced,index}) {
  const ref=useRef(),initial=useRef({position:reduced?position:[position[0]*.65,position[1]-.15,position[2]-.85],rotation:reduced?rotation:[rotation[0],rotation[1]+.15,rotation[2]]}),{invalidate}=useThree();
  const texture=useMemo(()=>paperTexture(title,lines,dark,active),[title,lines.join('|'),dark,active]);
  useEffect(()=>()=>texture.dispose(),[texture]);
  const target=useMemo(()=>new THREE.Vector3(...position),position);
  useEffect(()=>{invalidate()},[position.join(','),rotation.join(','),active,reduced]);
  useFrame((_,delta)=>{const g=ref.current;if(!g)return;const speed=reduced?1:1-Math.exp(-Math.min(delta,.06)*7);g.position.lerp(target,speed);g.rotation.x=THREE.MathUtils.lerp(g.rotation.x,rotation[0],speed);g.rotation.y=THREE.MathUtils.lerp(g.rotation.y,rotation[1],speed);g.rotation.z=THREE.MathUtils.lerp(g.rotation.z,rotation[2],speed);if(g.position.distanceTo(target)>.001||Math.abs(g.rotation.y-rotation[1])>.001||Math.abs(g.rotation.z-rotation[2])>.001)invalidate();});
  return <group ref={ref} position={initial.current.position} rotation={initial.current.rotation} onClick={e=>{e.stopPropagation();onSelect()}}>
    {[2,1].map(i=><mesh key={i} position={[i*.035,-i*.035,-i*.065]}><boxGeometry args={[1.66,2.08,.03]}/><meshStandardMaterial color={dark?'#203c57':'#dce5f0'} roughness={.6}/></mesh>)}
    <mesh><boxGeometry args={[1.66,2.08,.05]}/><meshStandardMaterial color={dark?'#244561':'#e8edf5'} roughness={.45}/></mesh>
    <mesh position={[0,0,.03]}><planeGeometry args={[1.64,2.06]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>
    <mesh position={[0,-1.07,.025]}><boxGeometry args={[1.62,.018,.08]}/><meshBasicMaterial color={active?(dark?'#83c3ff':'#2459ce'):(dark?'#3b5872':'#c1ccda')}/></mesh>
  </group>;
}
function LinkLine({end,active,dark}){
 const geo=useMemo(()=>new THREE.BufferGeometry().setFromPoints(new THREE.CatmullRomCurve3([new THREE.Vector3(0,-2.25,-.6),new THREE.Vector3(end[0]*.2,-1.7,-.9),new THREE.Vector3(end[0],end[1]-.6,end[2]-.3)]).getPoints(40)),[end.join(',')]);
 useEffect(()=>()=>geo.dispose(),[geo]);
 return <line geometry={geo}><lineBasicMaterial color={active?(dark?'#7bbaff':'#2459ce'):(dark?'#385773':'#bdcbdc')} transparent opacity={active?.9:.5}/></line>;
}
function FitCamera({dark}){const {camera,size,invalidate}=useThree();useEffect(()=>{camera.position.z=Math.max(dark?6.8:7.4,7.2/(2*Math.tan(43*Math.PI/360)*(size.width/size.height)));camera.updateProjectionMatrix();invalidate()},[camera,size.width,size.height,dark]);return null}
function World({items,selected,onSelect,dark,reduced,phase,pointer}){
 const {invalidate}=useThree();const group=useRef();
 useEffect(()=>{invalidate()},[pointer.x,pointer.y,reduced,phase]);
 useFrame((_,dt)=>{const r=group.current;if(!r)return;const y=reduced?0:pointer.x*.1,x=reduced?0:pointer.y*.06;const k=reduced?1:1-Math.exp(-Math.min(dt,.06)*5);r.rotation.y=THREE.MathUtils.lerp(r.rotation.y,y,k);r.rotation.x=THREE.MathUtils.lerp(r.rotation.x,x,k);if(Math.abs(r.rotation.y-y)>.001||Math.abs(r.rotation.x-x)>.001)invalidate()});
 const count=items.length;
 return <group ref={group}>
 <ambientLight intensity={1.6}/><directionalLight position={[4,6,8]} intensity={3}/><pointLight position={[-5,1,4]} intensity={dark?12:4} color={dark?'#438cff':'#c5dcff'}/>
 {items.map((item,i)=>{const active=item.id===selected;const offset=i-(count-1)/2;let position,rotation;
 if(dark){position=[offset*(active?.56:1.03),active?.28:-Math.abs(offset)*.12,active?1.35:-Math.abs(offset)*.35];rotation=[-.10,offset*-.17,offset*-.06];}
 else{const a=(i/(Math.max(count-1,1)))*Math.PI;position=[Math.cos(a)*2.5,Math.sin(a)*1.5-.25,active?.65:-.35];rotation=[-.12,-position[0]*.12,-position[0]*.045];}
 return <React.Fragment key={item.id}>{!dark&&<LinkLine end={position} active={active} dark={dark}/>}<Paper title={item.title} lines={item.lines} position={position} rotation={rotation} active={active} dark={dark} onSelect={()=>onSelect(item.id)} reduced={reduced} index={i}/></React.Fragment>})}
 {!dark&&<mesh position={[0,-2.23,-.6]} rotation={[0,0,Math.PI/4]}><boxGeometry args={[.24,.24,.1]}/><meshStandardMaterial color="#2459ce" metalness={.25} roughness={.3}/></mesh>}
 </group>;
}
class SceneBoundary extends React.Component{constructor(props){super(props);this.state={failed:false}}static getDerivedStateFromError(){return{failed:true}}render(){return this.state.failed?this.props.fallback:this.props.children}}
export default function StudioScene({items,selected,onSelect,dark=false,reduced=false,phase=0}){
 const [pointer,setPointer]=useState({x:0,y:0});const [available]=useState(()=>{try{const c=document.createElement('canvas');const gl=c.getContext('webgl2');if(!gl)return false;gl.getExtension('WEBGL_lose_context')?.loseContext();return true}catch{return false}});
 const fallback=<div className="sv-scene-fallback"><svg viewBox="0 0 640 360" aria-hidden="true"><path d="M320 320Q320 160 90 80M320 320Q320 160 205 80M320 320V80M320 320Q320 160 435 80M320 320Q320 160 550 80" fill="none" stroke="currentColor"/>{[65,180,295,410,525].map(x=><rect key={x} x={x} y="65" width="50" height="72" rx="3" fill="none" stroke="currentColor"/>)}</svg><p>Explore the objectives with the controls below.</p></div>;
 return <div className={'sv-scene '+(dark?'sv-scene-dark':'')} onPointerMove={e=>{if(reduced)return;const b=e.currentTarget.getBoundingClientRect();setPointer({x:(e.clientX-b.left)/b.width-.5,y:(e.clientY-b.top)/b.height-.5})}} onPointerLeave={()=>setPointer({x:0,y:0})} aria-hidden="true">
 {available?<SceneBoundary fallback={fallback}><Canvas frameloop="demand" dpr={[1,1.5]} camera={{position:[0,.1,dark?8.7:9.7],fov:43}} gl={{antialias:true,alpha:true,powerPreference:'low-power'}} fallback={fallback}><FitCamera dark={dark}/><World items={items} selected={selected} onSelect={onSelect} dark={dark} reduced={reduced} phase={phase} pointer={pointer}/></Canvas></SceneBoundary>:fallback}
 </div>;
}
