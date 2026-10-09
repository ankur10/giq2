import{A as D,D as ee,E as te,F as ge,G as Ae,I as Pe,J as xe,L as C,M as qe,N as Re,Q as fe,V as Je,X as Ie,Z as f,a as Z,b as Ze,c as ne,ca as Nt,d as oe,da as De,e as U,ea as _e,g as je,ga as $e,h as Te,i as Y,j,k as F,l as le,m as Ee,n as ye,o as Ce,p as H,q as ue,r as w,s as me,t as $,v as x,x as Me,y as ce,z as Be}from"./chunk-HFLJD3YM.js";import{c as Xe,d as Ot}from"./chunk-O7P6DOQA.js";var A=Xe(Ot(),1);var _=Xe(Nt(),1);var Ht=(()=>{let e=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),t=new Float32Array([0,0,2,0,0,2]),r=new Pe;return r.setAttribute("position",new Ae(e,3)),r.setAttribute("uv",new Ae(t,2)),r})(),M=class Le{static get fullscreenGeometry(){return Ht}constructor(t="Pass",r=new Re,a=new Ie){this.name=t,this.renderer=null,this.scene=r,this.camera=a,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(t){if(this.rtt===t){let r=this.fullscreenMaterial;r!==null&&(r.needsUpdate=!0),this.rtt=!t}}set mainScene(t){}set mainCamera(t){}setRenderer(t){this.renderer=t}isEnabled(){return this.enabled}setEnabled(t){this.enabled=t}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(t){let r=this.screen;r!==null?r.material=t:(r=new xe(Le.fullscreenGeometry,t),r.frustumCulled=!1,this.scene===null&&(this.scene=new Re),this.scene.add(r),this.screen=r)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(t){this.fullscreenMaterial=t}getDepthTexture(){return null}setDepthTexture(t,r=H){}render(t,r,a,i,s){throw new Error("Render method not implemented!")}setSize(t,r){}initialize(t,r,a){}dispose(){for(let t of Object.keys(this)){let r=this[t];(r instanceof D||r instanceof ge||r instanceof ce||r instanceof Le)&&this[t].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},zt=class extends M{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(e,t,r,a,i){let s=e.state.buffers.stencil;s.setLocked(!1),s.setTest(!1)}},Gt=`#ifdef COLOR_WRITE
#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#endif
#ifdef DEPTH_WRITE
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
#ifdef USE_WEIGHTS
uniform vec4 channelWeights;
#endif
uniform float opacity;varying vec2 vUv;void main(){
#ifdef COLOR_WRITE
vec4 texel=texture2D(inputBuffer,vUv);
#ifdef USE_WEIGHTS
texel*=channelWeights;
#endif
gl_FragColor=opacity*texel;
#ifdef COLOR_SPACE_CONVERSION
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
#else
gl_FragColor=vec4(0.0);
#endif
#ifdef DEPTH_WRITE
gl_FragDepth=readDepth(vUv);
#endif
}`,at="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",it=class extends C{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new f(null),depthBuffer:new f(null),channelWeights:new f(null),opacity:new f(1)},blending:U,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Gt,vertexShader:at}),this.depthFunc=je}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(e){let t=e!==null;this.colorWrite!==t&&(t?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=t,this.needsUpdate=!0),this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){let t=e!==null;this.depthWrite!==t&&(t?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=t,this.depthWrite=t,this.needsUpdate=!0),this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return this.defines.COLOR_SPACE_CONVERSION!==void 0}set colorSpaceConversion(e){this.colorSpaceConversion!==e&&(e?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(e){e!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=e):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(e){this.uniforms.inputBuffer.value=e}getOpacity(e){return this.uniforms.opacity.value}setOpacity(e){this.uniforms.opacity.value=e}},Oe=class extends M{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new it,this.needsSwap=!1,this.renderTarget=e,e===void 0&&(this.renderTarget=new D(1,1,{minFilter:j,magFilter:j,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,r,a,i){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,r){r!==void 0&&(this.renderTarget.texture.type=r,r!==F?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":e!==null&&e.outputColorSpace===w&&(this.renderTarget.texture.colorSpace=w))}},et=new te,st=class extends M{constructor(e=!0,t=!0,r=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=e,this.depth=t,this.stencil=r,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(e,t,r){this.color=e,this.depth=t,this.stencil=r}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(e){this.overrideClearColor=e}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(e){this.overrideClearAlpha=e}render(e,t,r,a,i){let s=this.overrideClearColor,n=this.overrideClearAlpha,o=e.getClearAlpha(),l=s!==null,c=n>=0;l?(e.getClearColor(et),e.setClearColor(s,c?n:o)):c&&e.setClearAlpha(n),e.setRenderTarget(this.renderToScreen?null:t),e.clear(this.color,this.depth,this.stencil),l?e.setClearColor(et,o):c&&e.setClearAlpha(o)}},kt=class extends M{constructor(e,t){super("MaskPass",e,t),this.needsSwap=!1,this.clearPass=new st(!1,!1,!0),this.inverse=!1}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get inverted(){return this.inverse}set inverted(e){this.inverse=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(e){this.inverted=e}render(e,t,r,a,i){let s=e.getContext(),n=e.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,h=this.inverted?0:1,u=1-h;n.color.setMask(!1),n.depth.setMask(!1),n.color.setLocked(!0),n.depth.setLocked(!0),n.stencil.setTest(!0),n.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),n.stencil.setFunc(s.ALWAYS,h,4294967295),n.stencil.setClear(u),n.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(e,null):(c.render(e,t),c.render(e,r))),this.renderToScreen?(e.setRenderTarget(null),e.render(o,l)):(e.setRenderTarget(t),e.render(o,l),e.setRenderTarget(r),e.render(o,l)),n.color.setLocked(!1),n.depth.setLocked(!1),n.stencil.setLocked(!1),n.stencil.setFunc(s.EQUAL,1,4294967295),n.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),n.stencil.setLocked(!0)}};function Qt(e,t){let r=e.getContext();if(t<=0||typeof r.renderbufferStorageMultisample!="function")return 0;let a=r.getParameter(r.MAX_SAMPLES),i=Math.min(t,a);if(i<=0)return 0;let s=r.getParameter(r.RENDERBUFFER_BINDING),n=r.createRenderbuffer();try{return r.bindRenderbuffer(r.RENDERBUFFER,n),r.renderbufferStorageMultisample(r.RENDERBUFFER,i,r.RGBA8,1,1),i}catch{return 0}finally{r.bindRenderbuffer(r.RENDERBUFFER,s),r.deleteRenderbuffer(n)}}var be=1/1e3,Vt=1e3,Wt=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(e){typeof document<"u"&&document.hidden!==void 0&&(e?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=e)}get delta(){return this._delta*be}get fixedDelta(){return this._fixedDelta*be}set fixedDelta(e){this._fixedDelta=e*Vt}get elapsed(){return this._elapsed*be}update(e){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(e!==void 0?e:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(e){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},nt=class{constructor(e=null,{depthBuffer:t=!0,stencilBuffer:r=!1,multisampling:a=0,frameBufferType:i=F}={}){this.renderer=null,this.inputBuffer=this.createBuffer(t,r,i,a),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new Oe,this.depthRenderTarget=null,this.passes=[],this.timer=new Wt,this.autoRenderToScreen=!0,this.setRenderer(e)}get stableDepthTexture(){return this.depthRenderTarget===null?null:this.depthRenderTarget.depthTexture}get multisampling(){return this.inputBuffer.samples}set multisampling(e){let t=this.renderer===null?e:Qt(this.renderer,e);this.multisampling!==t&&(this.inputBuffer.samples=t,this.outputBuffer.samples=t,this.inputBuffer.dispose(),this.outputBuffer.dispose())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(e){if(this.renderer=e,e!==null){let t=e.getSize(new x),r=e.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;a===F&&e.outputColorSpace===w&&(this.inputBuffer.texture.colorSpace=w,this.outputBuffer.texture.colorSpace=w,this.inputBuffer.dispose(),this.outputBuffer.dispose());let i=this.multisampling;this.multisampling=i,e.autoClear=!1,this.setSize(t.width,t.height);for(let s of this.passes)s.initialize(e,r,a)}}replaceRenderer(e,t=!0){let r=this.renderer,a=r.domElement.parentNode;return this.setRenderer(e),t&&a!==null&&(a.removeChild(r.domElement),a.appendChild(e.domElement)),r}createDepthTexture(){let e=new fe;e.name="EffectComposer.InputDepth",this.inputBuffer.stencilBuffer?(e.format=Ce,e.type=ye):e.type=le;let t=new fe;t.format=e.format,t.type=e.type,t.name="EffectComposer.OutputDepth";let r=new fe;r.format=e.format,r.type=e.type,r.name="EffectComposer.StableDepth",this.inputBuffer.depthTexture=e,this.outputBuffer.depthTexture=t,this.inputBuffer.dispose(),this.outputBuffer.dispose();let{width:a,height:i}=this.inputBuffer;this.depthRenderTarget=new D(a,i,{depthBuffer:!0,stencilBuffer:this.inputBuffer.stencilBuffer,depthTexture:r})}blitDepthBuffer(e){let t=this.renderer,r=this.depthRenderTarget,a=t.properties,i=t.getContext();t.setRenderTarget(r);let s=a.get(e).__webglFramebuffer,n=a.get(r).__webglFramebuffer,o=e.stencilBuffer?i.DEPTH_BUFFER_BIT|i.STENCIL_BUFFER_BIT:i.DEPTH_BUFFER_BIT;i.bindFramebuffer(i.READ_FRAMEBUFFER,s),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,n),i.blitFramebuffer(0,0,e.width,e.height,0,0,r.width,r.height,o,i.NEAREST),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),t.setRenderTarget(null)}deleteDepthTexture(){let e=this.stableDepthTexture;for(let t of this.passes)t.getDepthTexture()===e&&t.setDepthTexture(null);this.depthRenderTarget!==null&&(this.depthRenderTarget.dispose(),this.depthRenderTarget=null),this.inputBuffer.depthTexture!==null&&(this.inputBuffer.depthTexture.dispose(),this.inputBuffer.depthTexture=null),this.outputBuffer.depthTexture!==null&&(this.outputBuffer.depthTexture.dispose(),this.outputBuffer.depthTexture=null)}createBuffer(e,t,r,a){let i=this.renderer,s=i===null?new x:i.getDrawingBufferSize(new x),n=new D(s.width,s.height,{minFilter:j,magFilter:j,samples:a,stencilBuffer:t,depthBuffer:e,type:r});return r===F&&i!==null&&i.outputColorSpace===w&&(n.texture.colorSpace=w),n.texture.name="EffectComposer.Buffer",n.texture.generateMipmaps=!1,n}setMainScene(e){for(let t of this.passes)t.mainScene=e}setMainCamera(e){for(let t of this.passes)t.mainCamera=e}addPass(e,t){let r=this.passes,a=this.renderer,i=a.getDrawingBufferSize(new x),s=a.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;if(e.renderer=a,e.setSize(i.width,i.height),e.initialize(a,s,n),this.autoRenderToScreen&&(r.length>0&&(r[r.length-1].renderToScreen=!1),e.renderToScreen&&(this.autoRenderToScreen=!1)),t!==void 0?r.splice(t,0,e):r.push(e),this.autoRenderToScreen&&(r[r.length-1].renderToScreen=!0),e.needsDepthTexture||this.depthRenderTarget!==null)if(this.depthRenderTarget===null){this.createDepthTexture();for(let o of r)o.setDepthTexture(this.stableDepthTexture)}else e.setDepthTexture(this.stableDepthTexture)}removePass(e){let t=this.passes,r=t.indexOf(e);if(r!==-1&&t.splice(r,1).length>0){let s=this.stableDepthTexture;if(s!==null){let n=(l,c)=>l||c.needsDepthTexture;t.reduce(n,!1)||(e.getDepthTexture()===s&&e.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&r===t.length&&(e.renderToScreen=!1,t.length>0&&(t[t.length-1].renderToScreen=!0))}}removeAllPasses(){let e=this.passes;this.deleteDepthTexture(),e.length>0&&(this.autoRenderToScreen&&(e[e.length-1].renderToScreen=!1),this.passes=[])}render(e){let t=this.renderer,r=this.copyPass,a=this.inputBuffer,i=this.outputBuffer,s,n=!1;e===void 0&&(this.timer.update(),e=this.timer.getDelta());for(let o of this.passes)if(o.enabled){if(o.render(t,a,i,e,n),o.needsDepthBlit&&this.depthRenderTarget!==null&&this.blitDepthBuffer(a),o.needsSwap){if(n){r.renderToScreen=o.renderToScreen;let l=t.getContext(),c=t.state.buffers.stencil;c.setFunc(l.NOTEQUAL,1,4294967295),r.render(t,a,i,e,n),c.setFunc(l.EQUAL,1,4294967295)}s=a,a=i,i=s}o instanceof kt?n=!0:o instanceof zt&&(n=!1)}}setSize(e,t,r){let a=this.renderer,i=a.getSize(new x);(e===void 0||t===void 0)&&(e=i.width,t=i.height),(i.width!==e||i.height!==t)&&a.setSize(e,t,r);let s=a.getDrawingBufferSize(new x);this.inputBuffer.setSize(s.width,s.height),this.outputBuffer.setSize(s.width,s.height),this.depthRenderTarget!==null&&this.depthRenderTarget.setSize(s.width,s.height);for(let n of this.passes)n.setSize(s.width,s.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(let e of this.passes)e.dispose();this.deleteDepthTexture(),this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.copyPass.dispose(),this.timer.dispose(),this.passes=[],M.fullscreenGeometry.dispose()}},J={NONE:0,DEPTH:1,CONVOLUTION:2},m={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},Yt=class{constructor(){this.shaderParts=new Map([[m.FRAGMENT_HEAD,null],[m.FRAGMENT_MAIN_UV,null],[m.FRAGMENT_MAIN_IMAGE,null],[m.VERTEX_HEAD,null],[m.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=J.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=me}};var Ue=!1,tt=class{constructor(e=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(e),this.meshCount=0,this.replaceMaterial=t=>{if(t.isMesh){let r;if(t.material.flatShading)switch(t.material.side){case oe:r=this.materialsFlatShadedDoubleSide;break;case ne:r=this.materialsFlatShadedBackSide;break;default:r=this.materialsFlatShaded;break}else switch(t.material.side){case oe:r=this.materialsDoubleSide;break;case ne:r=this.materialsBackSide;break;default:r=this.materials;break}this.originalMaterials.set(t,t.material),t.isSkinnedMesh?t.material=r[2]:t.isInstancedMesh?t.material=r[1]:t.material=r[0],++this.meshCount}}}cloneMaterial(e){if(!(e instanceof C))return e.clone();let t=e.uniforms,r=new Map;for(let i in t){let s=t[i].value;s.isRenderTargetTexture&&(t[i].value=null,r.set(i,s))}let a=e.clone();for(let i of r)t[i[0]].value=i[1],a.uniforms[i[0]].value=i[1];return a}setMaterial(e){if(this.disposeMaterials(),this.material=e,e!==null){let t=this.materials=[this.cloneMaterial(e),this.cloneMaterial(e),this.cloneMaterial(e)];for(let r of t)r.uniforms=Object.assign({},e.uniforms),r.side=Ze;t[2].skinning=!0,this.materialsBackSide=t.map(r=>{let a=this.cloneMaterial(r);return a.uniforms=Object.assign({},e.uniforms),a.side=ne,a}),this.materialsDoubleSide=t.map(r=>{let a=this.cloneMaterial(r);return a.uniforms=Object.assign({},e.uniforms),a.side=oe,a}),this.materialsFlatShaded=t.map(r=>{let a=this.cloneMaterial(r);return a.uniforms=Object.assign({},e.uniforms),a.flatShading=!0,a}),this.materialsFlatShadedBackSide=t.map(r=>{let a=this.cloneMaterial(r);return a.uniforms=Object.assign({},e.uniforms),a.flatShading=!0,a.side=ne,a}),this.materialsFlatShadedDoubleSide=t.map(r=>{let a=this.cloneMaterial(r);return a.uniforms=Object.assign({},e.uniforms),a.flatShading=!0,a.side=oe,a})}}render(e,t,r){let a=e.shadowMap.enabled;if(e.shadowMap.enabled=!1,Ue){let i=this.originalMaterials;this.meshCount=0,t.traverse(this.replaceMaterial),e.render(t,r);for(let s of i)s[0].material=s[1];this.meshCount!==i.size&&i.clear()}else{let i=t.overrideMaterial;t.overrideMaterial=this.material,e.render(t,r),t.overrideMaterial=i}e.shadowMap.enabled=a}disposeMaterials(){if(this.material!==null){let e=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(let t of e)t.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return Ue}static set workaroundEnabled(e){Ue=e}};var K=-1,I=class extends ${constructor(e=null,t=K,r=K,a=1){super(),e!==null&&this.addEventListener("change",()=>e.setSize(this.baseSize.width,this.baseSize.height)),this.baseSize=new x(1,1),this.preferredSize=new x(t,r),this.target=this.preferredSize,this.s=a,this.effectiveSize=new x,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){let e=this.baseSize,t=this.preferredSize,r=this.effectiveSize,a=this.scale;t.width!==K?r.width=t.width:t.height!==K?r.width=Math.round(t.height*(e.width/Math.max(e.height,1))):r.width=Math.round(e.width*a),t.height!==K?r.height=t.height:t.width!==K?r.height=Math.round(t.width/Math.max(e.width/Math.max(e.height,1),1)):r.height=Math.round(e.height*a)}get width(){return this.effectiveSize.width}set width(e){this.preferredWidth=e}get height(){return this.effectiveSize.height}set height(e){this.preferredHeight=e}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(e){this.s!==e&&(this.s=e,this.preferredSize.setScalar(K),this.dispatchEvent({type:"change"}))}getScale(){return this.scale}setScale(e){this.scale=e}get baseWidth(){return this.baseSize.width}set baseWidth(e){this.baseSize.width!==e&&(this.baseSize.width=e,this.dispatchEvent({type:"change"}))}getBaseWidth(){return this.baseWidth}setBaseWidth(e){this.baseWidth=e}get baseHeight(){return this.baseSize.height}set baseHeight(e){this.baseSize.height!==e&&(this.baseSize.height=e,this.dispatchEvent({type:"change"}))}getBaseHeight(){return this.baseHeight}setBaseHeight(e){this.baseHeight=e}setBaseSize(e,t){(this.baseSize.width!==e||this.baseSize.height!==t)&&(this.baseSize.set(e,t),this.dispatchEvent({type:"change"}))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(e){this.preferredSize.width!==e&&(this.preferredSize.width=e,this.dispatchEvent({type:"change"}))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(e){this.preferredWidth=e}get preferredHeight(){return this.preferredSize.height}set preferredHeight(e){this.preferredSize.height!==e&&(this.preferredSize.height=e,this.dispatchEvent({type:"change"}))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(e){this.preferredHeight=e}setPreferredSize(e,t){(this.preferredSize.width!==e||this.preferredSize.height!==t)&&(this.preferredSize.set(e,t),this.dispatchEvent({type:"change"}))}copy(e){this.s=e.scale,this.baseSize.set(e.baseWidth,e.baseHeight),this.preferredSize.set(e.preferredWidth,e.preferredHeight),this.dispatchEvent({type:"change"})}static get AUTO_SIZE(){return K}};var d={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},Kt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Xt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",Zt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",jt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",qt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Jt="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",_t="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",$t="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",er="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",tr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",rr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ar="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ir="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",sr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",nr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",or="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",lr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ur="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",cr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",fr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",hr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",dr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",pr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",vr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",mr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",gr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ar="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",xr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Dr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",wr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",Sr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Tr="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Er=new Map([[d.ADD,Kt],[d.ALPHA,Xt],[d.AVERAGE,Zt],[d.COLOR,jt],[d.COLOR_BURN,qt],[d.COLOR_DODGE,Jt],[d.DARKEN,_t],[d.DIFFERENCE,$t],[d.DIVIDE,er],[d.DST,null],[d.EXCLUSION,tr],[d.HARD_LIGHT,rr],[d.HARD_MIX,ar],[d.HUE,ir],[d.INVERT,sr],[d.INVERT_RGB,nr],[d.LIGHTEN,or],[d.LINEAR_BURN,lr],[d.LINEAR_DODGE,ur],[d.LINEAR_LIGHT,cr],[d.LUMINOSITY,fr],[d.MULTIPLY,hr],[d.NEGATION,dr],[d.NORMAL,pr],[d.OVERLAY,vr],[d.PIN_LIGHT,mr],[d.REFLECT,gr],[d.SATURATION,Ar],[d.SCREEN,xr],[d.SOFT_LIGHT,Dr],[d.SRC,wr],[d.SUBTRACT,Sr],[d.VIVID_LIGHT,Tr]]),yr=class extends ${constructor(e,t=1){super(),this._blendFunction=e,this.opacity=new f(t)}getOpacity(){return this.opacity.value}setOpacity(e){this.opacity.value=e}get blendFunction(){return this._blendFunction}set blendFunction(e){this._blendFunction=e,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(e){this.blendFunction=e}getShaderCode(){return Er.get(this.blendFunction)}};var re=class extends ${constructor(e,t,{attributes:r=J.NONE,blendFunction:a=d.NORMAL,defines:i=new Map,uniforms:s=new Map,extensions:n=null,vertexShader:o=null}={}){super(),this.name=e,this.renderer=null,this.attributes=r,this.fragmentShader=t,this.vertexShader=o,this.defines=i,this.uniforms=s,this.extensions=n,this.blendMode=new yr(a),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=me,this._outputColorSpace=ue}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(e){this._inputColorSpace=e,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e,this.setChanged()}set mainScene(e){}set mainCamera(e){}getName(){return this.name}setRenderer(e){this.renderer=e}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(e){this.attributes=e,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(e){this.fragmentShader=e,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(e){this.vertexShader=e,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(e,t=H){}update(e,t,r){}setSize(e,t){}initialize(e,t,r){}dispose(){for(let e of Object.keys(this)){let t=this[e];(t instanceof D||t instanceof ge||t instanceof ce||t instanceof M)&&this[e].dispose()}}};var Ne={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},Cr=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,Mr="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",Br=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],Pr=class extends C{constructor(e=new Be){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new f(null),texelSize:new f(new Be),scale:new f(1),kernel:new f(0)},blending:U,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Cr,vertexShader:Mr}),this.setTexelSize(e.x,e.y),this.kernelSize=Ne.MEDIUM}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.inputBuffer=e}get kernelSequence(){return Br[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(e){this.uniforms.scale.value=e}getScale(){return this.uniforms.scale.value}setScale(e){this.uniforms.scale.value=e}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(e){this.uniforms.kernel.value=e}setKernel(e){this.kernel=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t,e*.5,t*.5)}setSize(e,t){let r=1/e,a=1/t;this.uniforms.texelSize.value.set(r,a,r*.5,a*.5)}},Rr=class extends M{constructor({kernelSize:e=Ne.MEDIUM,resolutionScale:t=.5,width:r=I.AUTO_SIZE,height:a=I.AUTO_SIZE,resolutionX:i=r,resolutionY:s=a}={}){super("KawaseBlurPass"),this.renderTargetA=new D(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";let n=this.resolution=new I(this,i,s,t);n.addEventListener("change",o=>this.setSize(n.baseWidth,n.baseHeight)),this._blurMaterial=new Pr,this._blurMaterial.kernelSize=e,this.copyMaterial=new it}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(e){this._blurMaterial=e}get dithering(){return this.copyMaterial.dithering}set dithering(e){this.copyMaterial.dithering=e}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(e){this.blurMaterial.kernelSize=e}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get scale(){return this.blurMaterial.scale}set scale(e){this.blurMaterial.scale=e}getScale(){return this.blurMaterial.scale}setScale(e){this.blurMaterial.scale=e}getKernelSize(){return this.kernelSize}setKernelSize(e){this.kernelSize=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,r,a,i){let s=this.scene,n=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,h=c.kernelSequence,u=t;this.fullscreenMaterial=c;for(let p=0,S=h.length;p<S;++p){let G=(p&1)===0?o:l;c.kernel=h[p],c.inputBuffer=u.texture,e.setRenderTarget(G),e.render(s,n),u=G}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=u.texture,e.setRenderTarget(this.renderToScreen?null:r),e.render(s,n)}setSize(e,t){let r=this.resolution;r.setBaseSize(e,t);let a=r.width,i=r.height;this.renderTargetA.setSize(a,i),this.renderTargetB.setSize(a,i),this.blurMaterial.setSize(e,t)}initialize(e,t,r){r!==void 0&&(this.renderTargetA.texture.type=r,this.renderTargetB.texture.type=r,r!==F?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):e!==null&&e.outputColorSpace===w&&(this.renderTargetA.texture.colorSpace=w,this.renderTargetB.texture.colorSpace=w))}static get AUTO_SIZE(){return I.AUTO_SIZE}},Ir=`#include <common>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);float mask=1.0;
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);mask=low*high;
#elif defined(THRESHOLD)
mask=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=texel*mask;
#else
gl_FragColor=vec4(l*mask);
#endif
}`,br=class extends C{constructor(e=!1,t=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:"180".replace(/\D+/g,"")},uniforms:{inputBuffer:new f(null),threshold:new f(0),smoothing:new f(1),range:new f(null)},blending:U,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Ir,vertexShader:at}),this.colorOutput=e,this.luminanceRange=t}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get threshold(){return this.uniforms.threshold.value}set threshold(e){this.smoothing>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=e}getThreshold(){return this.threshold}setThreshold(e){this.threshold=e}get smoothing(){return this.uniforms.smoothing.value}set smoothing(e){this.threshold>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=e}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(e){this.smoothing=e}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(e){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(e){e?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(e){return this.colorOutput}setColorOutputEnabled(e){this.colorOutput=e}get useRange(){return this.luminanceRange!==null}set useRange(e){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(e){e!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=e,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(e){this.luminanceRange=e}},Ur=class extends M{constructor({renderTarget:e,luminanceRange:t,colorOutput:r,resolutionScale:a=1,width:i=I.AUTO_SIZE,height:s=I.AUTO_SIZE,resolutionX:n=i,resolutionY:o=s}={}){super("LuminancePass"),this.fullscreenMaterial=new br(r,t),this.needsSwap=!1,this.renderTarget=e,this.renderTarget===void 0&&(this.renderTarget=new D(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");let l=this.resolution=new I(this,n,o,a);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(e,t,r,a,i){let s=this.fullscreenMaterial;s.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){let r=this.resolution;r.setBaseSize(e,t),this.renderTarget.setSize(r.width,r.height)}initialize(e,t,r){r!==void 0&&r!==F&&(this.renderTarget.texture.type=r,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},Fr=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.05556
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,Lr="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",Or=class extends C{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new f(null),texelSize:new f(new x)},blending:U,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Fr,vertexShader:Lr})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},Nr=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,Hr="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",zr=class extends C{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new f(null),supportBuffer:new f(null),texelSize:new f(new x),radius:new f(.85)},blending:U,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Nr,vertexShader:Hr})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}set supportBuffer(e){this.uniforms.supportBuffer.value=e}get radius(){return this.uniforms.radius.value}set radius(e){this.uniforms.radius.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},Gr=class extends M{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new D(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new Or,this.upsamplingMaterial=new zr,this.resolution=new x}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(e){if(this.levels!==e){let t=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let r=0;r<e;++r){let a=t.clone();a.texture.name="Downsampling.Mipmap"+r,this.downsamplingMipmaps.push(a)}this.upsamplingMipmaps.push(t);for(let r=1,a=e-1;r<a;++r){let i=t.clone();i.texture.name="Upsampling.Mipmap"+r,this.upsamplingMipmaps.push(i)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(e){this.upsamplingMaterial.radius=e}render(e,t,r,a,i){let{scene:s,camera:n}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:h}=this,u=t;this.fullscreenMaterial=o;for(let p=0,S=c.length;p<S;++p){let G=c[p];o.setSize(u.width,u.height),o.inputBuffer=u.texture,e.setRenderTarget(G),e.render(s,n),u=G}this.fullscreenMaterial=l;for(let p=h.length-1;p>=0;--p){let S=h[p];l.setSize(u.width,u.height),l.inputBuffer=u.texture,l.supportBuffer=c[p].texture,e.setRenderTarget(S),e.render(s,n),u=S}}setSize(e,t){let r=this.resolution;r.set(e,t);let a=r.width,i=r.height;for(let s=0,n=this.downsamplingMipmaps.length;s<n;++s)a=Math.round(a*.5),i=Math.round(i*.5),this.downsamplingMipmaps[s].setSize(a,i),s<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[s].setSize(a,i)}initialize(e,t,r){if(r!==void 0){let a=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(let i of a)i.texture.type=r;if(r!==F)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(e!==null&&e.outputColorSpace===w)for(let i of a)i.texture.colorSpace=w}}dispose(){super.dispose();for(let e of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))e.dispose()}},kr=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,ot=class extends re{constructor({blendFunction:e=d.SCREEN,luminanceThreshold:t=1,luminanceSmoothing:r=.03,mipmapBlur:a=!0,intensity:i=1,radius:s=.85,levels:n=8,kernelSize:o=Ne.LARGE,resolutionScale:l=.5,width:c=I.AUTO_SIZE,height:h=I.AUTO_SIZE,resolutionX:u=c,resolutionY:p=h}={}){super("BloomEffect",kr,{blendFunction:e,uniforms:new Map([["map",new f(null)],["intensity",new f(i)]])}),this.renderTarget=new D(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new Rr({kernelSize:o}),this.luminancePass=new Ur({colorOutput:!0}),this.luminanceMaterial.threshold=t,this.luminanceMaterial.smoothing=r,this.mipmapBlurPass=new Gr,this.mipmapBlurPass.enabled=a,this.mipmapBlurPass.radius=s,this.mipmapBlurPass.levels=n,this.uniforms.get("map").value=a?this.mipmapBlurPass.texture:this.renderTarget.texture;let S=this.resolution=new I(this,u,p,l);S.addEventListener("change",G=>this.setSize(S.baseWidth,S.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get dithering(){return this.blurPass.dithering}set dithering(e){this.blurPass.dithering=e}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(e){this.blurPass.kernelSize=e}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(e){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(e){this.uniforms.get("intensity").value=e}getIntensity(){return this.intensity}setIntensity(e){this.intensity=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}update(e,t,r){let a=this.renderTarget,i=this.luminancePass;i.enabled?(i.render(e,t),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,i.renderTarget):this.blurPass.render(e,i.renderTarget,a)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,t):this.blurPass.render(e,t,a)}setSize(e,t){let r=this.resolution;r.setBaseSize(e,t),this.renderTarget.setSize(r.width,r.height),this.blurPass.resolution.copy(r),this.luminancePass.setSize(e,t),this.mipmapBlurPass.setSize(e,t)}initialize(e,t,r){this.blurPass.initialize(e,t,r),this.luminancePass.initialize(e,t,r),this.mipmapBlurPass.initialize(e,t,r),r!==void 0&&(this.renderTarget.texture.type=r,e!==null&&e.outputColorSpace===w&&(this.renderTarget.texture.colorSpace=w))}};var He=class extends M{constructor(e,t,r=null){super("RenderPass",e,t),this.needsSwap=!1,this.needsDepthBlit=!0,this.clearPass=new st,this.overrideMaterialManager=r===null?null:new tt(r),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get renderToScreen(){return super.renderToScreen}set renderToScreen(e){super.renderToScreen=e,this.clearPass.renderToScreen=e}get overrideMaterial(){let e=this.overrideMaterialManager;return e!==null?e.material:null}set overrideMaterial(e){let t=this.overrideMaterialManager;e!==null?t!==null?t.setMaterial(e):this.overrideMaterialManager=new tt(e):t!==null&&(t.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(e){this.overrideMaterial=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getSelection(){return this.selection}setSelection(e){this.selection=e}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(e){this.ignoreBackground=e}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(e){this.skipShadowMapUpdate=e}getClearPass(){return this.clearPass}render(e,t,r,a,i){let s=this.scene,n=this.camera,o=this.selection,l=n.layers.mask,c=s.background,h=e.shadowMap.autoUpdate,u=this.renderToScreen?null:t;o!==null&&n.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(e.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(s.background=null),this.clearPass.enabled&&this.clearPass.render(e,t),e.setRenderTarget(u),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(e,s,n):e.render(s,n),n.layers.mask=l,s.background=c,e.shadowMap.autoUpdate=h}};var he={DEFAULT:0,ESKIL:1};var ii=Math.PI*.5;var Qr=`#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
#ifdef DOWNSAMPLE_NORMALS
uniform lowp sampler2D normalBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}int findBestDepth(const in float samples[4]){float c=(samples[0]+samples[1]+samples[2]+samples[3])*0.25;float distances[4];distances[0]=abs(c-samples[0]);distances[1]=abs(c-samples[1]);distances[2]=abs(c-samples[2]);distances[3]=abs(c-samples[3]);float maxDistance=max(max(distances[0],distances[1]),max(distances[2],distances[3]));int remaining[3];int rejected[3];int i,j,k;for(i=0,j=0,k=0;i<4;++i){if(distances[i]<maxDistance){remaining[j++]=i;}else{rejected[k++]=i;}}for(;j<3;++j){remaining[j]=rejected[--k];}vec3 s=vec3(samples[remaining[0]],samples[remaining[1]],samples[remaining[2]]);c=(s.x+s.y+s.z)/3.0;distances[0]=abs(c-s.x);distances[1]=abs(c-s.y);distances[2]=abs(c-s.z);float minDistance=min(distances[0],min(distances[1],distances[2]));for(i=0;i<3;++i){if(distances[i]==minDistance){break;}}return remaining[i];}void main(){float d[4];d[0]=readDepth(vUv0);d[1]=readDepth(vUv1);d[2]=readDepth(vUv2);d[3]=readDepth(vUv3);int index=findBestDepth(d);
#ifdef DOWNSAMPLE_NORMALS
vec3 n[4];n[0]=texture2D(normalBuffer,vUv0).rgb;n[1]=texture2D(normalBuffer,vUv1).rgb;n[2]=texture2D(normalBuffer,vUv2).rgb;n[3]=texture2D(normalBuffer,vUv3).rgb;
#else
vec3 n[4];n[0]=vec3(0.0);n[1]=vec3(0.0);n[2]=vec3(0.0);n[3]=vec3(0.0);
#endif
gl_FragColor=vec4(n[index],d[index]);}`,Vr="uniform vec2 texelSize;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vUv0=uv;vUv1=vec2(uv.x,uv.y+texelSize.y);vUv2=vec2(uv.x+texelSize.x,uv.y);vUv3=uv+texelSize;gl_Position=vec4(position.xy,1.0,1.0);}",Wr=class extends C{constructor(){super({name:"DepthDownsamplingMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new f(null),normalBuffer:new f(null),texelSize:new f(new x)},blending:U,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Qr,vertexShader:Vr})}set depthBuffer(e){this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=H){this.depthBuffer=e,this.depthPacking=t}set normalBuffer(e){this.uniforms.normalBuffer.value=e,e!==null?this.defines.DOWNSAMPLE_NORMALS="1":delete this.defines.DOWNSAMPLE_NORMALS,this.needsUpdate=!0}setNormalBuffer(e){this.normalBuffer=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t)}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},lt=class extends M{constructor({normalBuffer:e=null,resolutionScale:t=.5,width:r=I.AUTO_SIZE,height:a=I.AUTO_SIZE,resolutionX:i=r,resolutionY:s=a}={}){super("DepthDownsamplingPass");let n=new Wr;n.normalBuffer=e,this.fullscreenMaterial=n,this.needsDepthTexture=!0,this.needsSwap=!1,this.renderTarget=new D(1,1,{minFilter:Y,magFilter:Y,depthBuffer:!1,type:le}),this.renderTarget.texture.name="DepthDownsamplingPass.Target",this.renderTarget.texture.generateMipmaps=!1;let o=this.resolution=new I(this,i,s,t);o.addEventListener("change",l=>this.setSize(o.baseWidth,o.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}setDepthTexture(e,t=H){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t}render(e,t,r,a,i){e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){let r=this.resolution;r.setBaseSize(e,t),this.renderTarget.setSize(r.width,r.height),this.fullscreenMaterial.setSize(e,t)}initialize(e,t,r){let a=e.getContext();if(!(a.getExtension("EXT_color_buffer_float")||a.getExtension("EXT_color_buffer_half_float")))throw new Error("Rendering to float texture is not supported.")}};var Yr=`uniform float offset;uniform float darkness;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){const vec2 center=vec2(0.5);vec3 color=inputColor.rgb;
#if VIGNETTE_TECHNIQUE == 0
float d=distance(uv,center);color*=smoothstep(0.8,offset*0.799,d*(darkness+offset));
#else
vec2 coord=(uv-center)*vec2(offset);color=mix(color,vec3(1.0-darkness),dot(coord,coord));
#endif
outputColor=vec4(color,inputColor.a);}`,ut=class extends re{constructor({blendFunction:e,eskil:t=!1,technique:r=t?he.ESKIL:he.DEFAULT,offset:a=.5,darkness:i=.5}={}){super("VignetteEffect",Yr,{blendFunction:e,defines:new Map([["VIGNETTE_TECHNIQUE",r.toFixed(0)]]),uniforms:new Map([["offset",new f(a)],["darkness",new f(i)]])})}get technique(){return Number(this.defines.get("VIGNETTE_TECHNIQUE"))}set technique(e){this.technique!==e&&(this.defines.set("VIGNETTE_TECHNIQUE",e.toFixed(0)),this.setChanged())}get eskil(){return this.technique===he.ESKIL}set eskil(e){this.technique=e?he.ESKIL:he.DEFAULT}getTechnique(){return this.technique}setTechnique(e){this.technique=e}get offset(){return this.uniforms.get("offset").value}set offset(e){this.uniforms.get("offset").value=e}getOffset(){return this.offset}setOffset(e){this.offset=e}get darkness(){return this.uniforms.get("darkness").value}set darkness(e){this.uniforms.get("darkness").value=e}getDarkness(){return this.darkness}setDarkness(e){this.darkness=e}};var Kr=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,Xr="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",Zr=class extends C{constructor(e,t,r,a,i=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:"180".replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new f(null),depthBuffer:new f(null),resolution:new f(new x),texelSize:new f(new x),cameraNear:new f(.3),cameraFar:new f(1e3),aspect:new f(1),time:new f(0)},blending:U,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:i}),e&&this.setShaderParts(e),t&&this.setDefines(t),r&&this.setUniforms(r),this.copyCameraSettings(a)}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){this.uniforms.depthBuffer.value=e}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=H){this.depthBuffer=e,this.depthPacking=t}setShaderData(e){this.setShaderParts(e.shaderParts),this.setDefines(e.defines),this.setUniforms(e.uniforms),this.setExtensions(e.extensions)}setShaderParts(e){return this.fragmentShader=Kr.replace(m.FRAGMENT_HEAD,e.get(m.FRAGMENT_HEAD)||"").replace(m.FRAGMENT_MAIN_UV,e.get(m.FRAGMENT_MAIN_UV)||"").replace(m.FRAGMENT_MAIN_IMAGE,e.get(m.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=Xr.replace(m.VERTEX_HEAD,e.get(m.VERTEX_HEAD)||"").replace(m.VERTEX_MAIN_SUPPORT,e.get(m.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(e){for(let t of e.entries())this.defines[t[0]]=t[1];return this.needsUpdate=!0,this}setUniforms(e){for(let t of e.entries())this.uniforms[t[0]]=t[1];return this}setExtensions(e){this.extensions={};for(let t of e)this.extensions[t]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(e){this.encodeOutput!==e&&(e?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(e){return this.encodeOutput}setOutputEncodingEnabled(e){this.encodeOutput=e}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}setDeltaTime(e){this.uniforms.time.value+=e}adoptCameraSettings(e){this.copyCameraSettings(e)}copyCameraSettings(e){e&&(this.uniforms.cameraNear.value=e.near,this.uniforms.cameraFar.value=e.far,e instanceof qe?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(e,t){let r=this.uniforms;r.resolution.value.set(e,t),r.texelSize.value.set(1/e,1/t),r.aspect.value=e/t}static get Section(){return m}};var ui=Number("180".replace(/\D+/g,"")),q=255/256,ci=new Float32Array([q/256**3,q/256**2,q/256,q]),fi=new Float32Array([q,q/256,q/256**2,1/256**3]);function rt(e,t,r){for(let a of t){let i="$1"+e+a.charAt(0).toUpperCase()+a.slice(1),s=new RegExp("([^\\.])(\\b"+a+"\\b)","g");for(let n of r.entries())n[1]!==null&&r.set(n[0],n[1].replace(s,i))}}function jr(e,t,r){let a=t.getFragmentShader(),i=t.getVertexShader(),s=a!==void 0&&/mainImage/.test(a),n=a!==void 0&&/mainUv/.test(a);if(r.attributes|=t.getAttributes(),a===void 0)throw new Error(`Missing fragment shader (${t.name})`);if(n&&(r.attributes&J.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${t.name})`);if(!s&&!n)throw new Error(`Could not find mainImage or mainUv function (${t.name})`);{let o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=r.shaderParts,c=l.get(m.FRAGMENT_HEAD)||"",h=l.get(m.FRAGMENT_MAIN_UV)||"",u=l.get(m.FRAGMENT_MAIN_IMAGE)||"",p=l.get(m.VERTEX_HEAD)||"",S=l.get(m.VERTEX_MAIN_SUPPORT)||"",G=new Set,L=new Set;if(n&&(h+=`	${e}MainUv(UV);
`,r.uvTransformation=!0),i!==null&&/mainSupport/.test(i)){let E=/mainSupport *\([\w\s]*?uv\s*?\)/.test(i);S+=`	${e}MainSupport(`,S+=E?`vUv);
`:`);
`;for(let b of i.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(let W of b[1].split(/\s*,\s*/))r.varyings.add(W),G.add(W),L.add(W);for(let b of i.matchAll(o))L.add(b[1])}for(let E of a.matchAll(o))L.add(E[1]);for(let E of t.defines.keys())L.add(E.replace(/\([\w\s,]*\)/g,""));for(let E of t.uniforms.keys())L.add(E);L.delete("while"),L.delete("for"),L.delete("if"),t.uniforms.forEach((E,b)=>r.uniforms.set(e+b.charAt(0).toUpperCase()+b.slice(1),E)),t.defines.forEach((E,b)=>r.defines.set(e+b.charAt(0).toUpperCase()+b.slice(1),E));let se=new Map([["fragment",a],["vertex",i]]);rt(e,L,r.defines),rt(e,L,se),a=se.get("fragment"),i=se.get("vertex");let T=t.blendMode;if(r.blendModes.set(T.blendFunction,T),s){t.inputColorSpace!==null&&t.inputColorSpace!==r.colorSpace&&(u+=t.inputColorSpace===w?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),t.outputColorSpace!==ue?r.colorSpace=t.outputColorSpace:t.inputColorSpace!==null&&(r.colorSpace=t.inputColorSpace);let E=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;u+=`${e}MainImage(color0, UV, `,(r.attributes&J.DEPTH)!==0&&E.test(a)&&(u+="depth, ",r.readDepth=!0),u+=`color1);
	`;let b=e+"BlendOpacity";r.uniforms.set(b,T.opacity),u+=`color0 = blend${T.blendFunction}(color0, color1, ${b});

	`,c+=`uniform float ${b};

`}if(c+=a+`
`,i!==null&&(p+=i+`
`),l.set(m.FRAGMENT_HEAD,c),l.set(m.FRAGMENT_MAIN_UV,h),l.set(m.FRAGMENT_MAIN_IMAGE,u),l.set(m.VERTEX_HEAD,p),l.set(m.VERTEX_MAIN_SUPPORT,S),t.extensions!==null)for(let E of t.extensions)r.extensions.add(E)}}var ze=class extends M{constructor(e,...t){super("EffectPass"),this.fullscreenMaterial=new Zr(null,null,null,e),this.listener=r=>this.handleEvent(r),this.effects=[],this.setEffects(t),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(e){for(let t of this.effects)t.mainScene=e}set mainCamera(e){this.fullscreenMaterial.copyCameraSettings(e);for(let t of this.effects)t.mainCamera=e}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(e){this.fullscreenMaterial.encodeOutput=e}get dithering(){return this.fullscreenMaterial.dithering}set dithering(e){let t=this.fullscreenMaterial;t.dithering=e,t.needsUpdate=!0}setEffects(e){for(let t of this.effects)t.removeEventListener("change",this.listener);this.effects=e.sort((t,r)=>r.attributes-t.attributes);for(let t of this.effects)t.addEventListener("change",this.listener)}updateMaterial(){let e=new Yt,t=0;for(let n of this.effects)if(n.blendMode.blendFunction===d.DST)e.attributes|=n.getAttributes()&J.DEPTH;else{if((e.attributes&n.getAttributes()&J.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${n.name})`);jr("e"+t++,n,e)}let r=e.shaderParts.get(m.FRAGMENT_HEAD),a=e.shaderParts.get(m.FRAGMENT_MAIN_IMAGE),i=e.shaderParts.get(m.FRAGMENT_MAIN_UV),s=/\bblend\b/g;for(let n of e.blendModes.values())r+=n.getShaderCode().replace(s,`blend${n.blendFunction}`)+`
`;(e.attributes&J.DEPTH)!==0?(e.readDepth&&(a=`float depth = readDepth(UV);

	`+a),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,e.colorSpace===w&&(a+=`color0 = sRGBToLinear(color0);
	`),e.uvTransformation?(i=`vec2 transformedUv = vUv;
`+i,e.defines.set("UV","transformedUv")):e.defines.set("UV","vUv"),e.shaderParts.set(m.FRAGMENT_HEAD,r),e.shaderParts.set(m.FRAGMENT_MAIN_IMAGE,a),e.shaderParts.set(m.FRAGMENT_MAIN_UV,i);for(let[n,o]of e.shaderParts)o!==null&&e.shaderParts.set(n,o.trim().replace(/^#/,`
#`));this.skipRendering=t===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(e)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(e,t=H){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t;for(let r of this.effects)r.setDepthTexture(e,t)}render(e,t,r,a,i){for(let s of this.effects)s.update(e,t,a);if(!this.skipRendering||this.renderToScreen){let s=this.fullscreenMaterial;s.inputBuffer=t.texture,s.time+=a*this.timeScale,e.setRenderTarget(this.renderToScreen?null:r),e.render(this.scene,this.camera)}}setSize(e,t){this.fullscreenMaterial.setSize(e,t);for(let r of this.effects)r.setSize(e,t)}initialize(e,t,r){this.renderer=e;for(let a of this.effects)a.initialize(e,t,r);this.updateMaterial(),r!==void 0&&r!==F&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(let e of this.effects)e.removeEventListener("change",this.listener),e.dispose()}handleEvent(e){switch(e.type){case"change":this.recompile();break}}};var ct=class extends M{constructor(e,t,{renderTarget:r,resolutionScale:a=1,width:i=I.AUTO_SIZE,height:s=I.AUTO_SIZE,resolutionX:n=i,resolutionY:o=s}={}){super("NormalPass"),this.needsSwap=!1,this.renderPass=new He(e,t,new Je);let l=this.renderPass;l.ignoreBackground=!0,l.skipShadowMapUpdate=!0;let c=l.getClearPass();c.overrideClearColor=new te(7829503),c.overrideClearAlpha=1,this.renderTarget=r,this.renderTarget===void 0&&(this.renderTarget=new D(1,1,{minFilter:Y,magFilter:Y}),this.renderTarget.texture.name="NormalPass.Target");let h=this.resolution=new I(this,n,o,a);h.addEventListener("change",u=>this.setSize(h.baseWidth,h.baseHeight))}set mainScene(e){this.renderPass.mainScene=e}set mainCamera(e){this.renderPass.mainCamera=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,r,a,i){let s=this.renderToScreen?null:this.renderTarget;this.renderPass.render(e,s,s)}setSize(e,t){let r=this.resolution;r.setBaseSize(e,t),this.renderTarget.setSize(r.width,r.height)}},pi=[new Float32Array(3),new Float32Array(3)],vi=[new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3)],mi=[[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1])]];var gi=[new Float32Array(2),new Float32Array(2)];var Ai=new Float32Array([0,-.25,.25,-.125,.125,-.375,.375]),xi=[new Float32Array([0,0]),new Float32Array([.25,-.25]),new Float32Array([-.25,.25]),new Float32Array([.125,-.125]),new Float32Array([-.125,.125])],Di=[new Uint8Array([0,0]),new Uint8Array([3,0]),new Uint8Array([0,3]),new Uint8Array([3,3]),new Uint8Array([1,0]),new Uint8Array([4,0]),new Uint8Array([1,3]),new Uint8Array([4,3]),new Uint8Array([0,1]),new Uint8Array([3,1]),new Uint8Array([0,4]),new Uint8Array([3,4]),new Uint8Array([1,1]),new Uint8Array([4,1]),new Uint8Array([1,4]),new Uint8Array([4,4])],wi=[new Uint8Array([0,0]),new Uint8Array([1,0]),new Uint8Array([0,2]),new Uint8Array([1,2]),new Uint8Array([2,0]),new Uint8Array([3,0]),new Uint8Array([2,2]),new Uint8Array([3,2]),new Uint8Array([0,1]),new Uint8Array([1,1]),new Uint8Array([0,3]),new Uint8Array([1,3]),new Uint8Array([2,1]),new Uint8Array([3,1]),new Uint8Array([2,3]),new Uint8Array([3,3])];var Si=new Map([[R(0,0,0,0),new Float32Array([0,0,0,0])],[R(0,0,0,1),new Float32Array([0,0,0,1])],[R(0,0,1,0),new Float32Array([0,0,1,0])],[R(0,0,1,1),new Float32Array([0,0,1,1])],[R(0,1,0,0),new Float32Array([0,1,0,0])],[R(0,1,0,1),new Float32Array([0,1,0,1])],[R(0,1,1,0),new Float32Array([0,1,1,0])],[R(0,1,1,1),new Float32Array([0,1,1,1])],[R(1,0,0,0),new Float32Array([1,0,0,0])],[R(1,0,0,1),new Float32Array([1,0,0,1])],[R(1,0,1,0),new Float32Array([1,0,1,0])],[R(1,0,1,1),new Float32Array([1,0,1,1])],[R(1,1,0,0),new Float32Array([1,1,0,0])],[R(1,1,0,1),new Float32Array([1,1,0,1])],[R(1,1,1,0),new Float32Array([1,1,1,0])],[R(1,1,1,1),new Float32Array([1,1,1,1])]]);function Fe(e,t,r){return e+(t-e)*r}function R(e,t,r,a){let i=Fe(e,t,.75),s=Fe(r,a,1-.25);return Fe(i,s,1-.125)}function ae(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var ss=new x,ns=new x;function we(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var z=function e(t,r,a){var i=this;we(this,e),ae(this,"dot2",function(s,n){return i.x*s+i.y*n}),ae(this,"dot3",function(s,n,o){return i.x*s+i.y*n+i.z*o}),this.x=t,this.y=r,this.z=a},ra=[new z(1,1,0),new z(-1,1,0),new z(1,-1,0),new z(-1,-1,0),new z(1,0,1),new z(-1,0,1),new z(1,0,-1),new z(-1,0,-1),new z(0,1,1),new z(0,-1,1),new z(0,1,-1),new z(0,-1,-1)],ft=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],ht=new Array(512),dt=new Array(512),aa=function(t){t>0&&t<1&&(t*=65536),t=Math.floor(t),t<256&&(t|=t<<8);for(var r=0;r<256;r++){var a;r&1?a=ft[r]^t&255:a=ft[r]^t>>8&255,ht[r]=ht[r+256]=a,dt[r]=dt[r+256]=ra[a%12]}};aa(0);var Ps=.5*(Math.sqrt(3)-1),Rs=(3-Math.sqrt(3))/6,Is=1/3,bs=1/6;var Us=Math.PI*2;function ia(e){if(typeof e=="number")e=Math.abs(e);else if(typeof e=="string"){var t=e;e=0;for(var r=0;r<t.length;r++)e=(e+(r+1)*(t.charCodeAt(r)%96))%2147483647}return e===0&&(e=311),e}function pt(e){var t=ia(e);return function(){var r=t*48271%2147483647;return t=r,r/2147483647}}var sa=function e(t){var r=this;we(this,e),ae(this,"seed",0),ae(this,"init",function(a){r.seed=a,r.value=pt(a)}),ae(this,"value",pt(this.seed)),this.init(t)},Fs=new sa(Math.random());function g(e){return e&&e.__esModule?e.default:e}var v={};v=JSON.parse('{"architecture":"attention-v3-int8","formatVersion":3,"globalBias":[-0.32877659797668457,0.4370867609977722,-0.05251404270529747,1.3072023391723633,0.0477047860622406,0.24477416276931763,0.009111796505749226,-0.17459993064403534],"globalFeatureInverseStandardDeviation":[10.771836280822754,1.9548665285110474,1.612365484237671],"globalFeatureMean":[0.9198138117790222,-0.49808526039123535,0.03374629095196724],"globalWeights":[101,-4,7,-127,6,-11,3,1,0,-16,-7,8,-8,-1,7,-4,0,0,-12,-3,-13,1,0,2],"headBias":[-0.15895532071590424,0.007501596584916115,-0.47742825746536255,0.01632097363471985,-0.48355796933174133,-0.1052703931927681,-0.8414919376373291,-0.21046382188796997],"headWeights":[-45,-7,-45,-20,7,-13,120,-24,-15,-26,-19,1,27,-48,-4,-10,1,-5,-24,64,91,-1,-68,39,54,39,101,-40,-127,64,-41,-17,-23,-19,3,35,-2,33,3,9,-64,-32,30,42,-112,12,28,-11,15,2,-4,-7,7,-3,-5,1,76,48,-34,-67,103,-40,-26,1,58,-11,46,-41,5,-6,-17,-8,13,17,-35,45,27,-17,-28,7,-53,12,-51,6,-32,-5,58,-9,-28,-21,37,-12,1,20,2,2,11,7,-4,-9,2,-15,-1,-8,16,12,-27,-1,61,-5,-1,4,-7,-2,7,4,1,4,-2,4,-18,-16,28,6,-65,16,3,-3,-5,-2,0,-40,-21,-22,14,30,-21,49,15,-64,43,19,23,18,5,-15,21,21,30,17,-11,-6,22,-38,-20,97,-46,-5,-13,-59,26,-13,11,-2,-10,-8,2,-15,-17,-27,-9,26,7,-7,6,9,-32,5,-9,12,49,17,-1,24,20,35,14,-33,-50,-1,-4,-26,11,11,9,-80,30,9,36,6,-12,-4,-7,39,-10,-30,-49,1,-43,-20,-34,76,-36,-10,15,-8,43,31,38,-42,39,37,-7,7,8,16,28,-83,32,9,23,-13,39,119,23,-127,-24,8,-48,-29,-7,-33,-12,58,-24,-29,-19,12,-55,-90,0,126,26,42,54,22],"keyProjectionWeights":[0,-1,-1,1,1,1,1,1,-64,32,49,23,-25,4,27,-22,0,1,-1,-1,-1,1,1,0,-34,38,64,88,13,-53,-41,58,-7,-4,79,-41,27,26,14,2,-2,1,1,1,-1,-1,1,1,1,-1,-1,-1,-1,-1,1,1,4,-3,126,42,-40,-116,35,20],"name":"residual-attention-v3-50m-qat-int8-epoch-25-zo-278w","outputBias":-0.0005526235327124596,"outputWeights":[11,11,14,-27,9,-22,127,6],"quantization":{"scales":{"globalWeight":0.021090541950849095,"headWeight":0.04935851140909355,"keyWeight":0.1733924937791441,"outputWeight":0.0030087142047955295,"tapInputWeight":0.1096231754049479,"tapOutputWeight":0.017949438644286102,"valueWeight":0.013986751242596301},"scheme":"symmetric-int8-per-tensor","zeroPoint":0},"summaryQueries":[0.0038647791370749474,0.09565000981092453,0.002756686182692647,-0.08183622360229492,-0.15209506452083588,-0.0006105066277086735,0.0010439646430313587,-0.03020688332617283,0.005065929610282183,0.14488759636878967,0.003160916268825531,-0.0855727270245552,-0.3123375475406647,0.00039022407145239413,0.0037786494940519333,0.1451321840286255,-0.002009483054280281,0.0597594790160656,0.0045239729806780815,-0.08765853196382523,-0.13884992897510529,-0.0021647117100656033,0.003985927440226078,0.09727758169174194,0.007170629221946001,0.0786278173327446,0.004103775601834059,-0.1198369711637497,-0.2925199568271637,-0.002055276418104768,0.0030450925696641207,0.14401987195014954],"supportedDenoiseSamples":[4,8,16],"tapFeatureInverseStandardDeviation":[2.283243417739868,0.8810898065567017,0.8210930228233337,3.752316474914551,3.6375720500946045,2.670454978942871,10.249449729919434,0.12639354169368744,100],"tapFeatureMean":[0.010318092070519924,0.01364430133253336,0.13411010801792145,-0.004725644364953041,0.10053129494190216,0.8384788632392883,0.9203217625617981,1.7139031887054443,1],"tapInputBias":[0.4780646860599518,-0.45214661955833435,0.289407879114151,0.34804567694664,-0.1320028454065323,0.17722633481025696,0.011480014771223068,-0.26692497730255127],"tapInputWeights":[0,1,7,0,-1,-7,0,31,-2,-1,14,-126,0,0,-1,2,26,-2,0,66,-73,0,0,0,-12,22,-3,0,-76,-90,0,-1,-7,-3,58,-1,0,2,6,0,0,3,4,-40,0,0,3,-13,0,0,1,-7,-13,0,0,-7,10,0,-2,-7,0,-39,-2,0,-13,-19,0,-2,20,-1,3,-1],"tapOutputBias":[-0.3867710530757904,0.1349504142999649,0.35706064105033875,-0.5938405394554138,-0.031154220923781395,1.4079623222351074,-1.9221038818359375,0.6029739379882812],"tapOutputWeights":[18,-4,47,19,74,-94,-21,-9,73,-59,88,-10,-3,71,-7,24,20,74,24,-31,-12,-10,-15,-45,-126,2,-4,27,-5,24,35,-11,-4,9,-8,26,-10,27,26,-20,17,-50,5,-35,0,-5,12,-71,89,-58,22,-83,-115,7,-16,-89,89,22,1,-20,-22,-25,-26,44],"valueProjectionWeights":[-16,-6,40,-17,84,-76,59,51,-10,-2,-10,-1,-23,74,-70,23,-5,4,4,-7,-77,127,20,-48,-36,4,-17,-12,-4,10,29,-27,-2,11,-47,-50,-54,-3,14,11,-23,-1,109,31,4,-100,-33,-36,-19,0,-8,20,-35,-24,79,2,44,2,5,7,22,-70,-67,-35]}');var ke=[["tapInputWeight","tapInputWeights",8,9],["tapOutputWeight","tapOutputWeights",8,8],["globalWeight","globalWeights",8,3],["keyWeight","keyProjectionWeights",8,8],["valueWeight","valueProjectionWeights",8,8],["headWeight","headWeights",8,32],["outputWeight","outputWeights",1,8]],pe=e=>{let t=g(v).quantization?.scales?.[e];if(!(t>0)||!Number.isFinite(t))throw new Error(`The bundled N8AO neural model has no valid ${e} scale.`);return t};if(g(v).architecture!=="attention-v3-int8"||g(v).formatVersion!==3||g(v).quantization?.scheme!=="symmetric-int8-per-tensor"||g(v).quantization?.zeroPoint!==0||g(v).supportedDenoiseSamples?.join(",")!=="4,8,16"||ke.some(([,e,t,r])=>g(v)[e]?.length!==t*r||g(v)[e].some(a=>!Number.isInteger(a)||a<-127||a>127)))throw new Error("The bundled N8AO neural denoise model has an unsupported layout.");var ie=e=>{if(!Number.isFinite(e))throw new Error("The bundled N8AO neural model contains a non-finite value.");if(Object.is(e,-0))return"0.0";let t=Number(e).toString();return/[.eE]/.test(t)?t:`${t}.0`},de=["x","y","z","w"],Se=e=>[...de.map(t=>`${e}.lo.${t}`),...de.map(t=>`${e}.hi.${t}`)],la=(e,t)=>e===0?null:e===1?t:e===-1?`(-${t})`:e<0?`(-${ie(-e)} * ${t})`:`${ie(e)} * ${t}`,ua=(e,t)=>e===0?null:`${ie(e)} * ${t}`,At=e=>e.filter(Boolean).join(" + ")||"0.0",ve=(e,t,r,a,i,s)=>{let n=a.map((o,l)=>la(e[t*r+l],o));return`${ie(i)} * (${At(n)}) + ${ie(s[t])}`},k=(e,t="        ")=>`vec4(
${e.map(r=>`${t}    ${r}`).join(`,
`)}
${t})`,Ge=({functionName:e,scaleName:t,weights:r,bias:a,width:i=8,relu:s=!1})=>{let n=Se("inputToken"),o=pe(t),l=Array.from({length:8},(p,S)=>ve(r,S,i,n,o,a)),c=k(l.slice(0,4)),h=k(l.slice(4)),u=p=>s?`max(${p}, vec4(0.0))`:p;return`
    NeuralToken neural${e[0].toUpperCase()}${e.slice(1)}(NeuralToken inputToken) {
        return NeuralToken(
            ${u(c)},
            ${u(h)}
        );
    }
`},xt=(e,t,r,a,i,s,n,o={})=>Array.from({length:i},(l,c)=>{let h=t[c];for(let u=0;u<s;u++){let p=e[c*s+u]*n;h-=p*a[u]*r[u],Object.hasOwn(o,u)&&(h+=p*a[u]*o[u])}return h}),Dt=pe("tapInputWeight"),ca=xt(g(v).tapInputWeights,g(v).tapInputBias,g(v).tapFeatureMean,g(v).tapFeatureInverseStandardDeviation,8,9,Dt,{8:1}),fa=Se("scaledInput"),vt=Array.from({length:8},(e,t)=>ve(g(v).tapInputWeights,t,9,fa,Dt,ca)),ha=`
    NeuralToken neuralTapInput(NeuralToken raw) {
        NeuralToken scaledInput = NeuralToken(
            raw.lo * ${k(g(v).tapFeatureInverseStandardDeviation.slice(0,4),"            ")},
            raw.hi * ${k(g(v).tapFeatureInverseStandardDeviation.slice(4,8),"            ")}
        );
        return NeuralToken(
            max(${k(vt.slice(0,4))}, vec4(0.0)),
            max(${k(vt.slice(4))}, vec4(0.0))
        );
    }
`,wt=pe("globalWeight"),da=xt(g(v).globalWeights,g(v).globalBias,g(v).globalFeatureMean,g(v).globalFeatureInverseStandardDeviation,8,3,wt),pa=de.slice(0,3).map(e=>`scaledInput.${e}`),mt=Array.from({length:8},(e,t)=>ve(g(v).globalWeights,t,3,pa,wt,da)),va=`
    NeuralToken neuralEncodeGlobal(vec4 raw) {
        vec3 scaledInput = raw.xyz * vec3(
            ${g(v).globalFeatureInverseStandardDeviation.map(ie).join(", ")}
        );
        return NeuralToken(
            max(${k(mt.slice(0,4))}, vec4(0.0)),
            max(${k(mt.slice(4))}, vec4(0.0))
        );
    }
`,ma=Se("key"),ga=Array.from({length:4},(e,t)=>At(ma.map((r,a)=>ua(g(v).summaryQueries[t*8+a],r)))),Aa=`
    vec4 neuralQueryScores(NeuralToken key) {
        return ${k(ga)};
    }
`,St=[];for(let e=0;e<4;e++)St.push(...de.map(t=>`runningSummaryLo[${e}].${t}`),...de.map(t=>`runningSummaryHi[${e}].${t}`));var xa=pe("headWeight"),gt=Array.from({length:8},(e,t)=>ve(g(v).headWeights,t,32,St,xa,g(v).headBias)),Da=`
    NeuralToken neuralHead(
        vec4 runningSummaryLo[4],
        vec4 runningSummaryHi[4]
    ) {
        return NeuralToken(
            max(${k(gt.slice(0,4))}, vec4(0.0)),
            max(${k(gt.slice(4))}, vec4(0.0))
        );
    }
`,wa=ve(g(v).outputWeights,0,8,Se("head"),pe("outputWeight"),[g(v).outputBias]),Sa=`
    float neuralOutput(NeuralToken head) {
        return ${wa};
    }
`,Ta=[ha,Ge({functionName:"tapOutput",scaleName:"tapOutputWeight",weights:g(v).tapOutputWeights,bias:g(v).tapOutputBias,relu:!0}),va,Ge({functionName:"keyProject",scaleName:"keyWeight",weights:g(v).keyProjectionWeights,bias:new Array(8).fill(0)}),Ge({functionName:"valueProject",scaleName:"valueWeight",weights:g(v).valueProjectionWeights,bias:new Array(8).fill(0)}),Aa,Da,Sa].join(`
`),Sn=ke.reduce((e,[,t])=>e+g(v)[t].length,0),Tn=ke.reduce((e,[,t])=>e+g(v)[t].filter(r=>r!==0).length,0),En={uniforms:{sceneDiffuse:{value:null},sceneDepth:{value:null},tDiffuse:{value:null},projMat:{value:new ee},viewMat:{value:new ee},projectionMatrixInv:{value:new ee},viewMatrixInv:{value:new ee},cameraPos:{value:new Me},resolution:{value:new x},time:{value:0},r:{value:5},blueNoise:{value:null},radius:{value:12},worldRadius:{value:5},index:{value:0},poissonDisk:{value:[]},distanceFalloff:{value:1},near:{value:.1},far:{value:1e3},screenSpaceRadius:{value:!1}},depthWrite:!1,depthTest:!1,vertexShader:`
		varying vec2 vUv;
		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}`,fragmentShader:`
		uniform sampler2D sceneDiffuse;
    uniform highp sampler2D sceneDepth;
    uniform sampler2D tDiffuse;
    uniform sampler2D blueNoise;
    uniform mat4 projectionMatrixInv;
    uniform mat4 viewMatrixInv;
    uniform vec2 resolution;
    uniform float r;
    uniform float radius;
     uniform float worldRadius;
    uniform float index;
     uniform float near;
     uniform float far;
     uniform float distanceFalloff;
    uniform bool screenSpaceRadius;
    varying vec2 vUv;

    highp float linearize_depth(highp float d, highp float zNear,highp float zFar)
    {
        highp float z_n = 2.0 * d - 1.0;
        return 2.0 * zNear * zFar / (zFar + zNear - z_n * (zFar - zNear));
    }
    highp float linearize_depth_log(highp float d, highp float nearZ,highp float farZ) {
     float depth = pow(2.0, d * log2(farZ + 1.0)) - 1.0;
     float a = farZ / (farZ - nearZ);
     float b = farZ * nearZ / (nearZ - farZ);
     float linDepth = a + b / depth;
     return linearize_depth(linDepth, nearZ, farZ);
   }
   highp float linearize_depth_ortho(highp float d, highp float nearZ, highp float farZ) {
     return nearZ + (farZ - nearZ) * d;
   }
   float depthToClipZ(float depth) {
     #ifdef REVERSEDEPTH
       return depth;
     #else
       return depth * 2.0 - 1.0;
     #endif
   }
   bool isBackgroundDepth(float depth) {
     #ifdef REVERSEDEPTH
       return depth == 0.0;
     #else
       return depth == 1.0;
     #endif
   }
   vec3 getWorldPosLog(vec3 posS) {
     vec2 uv = posS.xy;
     float z = posS.z;
     float nearZ =near;
     float farZ = far;
     float depth = pow(2.0, z * log2(farZ + 1.0)) - 1.0;
     float a = farZ / (farZ - nearZ);
     float b = farZ * nearZ / (nearZ - farZ);
     float linDepth = a + b / depth;
     vec4 clipVec = vec4(uv, linDepth, 1.0) * 2.0 - 1.0;
     vec4 wpos = projectionMatrixInv * clipVec;
     return wpos.xyz / wpos.w;
   }
    vec3 getWorldPos(float depth, vec2 coord) {
     #ifdef LOGDEPTH
      #ifndef ORTHO
          return getWorldPosLog(vec3(coord, depth));
      #endif
     #endif
        
        #ifdef ORTHO
          float z = depthToClipZ(depth);
          vec4 clipSpacePosition = vec4(coord * 2. - 1., z, 1.);
          vec4 viewSpacePosition = projectionMatrixInv * clipSpacePosition;
          viewSpacePosition.xyz /= viewSpacePosition.w;
          return viewSpacePosition.xyz;
        #else
          vec2 ndc = coord * 2. - 1.;
          float ndcZ = depthToClipZ(depth);
          mat4 Q = projectionMatrixInv;
          vec3 view = vec3(Q[0][0] * ndc.x + Q[3][0], Q[1][1] * ndc.y + Q[3][1], Q[3][2]);
          float invW = 1.0 / (Q[2][3] * ndcZ + Q[3][3]);
          return view * invW;
        #endif
    }

#ifdef NEURAL_DENOISE
    struct NeuralToken {
        highp vec4 lo;
        highp vec4 hi;
    };

    ${Ta}

    vec3 neuralSafeNormalize(vec3 value, vec3 fallback) {
        float lengthSquared = dot(value, value);
        return lengthSquared > 1e-12 ? value * inversesqrt(lengthSquared) : fallback;
    }

    mat3 neuralLocalFrame(vec3 inputNormal) {
        vec3 frameNormal = neuralSafeNormalize(inputNormal, vec3(0.0, 0.0, 1.0));
        vec3 helper = abs(frameNormal.z) < 0.999
            ? vec3(0.0, 0.0, 1.0)
            : vec3(0.0, 1.0, 0.0);
        vec3 tangent = neuralSafeNormalize(
            cross(helper, frameNormal),
            vec3(1.0, 0.0, 0.0)
        );
        vec3 bitangent = cross(frameNormal, tangent);
        return transpose(mat3(tangent, bitangent, frameNormal));
    }

    void neuralConsumeToken(
        NeuralToken token,
        inout vec4 runningMaximum,
        inout vec4 runningDenominator,
        inout vec4 runningSummaryLo[4],
        inout vec4 runningSummaryHi[4]
    ) {
        NeuralToken key = neuralKeyProject(token);
        NeuralToken value = neuralValueProject(token);
        vec4 score = neuralQueryScores(key) * 0.3535533905932738;
        vec4 newMaximum = max(runningMaximum, score);
        vec4 oldScale = exp(runningMaximum - newMaximum);
        vec4 newScale = exp(score - newMaximum);

        runningSummaryLo[0] = runningSummaryLo[0] * oldScale.x + value.lo * newScale.x;
        runningSummaryHi[0] = runningSummaryHi[0] * oldScale.x + value.hi * newScale.x;
        runningSummaryLo[1] = runningSummaryLo[1] * oldScale.y + value.lo * newScale.y;
        runningSummaryHi[1] = runningSummaryHi[1] * oldScale.y + value.hi * newScale.y;
        runningSummaryLo[2] = runningSummaryLo[2] * oldScale.z + value.lo * newScale.z;
        runningSummaryHi[2] = runningSummaryHi[2] * oldScale.z + value.hi * newScale.z;
        runningSummaryLo[3] = runningSummaryLo[3] * oldScale.w + value.lo * newScale.w;
        runningSummaryHi[3] = runningSummaryHi[3] * oldScale.w + value.hi * newScale.w;
        runningDenominator = runningDenominator * oldScale + newScale;
        runningMaximum = newMaximum;
    }

    void neuralEncodeTap(
        NeuralToken raw,
        inout vec4 runningMaximum,
        inout vec4 runningDenominator,
        inout vec4 runningSummaryLo[4],
        inout vec4 runningSummaryHi[4]
    ) {
        NeuralToken first = neuralTapInput(raw);
        NeuralToken token = neuralTapOutput(first);
        neuralConsumeToken(
            token,
            runningMaximum,
            runningDenominator,
            runningSummaryLo,
            runningSummaryHi
        );
    }

    float neuralFinish(
        float baselineAO,
        inout vec4 runningMaximum,
        inout vec4 runningDenominator,
        inout vec4 runningSummaryLo[4],
        inout vec4 runningSummaryHi[4]
    ) {
        vec4 raw = vec4(
            baselineAO,
            log(max(worldRadius, 1e-6)),
            log(max(distanceFalloff, 1e-6)),
            0.0
        );
        NeuralToken token = neuralEncodeGlobal(raw);
        neuralConsumeToken(
            token,
            runningMaximum,
            runningDenominator,
            runningSummaryLo,
            runningSummaryHi
        );

        vec4 inverseDenominator = 1.0 / max(runningDenominator, vec4(1e-12));
        runningSummaryLo[0] *= inverseDenominator.x;
        runningSummaryHi[0] *= inverseDenominator.x;
        runningSummaryLo[1] *= inverseDenominator.y;
        runningSummaryHi[1] *= inverseDenominator.y;
        runningSummaryLo[2] *= inverseDenominator.z;
        runningSummaryHi[2] *= inverseDenominator.z;
        runningSummaryLo[3] *= inverseDenominator.w;
        runningSummaryHi[3] *= inverseDenominator.w;

        NeuralToken head = neuralHead(runningSummaryLo, runningSummaryHi);
        return neuralOutput(head);
    }
#endif

    #include <common>
    #define NUM_SAMPLES __N8AO_DENOISE_SAMPLES__
    uniform vec2 poissonDisk[NUM_SAMPLES];
    void main() {
        const float pi = 3.14159;
        vec2 texelSize = vec2(1.0 / resolution.x, 1.0 / resolution.y);
        vec2 uv = vUv;
        vec4 data = texture2D(tDiffuse, vUv);
        float occlusion = data.r;
        float baseOcc = data.r;
        vec3 normal = data.gba * 2.0 - 1.0;
        float count = 1.0;
        float d = texture2D(sceneDepth, vUv).x;
        if (isBackgroundDepth(d)) {
          gl_FragColor = data;
          return;
        }
        vec3 worldPos = getWorldPos(d, vUv);
        float size = radius;
        float angle;
#ifdef NEURAL_DENOISE
        // The neural material is only bound for denoise iteration two.
        angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).z * PI2;
#else
        if (index == 0.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).w * PI2;
        } else if (index == 1.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).z * PI2;
        } else if (index == 2.0) {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).y * PI2;
        } else {
             angle = texture2D(blueNoise, gl_FragCoord.xy / 128.0).x * PI2;
        }
#endif

        mat2 rotationMatrix = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        float radiusToUse = screenSpaceRadius ? distance(
          worldPos,
          getWorldPos(d, vUv +
            vec2(worldRadius, 0.0) / resolution)
        ) : worldRadius;
        float distanceFalloffToUse =screenSpaceRadius ?
        radiusToUse * distanceFalloff
    : radiusToUse * distanceFalloff * 0.2;

        float invDistance = (1.0 / distanceFalloffToUse);
#ifdef NEURAL_DENOISE
        mat3 neuralWorldToLocal = neuralLocalFrame(normal);
        float neuralInverseRadius = 1.0 / max(radiusToUse, 1e-6);
        float neuralInverseDistance = 1.0 / max(distanceFalloffToUse, 1e-6);
        vec4 neuralMaximum = vec4(-1e30);
        vec4 neuralDenominator = vec4(0.0);
        vec4 neuralSummaryLo[4];
        vec4 neuralSummaryHi[4];
        for (int query = 0; query < 4; query++) {
            neuralSummaryLo[query] = vec4(0.0);
            neuralSummaryHi[query] = vec4(0.0);
        }
#endif
        for(int i = 0; i < NUM_SAMPLES; i++) {
            vec2 offset = (rotationMatrix * poissonDisk[i]) * texelSize * size;
            vec4 dataSample = texture2D(tDiffuse, uv + offset);
            float occSample = dataSample.r;
            vec3 normalSample = dataSample.gba * 2.0 - 1.0;
            float dSample = texture2D(sceneDepth, uv + offset).x;
            vec3 worldPosSample = getWorldPos(dSample, uv + offset);
            float tangentPlaneDist = abs(dot(worldPosSample - worldPos, normal));
            float rangeCheck = float(!isBackgroundDepth(dSample)) * exp(-1.0 * tangentPlaneDist * invDistance ) * max(dot(normal, normalSample), 0.0);
            occlusion += occSample * rangeCheck;
            count += rangeCheck;
#ifdef NEURAL_DENOISE
            if (!isBackgroundDepth(dSample)) {
                vec3 localDelta = (neuralWorldToLocal * (worldPosSample - worldPos))
                    * neuralInverseRadius;
                vec3 localNormal = neuralWorldToLocal
                    * neuralSafeNormalize(normalSample, vec3(0.0, 0.0, 1.0));
                NeuralToken rawTap = NeuralToken(
                    vec4(localDelta, localNormal.x),
                    vec4(
                        localNormal.y,
                        localNormal.z,
                        occSample,
                        tangentPlaneDist * neuralInverseDistance
                    )
                );
                neuralEncodeTap(
                    rawTap,
                    neuralMaximum,
                    neuralDenominator,
                    neuralSummaryLo,
                    neuralSummaryHi
                );
            }
#endif
        }
        if (count > 0.0) {
          occlusion /= count;
        }
        occlusion = clamp(occlusion, 0.0, 1.0);
        if (occlusion == 0.0) {
          occlusion = 1.0;
        }
#ifdef NEURAL_DENOISE
        occlusion = clamp(
            occlusion + neuralFinish(
                occlusion,
                neuralMaximum,
                neuralDenominator,
                neuralSummaryLo,
                neuralSummaryHi
            ),
            0.0,
            1.0
        );
#endif
        gl_FragColor = vec4(occlusion, 0.5 + 0.5 * normal);
    }
    `};var Ea=parseInt("180".replace(/\D+/g,"")),yn=Ea>=162?class extends D{constructor(e=1,t=1,r=1,a={}){super(e,t,{...a,count:r}),this.isWebGLMultipleRenderTargets=!0}get texture(){return this.textures}}:class extends D{constructor(e=1,t=1,r=1,a={}){super(e,t,a),this.isWebGLMultipleRenderTargets=!0;let i=this.texture;this.texture=[];for(let s=0;s<r;s++)this.texture[s]=i.clone(),this.texture[s].isRenderTargetTexture=!0}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let a=0,i=this.texture.length;a<i;a++)this.texture[a].image.width=e,this.texture[a].image.height=t,this.texture[a].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}copy(e){this.dispose(),this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.texture.length=0;for(let t=0,r=e.texture.length;t<r;t++)this.texture[t]=e.texture[t].clone(),this.texture[t].isRenderTargetTexture=!0;return this}};var ya=e=>typeof e=="object"&&e!=null&&"current"in e?e.current:e;function Ca(e,t){return(0,A.useCallback)(r=>{if(e.current=r,typeof t!="function"){t&&(t.current=r);return}let a=t(r);if(typeof a=="function")return()=>{e.current=null,a()}},[e,t])}function Ma(e,t){let r=e.__r3f;return r?r.children.map(a=>a.object).filter(t):[]}function Ba(e,t){let r=e.current;return t.length===r.length&&t.every((a,i)=>a===r[i])?!1:(e.current=t,!0)}function Pa(e,t){let r=e;for(let a of t.split("-")){if(r==null)return;r=r[a]}return r}function Ra(e,t,r){let a=t.split("-"),i=e;for(let s=0;s<a.length-1;s++){if(i==null)return;i=i[a[s]]}i!=null&&(i[a[a.length-1]]=r)}function Ia(e,t,r,a=Pa,i=Ra){let s=(0,A.useRef)(null),n=De(o=>o.invalidate);(0,A.useLayoutEffect)(()=>{let o=ya(e);if(!o)return;s.current?.instance!==o&&(s.current={instance:o,defaults:new Map,applied:new Map});let{defaults:l,applied:c}=s.current,h=!1;for(let u of r){if(!l.has(u)){let S=a(o,u);l.set(u,S),c.set(u,S)}let p=t[u]!==void 0?t[u]:l.get(u);Object.is(c.get(u),p)||(i(o,u,p),c.set(u,p),h=!0)}h&&n()})}var Tt=new WeakMap,ba=0,Ua=["blendMode-blendFunction","blendMode-opacity-value"];function Pt(e){return function({blendFunction:r,opacity:a,ref:i,...s}){let n=Tt.get(e);if(!n){let h=`@react-three/postprocessing/${e.name}-${ba++}`;$e({[h]:e}),Tt.set(e,n=h)}let o=De(h=>h.camera),l=(0,A.useRef)(null),c=Ca(l,i);return Ia(l,{"blendMode-blendFunction":r,"blendMode-opacity-value":a},Ua),(0,_.jsx)(n,{ref:c,camera:o,...s})}}var Fa=(0,A.createContext)(null),Et=e=>(e.getAttributes()&2)===2,yt=e=>/mainUv/.test(e.getFragmentShader()??"");function Rt(e){let t=new WeakMap;return{acquire(r,a){let i=t.get(r);i?(i.count++,i.forcedValue=a):t.set(r,{count:1,original:r[e],forcedValue:a})},release(r){let a=t.get(r);a&&--a.count<=0&&(r[e]===a.forcedValue&&(r[e]=a.original),t.delete(r))}}}var Ct=Rt("autoClear"),Mt=Rt("toneMapping"),V=new x,La=(e,t)=>new He(e,t),Qe=new WeakSet,Oa=new WeakSet;function Na(e){e instanceof ze&&e.setEffects([]),M.prototype.dispose.call(e)}function Bt(e){Qe.has(e)&&Na(e)}function Ha(e,t,r){let a=[];for(let i=0;i<e.length;i++){let s=e[i];if(s instanceof re){let n=[s],o=Et(s),l=yt(s);if(r!=="none"){let h;for(;(h=e[i+1])instanceof re;){let u=Et(h),p=yt(h);if(r==="auto"&&(o&&u||o&&p||l&&u))break;n.push(h),o||=u,l||=p,i++}}let c=new ze(t,...n);Qe.add(c),a.push(c)}else s instanceof M&&a.push(s)}return a}var vo=(0,A.memo)(function({children:t,camera:r,scene:a,resolutionScale:i,enabled:s=!0,renderPriority:n=1,autoClear:o=!0,autoRenderToScreen:l=!0,depthBuffer:c,enableNormalPass:h,stencilBuffer:u,multisampling:p=8,frameBufferType:S=Ee,renderPass:G=La,mergeMode:L="auto",ref:se}){let{gl:T,scene:E,camera:b}=De(),W=a||E,X=r||b;T.getSize(V);let[O,It]=(0,A.useState)(null),[,Ve]=(0,A.useReducer)(B=>B+1,0);(0,A.useEffect)(()=>{Ct.acquire(T,!1);let B=new nt(T,{depthBuffer:c,stencilBuffer:u,multisampling:p,frameBufferType:S});B.autoRenderToScreen=l,B.addPass(G(W,X));let y=null,N=null;return h&&(y=new ct(W,X),y.enabled=!1,B.addPass(y),i!==void 0&&(N=new lt({normalBuffer:y.texture,resolutionScale:i}),N.enabled=!1,B.addPass(N))),B.setSize(V.width,V.height),It({composer:B,normalPass:y,downSamplingPass:N}),()=>{for(let Q of B.passes)Bt(Q);B.dispose(),Ct.release(T)}},[X,T,c,u,p,S,l,G,W,h,i]);let bt=(0,A.useRef)({width:-1,height:-1,pixelRatio:-1});_e((B,y)=>{if(!s||!O)return;let{composer:N}=O;T.getSize(V);let Q=T.getPixelRatio(),P=bt.current;(V.width!==P.width||V.height!==P.height||Q!==P.pixelRatio)&&(N.setSize(V.width,V.height),P.width=V.width,P.height=V.height,P.pixelRatio=Q);let Lt=T.autoClear;T.autoClear=o,u&&!o&&T.clearStencil(),N.render(y),T.autoClear=Lt},s?n:0);let We=(0,A.useRef)(null),Ye=(0,A.useRef)([]),[Ut,Ft]=(0,A.useState)(0);(0,A.useLayoutEffect)(()=>{if(!O)return;let B=Ma(We.current,y=>y instanceof re||y instanceof M);Ba(Ye,B)&&Ft(y=>y+1)}),(0,A.useLayoutEffect)(()=>{if(!O)return;let{composer:B,normalPass:y,downSamplingPass:N}=O,Q=Ha(Ye.current,X,L);if(Q.some(P=>Oa.has(P))){let P=new Oe;Qe.add(P),Q.push(P)}for(let P of Q)B.addPass(P);return Q.length&&(y&&(y.enabled=!0),N&&(N.enabled=!0)),()=>{for(let P of Q)B.removePass(P),Bt(P);y&&(y.enabled=!1),N&&(N.enabled=!1)}},[O,Ut,X,L]),(0,A.useEffect)(()=>(Mt.acquire(T,Te),T.toneMapping=Te,()=>{Mt.release(T)}),[T]);let Ke=(0,A.useMemo)(()=>O?{composer:O.composer,normalPass:O.normalPass,downSamplingPass:O.downSamplingPass,resolutionScale:i,camera:X,scene:W,requestRebuild:Ve,autoClear:o}:null,[O,i,X,W,Ve,o]);return(0,A.useImperativeHandle)(se,()=>O?.composer,[O]),Ke?(0,_.jsx)(Fa.Provider,{value:Ke,children:(0,_.jsx)("group",{ref:We,children:t})}):null});var za=Pt(ot);function mo({blendFunction:e=0,luminanceThreshold:t,luminanceSmoothing:r,mipmapBlur:a,radius:i,levels:s,resolutionScale:n,resolutionX:o,resolutionY:l,...c}){let h=(0,A.useMemo)(()=>[{luminanceThreshold:t,luminanceSmoothing:r,mipmapBlur:a,radius:i,levels:s,resolutionScale:n,resolutionX:o,resolutionY:l}],[t,r,a,i,s,n,o,l]);return(0,_.jsx)(za,{blendFunction:e,args:h,...c})}var go=Pt(ut);export{vo as a,mo as b,go as c};
/*! For license information please see chunk-IW6MTDPZ.js.LEGAL.txt */
