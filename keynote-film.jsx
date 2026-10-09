import React,{useEffect,useMemo,useRef} from 'react';
import {Canvas,useFrame,useLoader,useThree} from '@react-three/fiber';
import * as THREE from 'three';

const ease=t=>t*t*(3-2*t);
const clamp=v=>Math.max(0,Math.min(1,v));
function sample(keys,t){let i=0;while(i<keys.length-2&&t>keys[i+1][0])i++;const a=keys[i],b=keys[i+1],k=ease(clamp((t-a[0])/(b[0]-a[0])));return a.slice(1).map((v,j)=>THREE.MathUtils.lerp(v,b[j+1],k))}
function Scene({clock,playing,seek,tick,ready}){
 const {camera,invalidate,gl,size}=useThree();
 const maps=useLoader(THREE.TextureLoader,['./assets/keynote/briefing.jpg','./assets/keynote/question.jpg']);
 const first=useRef(),second=useRef(),firstMat=useRef(),secondMat=useRef(),trail=useRef();
 const look=useRef(new THREE.Vector3());
 const line=useMemo(()=>new THREE.BufferGeometry().setFromPoints(new THREE.CatmullRomCurve3([new THREE.Vector3(-3.87,-1.87,.1),new THREE.Vector3(1,2,3),new THREE.Vector3(10,1,2),new THREE.Vector3(19.08,-.09,.2)]).getPoints(120)),[]);
 useEffect(()=>{maps.forEach(t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(8,gl.capabilities.getMaxAnisotropy())});ready();return()=>line.dispose()},[]);
 useEffect(()=>{invalidate()},[playing,seek,size.width,size.height]);
 useFrame((_,delta)=>{
   const c=clock.current;if(c.playing&&!document.hidden)c.time=Math.min(22,c.time+Math.min(delta,.05));
   const t=c.time;
   const aspect=size.width/size.height,extra=Math.max(1,1.65/aspect);
   const cp=sample([[0,5.5,3,23],[3,1.1,.7,16.7],[7,-1.5,.9,15.5],[12,1.4,.4,16.3],[15,3,1,18],[19,18.8,.8,17],[22,18,.2,15.5]],t);
   const target=sample([[0,0,0,0],[3,0,0,0],[7,-1.4,-.2,0],[12,1,0,0],[15,4,0,0],[19,18,0,0],[22,18,0,0]],t);
   camera.position.set(cp[0],cp[1],cp[2]*extra);look.current.set(...target);camera.lookAt(look.current);
   const r=sample([[0,-.06,-.18,.025],[3,0,-.035,0],[7,.045,.17,-.035],[12,-.025,-.11,.02],[16,0,.18,0],[22,0,.18,0]],t);
   first.current.rotation.set(...r);
   firstMat.current.opacity=sample([[0,1],[3,1],[5,.4],[12,.24],[15,.26],[19,.15],[22,.15]],t)[0];
   second.current.rotation.y=sample([[0,-.2],[16,-.2],[19,.025],[22,0]],t)[0];
   secondMat.current.opacity=sample([[0,.6],[15,.6],[18,1],[19,1],[20,.27],[22,.27]],t)[0];
   line.setDrawRange(0,Math.round(121*clamp((t-14.5)/3)));
   trail.current.material.opacity=Math.sin(clamp((t-14.5)/5)*Math.PI)*.7;
   first.current.updateMatrixWorld();
   const source=new THREE.Vector3(-3.875,-1.868,.03).applyMatrix4(first.current.matrixWorld).project(camera);
   const anchor={x:(source.x*.5+.5)*size.width,y:(-source.y*.5+.5)*size.height};
   tick(t,anchor,size);
   if(c.playing&&t<22)invalidate();
 });
 return <><color attach="background" args={['#051c2c']}/><group ref={first}><mesh><planeGeometry args={[16,10]}/><meshBasicMaterial ref={firstMat} map={maps[0]} transparent toneMapped={false}/></mesh><mesh position={[0,-.06,-.075]}><boxGeometry args={[16.04,10.04,.12]}/><meshBasicMaterial color="#263e4e"/></mesh></group><group ref={second} position={[18,0,0]}><mesh><planeGeometry args={[16,10]}/><meshBasicMaterial ref={secondMat} map={maps[1]} transparent toneMapped={false}/></mesh><mesh position={[0,-.06,-.075]}><boxGeometry args={[16.04,10.04,.12]}/><meshBasicMaterial color="#263e4e"/></mesh></group><line ref={trail} geometry={line}><lineBasicMaterial color="#91b9fa" transparent opacity={0}/></line></>;
}
export default function Film(props){return <Canvas aria-hidden="true" frameloop="demand" dpr={[1,1.75]} gl={{alpha:false,antialias:true,powerPreference:'high-performance'}} camera={{position:[5.5,3,23],fov:42,near:.1,far:100}}><Scene {...props}/></Canvas>}
