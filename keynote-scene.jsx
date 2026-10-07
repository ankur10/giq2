import React,{useEffect,useMemo,useRef} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import * as THREE from 'three';

const named = [[0,0,0],[-4.5,2.8,-.5],[-1.3,3.9,.5],[4.4,2.6,-.8],[5,-2.5,.1],[-4.4,-2.8,-.5],[3.8,.9,.6],[1.1,-2.4,.4]];
const route = [2,6,7,0];
const clamp=(x)=>Math.max(0,Math.min(1,x));
function makeGraph(){
  const points=named.map(p=>new THREE.Vector3(...p));
  for(let i=0;i<62;i++){
    const a=i*2.39996323,r=2.8+Math.sqrt(i/62)*5.1;
    points.push(new THREE.Vector3(Math.cos(a)*r,Math.sin(a)*r*.72,Math.sin(i*3.7)*1.6-1));
  }
  const edges=[];
  for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){
    const d=points[i].distanceTo(points[j]);
    if(d<2.25&&d>.45)edges.push([i,j]);
  }
  [[0,7],[7,6],[6,2],[2,1],[0,3],[0,4],[0,5]].forEach(e=>edges.push(e));
  return {points,edges};
}
function World({step,still,selected,labels,chainLabels,onReady}){
  const {camera,size,invalidate,gl}=useThree();
  const graph=useMemo(makeGraph,[]);
  const nodeMesh=useRef(),mainMesh=useRef(),edgeMesh=useRef(),pathMesh=useRef(),ring=useRef();
  const progress=useRef(step),selection=useRef(selected),rendered=useRef(false);
  const current=useMemo(()=>graph.points.map(()=>new THREE.Vector3()),[graph]);
  const temp=useMemo(()=>new THREE.Object3D(),[]);
  const color=useMemo(()=>new THREE.Color(),[]);
  const projected=useMemo(()=>new THREE.Vector3(),[]);
  const edgePositions=useMemo(()=>new Float32Array(graph.edges.length*6),[graph]);
  const pathPositions=useMemo(()=>new Float32Array(18),[]);
  const edgeGeometry=useMemo(()=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(edgePositions,3));return g},[edgePositions]);
  const pathGeometry=useMemo(()=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pathPositions,3));return g},[pathPositions]);
  useEffect(()=>()=>{edgeGeometry.dispose();pathGeometry.dispose()},[edgeGeometry,pathGeometry]);
  useEffect(()=>{invalidate()},[step,selected,still,size.width,size.height,invalidate]);
  useEffect(()=>{
    const el=gl.domElement;
    const lost=e=>{e.preventDefault();onReady(false)};
    el.addEventListener('webglcontextlost',lost);
    return()=>el.removeEventListener('webglcontextlost',lost);
  },[gl,onReady]);
  useFrame((_,delta)=>{
    const alpha=still?1:1-Math.exp(-Math.min(delta,.06)*5);
    progress.current=THREE.MathUtils.lerp(progress.current,step,alpha);
    selection.current=selected;
    const p=progress.current,expand=clamp(p-1),path=clamp(p-2);
    const zoom=THREE.MathUtils.lerp(18,23,expand);
    camera.position.set(0,0,Math.max(zoom,zoom/(size.width/size.height)*1.1));camera.lookAt(0,0,0);camera.updateProjectionMatrix();
    const worldWidth=2*camera.position.z*Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*(size.width/size.height);
    for(let i=0;i<graph.points.length;i++){
      const pt=graph.points[i],chainIndex=route.indexOf(i),q=current[i];
      const start=i===0?pt:pt.clone().multiplyScalar(.48);
      q.copy(start).lerp(pt,expand);
      if(chainIndex>=0)q.lerp(new THREE.Vector3((-.36+chainIndex*.24)*worldWidth,0,0),path);
      else q.z-=path*2;
      const show=i===0?1:((i<4? .5: .11)*(1-expand)+expand)*(chainIndex<0?1-path*.96:1);
      const sizeBase=i===0?.34:i<8?.105:.045;
      temp.position.copy(q);temp.scale.setScalar(sizeBase*show);temp.updateMatrix();
      nodeMesh.current.setMatrixAt(i,temp.matrix);
      color.set(i===0?'#172844':chainIndex>=0||i===selected?'#bf5c19':i<8?'#667284':'#aeb0a8');
      nodeMesh.current.setColorAt(i,color);
      if(i<8&&labels.current[i]){
        projected.copy(q).project(camera);
        const el=labels.current[i],visible=step!==3&&(i===0||step===2);
        el.style.transform=`translate(-50%, -50%) translate(${(projected.x*.5+.5)*size.width}px,${(-projected.y*.5+.5)*size.height+(i===0?0:29)}px)`;
        el.style.opacity=visible?'1':'0';el.style.visibility=visible?'visible':'hidden';
      }
      if(chainIndex>=0&&chainLabels.current[chainIndex]){
        projected.copy(q).project(camera);
        chainLabels.current[chainIndex].style.transform=`translate(-50%, -50%) translate(${(projected.x*.5+.5)*size.width}px,${(-projected.y*.5+.5)*size.height+48}px)`;
      }
    }
    nodeMesh.current.instanceMatrix.needsUpdate=true;if(nodeMesh.current.instanceColor)nodeMesh.current.instanceColor.needsUpdate=true;
    graph.edges.forEach(([a,b],i)=>{current[a].toArray(edgePositions,i*6);current[b].toArray(edgePositions,i*6+3)});
    edgeGeometry.attributes.position.needsUpdate=true;edgeGeometry.computeBoundingSphere();
    edgeMesh.current.material.opacity=(.08+.28*expand)*(1-path*.93);
    for(let i=0;i<3;i++){current[route[i]].toArray(pathPositions,i*6);current[route[i+1]].toArray(pathPositions,i*6+3)}
    pathGeometry.attributes.position.needsUpdate=true;pathGeometry.computeBoundingSphere();pathMesh.current.material.opacity=expand*.88;
    ring.current.position.copy(current[0]);ring.current.scale.setScalar(1+expand*.3);ring.current.material.opacity=.25;
    mainMesh.current.position.copy(current[selected>=0?selected:0]);mainMesh.current.scale.setScalar(selected>0?.2:0);
    if(!rendered.current){rendered.current=true;onReady(true)}
    if(Math.abs(p-step)>.001)invalidate();
  });
  return <>
    <instancedMesh ref={nodeMesh} args={[null,null,graph.points.length]} frustumCulled={false}><sphereGeometry args={[1,16,12]}/><meshBasicMaterial/></instancedMesh>
    <lineSegments ref={edgeMesh} geometry={edgeGeometry}><lineBasicMaterial color="#6c7380" transparent opacity={.1}/></lineSegments>
    <lineSegments ref={pathMesh} geometry={pathGeometry}><lineBasicMaterial color="#bd5918" transparent opacity={0}/></lineSegments>
    <mesh ref={ring}><ringGeometry args={[.78,.79,96]}/><meshBasicMaterial color="#172844" transparent opacity={.25} side={THREE.DoubleSide}/></mesh>
    <mesh ref={mainMesh}><ringGeometry args={[1.2,1.3,48]}/><meshBasicMaterial color="#bd5918" side={THREE.DoubleSide}/></mesh>
  </>;
}
export default function KeynoteScene(props){
  return <Canvas camera={{position:[0,0,20],fov:38,near:.1,far:100}} frameloop="demand" dpr={[1,1.5]} gl={{alpha:true,antialias:true,powerPreference:'low-power'}} fallback={<span className="kn-render-fallback">Connected market view</span>}><World {...props}/></Canvas>;
}
