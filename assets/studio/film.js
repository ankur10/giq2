import{a as pe,b as me,c as he}from"./chunk-IW6MTDPZ.js";import{a as fe,b as ue}from"./chunk-OXZ2PQFH.js";import{a as Se}from"./chunk-MRHIF7U4.js";import{a as ge,b as Ct,c as W,d as G,e as ye,f as N,g as it,h as Pt,i as Dt,j as ht,k as Nt,l as g,m as T,n as Ot,o as x,p as xe,r as we,s as ve}from"./chunk-OPDHD24S.js";import{b as Ge}from"./chunk-OALWP7W7.js";import{$ as ae,B as Z,C as ft,D as ut,E as ne,G as Lt,H as R,I as pt,J as ie,K as Tt,L as oe,O as I,R as mt,U as re,Y as se,_ as tt,aa as et,ba as nt,da as le,ea as ce,ha as de,u as Rt,v as te,w as ee,x as A,z as J}from"./chunk-HFLJD3YM.js";import{c as dt,d as Ut}from"./chunk-O7P6DOQA.js";var L=dt(Ut()),Ie=dt(Ge());var C=360,yt=[.91,.44,.1],X=[.62,.7,.82],q=2,Be=5,xt=[[q,Be,0],[11,3.2,-10],[20,6,-22],[29,2.5,-34],[38,4.5,-46],[45,4,-52],[51,4.6,-56],[57,4,-60],[63,4.6,-64],[69,4,-68],[76,7,-72],[82,14,-75],[86,24,-77]],je=new mt(xt.map(e=>new A(...e)),!1,"catmullrom",.5),ot=[48,...G.map(e=>e.at),...ye],Wt=xt.slice(1,1+G.length),V=xt.at(-1),gt=new A,Ht=e=>(je.getPoint(Nt(e),gt),[gt.x,gt.y,gt.z]);function kt(e){if(e<=ot[0])return 0;for(let t=1;t<ot.length;t++)if(e<ot[t])return(t-1+T(g(e,ot[t-1],ot[t])))/(xt.length-1);return 1}var Ue=12,It=35,Ee=2*Ue*Math.tan(It*Math.PI/360),Ve=(e,t)=>[V[0]+e*Ee,V[1]+t*Ee,V[2]],at=[-.42,0,.42].map(e=>({x:e-.15,y:-.17,w:.3,h:.4})),st={x:-.58,y:-.31,w:1.16,h:.66},qe=-.16,Ae=1.4,Me=e=>[[e.x,e.y],[e.x,e.y+e.h],[e.x+e.w,e.y+e.h],[e.x+e.w,e.y],[e.x,e.y]],Gt={caret:{x:.1,y:0},underline:{x:-.3,y:-.07,w:.6}};function rt(e,t,n,o=C){let i=[0];for(let s=1;s<e.length;s++)i.push(i[s-1]+Math.hypot(e[s][0]-e[s-1][0],e[s][1]-e[s-1][1]));let l=[],r=1;for(let s=0;s<o;s++){let p=x(t,n,s/(o-1));for(;r<e.length-1&&i[r]<p;)r++;for(;r>1&&i[r-1]>p;)r--;let u=i[r]===i[r-1]?0:Nt((p-i[r-1])/(i[r]-i[r-1]));l.push([x(e[r-1][0],e[r][0],u),x(e[r-1][1],e[r][1],u)])}return l}var _e=(e,t)=>{let n=0;for(let o=1;o<=t;o++)n+=Math.hypot(e[o][0]-e[o-1][0],e[o][1]-e[o-1][1]);return n},be=(e,t)=>{if(e<=t[0][0])return t[0][1];for(let n=1;n<t.length;n++)if(e<t[n][0])return x(t[n-1][1],t[n][1],T(g(e,t[n-1][0],t[n][0])));return t.at(-1)[1]},Le=(e,t)=>{let n=e-t;return Math.exp(-((n/.35)**2))-.45*Math.exp(-(((n-.55)/.3)**2))-.3*Math.exp(-(((n+.5)/.3)**2))},wt=(e,t,n=0)=>Math.sin(e*1.7+t*1.9+n)*.5+Math.sin(e*4.3-t*3.1+1.3+n*2.1)*.3+Math.sin(e*9.1+t*5.2+4+n*3.7)*.2;function ze(e,t){let n=.6*g(t,1.5,2.2)*(1-g(t,6.8,7.5))*Le(e,x(-8,8,g(t,1.5,7.5))),o=.32*g(t,10,20)*(1-g(t,31.6,32))*wt(e,t),i=t<32?0:Be*(1-Math.exp(-1.6*(t-32))*Math.cos(2.4*(t-32)))*Math.exp(-(((e-q)/.5)**2));return n+o+i}function Te(e,t=Gt){let n=new Float32Array(C*3),o=(p,u)=>{n[p*3]=u[0],n[p*3+1]=u[1],n[p*3+2]=u[2]},i=yt,l=1,r=e>=32,s=null;if(e<48){let p=x(13,60,g(e,8,14))*(1-T(g(e,44,48))),u=x(1,2.2,g(e,14,30));for(let a=0;a<C;a++){let f=a/(C-1)*2-1,c=q+Math.sign(f)*Math.abs(f)**u*p;o(a,[c,ze(c,e),0])}if(e<32){let a=g(e,14,22);i=yt.map((f,c)=>x(f,X[c],a)),l=x(1,.55,a)}l*=g(e,0,1.2),s=[q,ze(q,e),0]}else if(e<92){let p=kt(e),u=p*T(g(e,88,92));for(let a=0;a<C;a++)o(a,Ht(x(u,p,a/(C-1))))}else{let p=t.caret,u=t.underline,a;if(e<108){let f=Ot(g(e,92,94)),c=x(0,p.x,f),m=x(0,p.y,f),B=.036*f;a=rt([[c,m-B],[c,m+B]],0,2*B),(e>=94&&e<96||e>=104)&&e%1>=.5&&(l=0),r=e<93}else if(e<120){let f=Ot(g(e,108,109)),c=T(g(e,108.5,111.5)),m=.036,B=[x(p.x,u.x,f),x(p.y-m,u.y,f)],y=[x(p.x,u.x+u.w*c,f),x(p.y+m,u.y,f)];a=rt([B,y],0,Math.hypot(y[0]-B[0],y[1]-B[1])),r=!1}else if(e<134){let f=[[u.x,u.y],[u.x+u.w,u.y],...at.flatMap(Me)],c=h=>_e(f,h),m=h=>2+h*5,B=be(e,[[120,c(1)],[121,c(m(0))],[124,c(m(0)+4)],[125,c(m(1))],[128,c(m(1)+4)],[129,c(m(2))],[132,c(m(2)+4)]]),y=be(e,[[120,0],[121,c(m(0))],[124,c(m(0))],[125,c(m(1))],[128,c(m(1))],[129,c(m(2))],[132,c(m(2))],[134,c(m(2)+4)]]);a=rt(f,y,B)}else if(e<144){let f=T(g(e,138,144)),c=at[2],m=[x(c.x,st.x,f),x(c.y,st.y,f)];a=rt([m,m],0,0)}else{let f=Me(st),c=_e(f,4),m=rt(f,0,c*T(g(e,144,148))),B=T(g(e,152,156)),y=.05*g(e,156,156.6)*(1-g(e,158.4,159))/.6;a=m.map((h,E)=>{let v=x(-Ae,Ae,E/(C-1));return[x(h[0],v,B),x(h[1],qe+y*Le(v*8,x(-6,6,g(e,156,159))),B)]}),r=e<152,l=1-g(e,159,160)}a.forEach((f,c)=>o(c,Ve(f[0],f[1])))}return{positions:n,color:i,opacity:l,dot:r,head:s??[n[(C-1)*3],n[(C-1)*3+1],n[(C-1)*3+2]]}}var Ft=(e,t,n)=>({position:e.position.map((o,i)=>x(o,t.position[i],n)),look:e.look.map((o,i)=>x(o,t.look[i],n))});function Ce(e){let t={position:[0,0,x(9,34,T(g(e,8,26)))],look:[0,0,0]},n={position:[q+1.6,2.2,16],look:[q+.4,2.1,0]},o=Ht(kt(e-1.2)),i=Ht(kt(e-.2)),l={position:[o[0]-4.5,o[1]+2.4,o[2]+10.5],look:[i[0]+1.2,i[1]+.2,i[2]-1]},r={position:[V[0],V[1],V[2]+Ue],look:V};return e<46?Ft(t,n,T(g(e,32,40))):e<84?Ft(n,l,T(g(e,46,52))):Ft(l,r,T(g(e,84,92)))}var d=dt(Ut());var Pe=new Z,vt=new A,Y=class extends se{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],o=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(o),this.setAttribute("position",new R(t,3)),this.setAttribute("uv",new R(n,2))}applyMatrix4(t){let n=this.attributes.instanceStart,o=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),o.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));let o=new tt(n,6,1);return this.setAttribute("instanceStart",new I(o,3,0)),this.setAttribute("instanceEnd",new I(o,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));let o=new tt(n,6,1);return this.setAttribute("instanceColorStart",new I(o,3,0)),this.setAttribute("instanceColorEnd",new I(o,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new re(t.geometry)),this}fromLineSegments(t){let n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Z);let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Pe.setFromBufferAttribute(n),this.boundingBox.union(Pe))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ft),this.boundingBox===null&&this.computeBoundingBox();let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){let o=this.boundingSphere.center;this.boundingBox.getCenter(o);let i=0;for(let l=0,r=t.count;l<r;l++)vt.fromBufferAttribute(t,l),i=Math.max(i,o.distanceToSquared(vt)),vt.fromBufferAttribute(n,l),i=Math.max(i,o.distanceToSquared(vt));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};et.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new te(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};nt.line={uniforms:Tt.merge([et.common,et.fog,et.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var j=class extends oe{constructor(t){super({type:"LineMaterial",uniforms:Tt.clone(nt.line.uniforms),vertexShader:nt.line.vertexShader,fragmentShader:nt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var jt=new J,De=new A,Ne=new A,_=new J,b=new J,O=new J,Vt=new A,qt=new ut,z=new ae,Oe=new A,St=new Z,Et=new ft,F=new J,H,K;function Fe(e,t,n){return F.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),F.multiplyScalar(1/F.w),F.x=K/n.width,F.y=K/n.height,F.applyMatrix4(e.projectionMatrixInverse),F.multiplyScalar(1/F.w),Math.abs(Math.max(F.x,F.y))}function Ke(e,t){let n=e.matrixWorld,o=e.geometry,i=o.attributes.instanceStart,l=o.attributes.instanceEnd,r=Math.min(o.instanceCount,i.count);for(let s=0,p=r;s<p;s++){z.start.fromBufferAttribute(i,s),z.end.fromBufferAttribute(l,s),z.applyMatrix4(n);let u=new A,a=new A;H.distanceSqToSegment(z.start,z.end,a,u),a.distanceTo(u)<K*.5&&t.push({point:a,pointOnLine:u,distance:H.origin.distanceTo(a),object:e,face:null,faceIndex:s,uv:null,uv1:null})}}function $e(e,t,n){let o=t.projectionMatrix,l=e.material.resolution,r=e.matrixWorld,s=e.geometry,p=s.attributes.instanceStart,u=s.attributes.instanceEnd,a=Math.min(s.instanceCount,p.count),f=-t.near;H.at(1,O),O.w=1,O.applyMatrix4(t.matrixWorldInverse),O.applyMatrix4(o),O.multiplyScalar(1/O.w),O.x*=l.x/2,O.y*=l.y/2,O.z=0,Vt.copy(O),qt.multiplyMatrices(t.matrixWorldInverse,r);for(let c=0,m=a;c<m;c++){if(_.fromBufferAttribute(p,c),b.fromBufferAttribute(u,c),_.w=1,b.w=1,_.applyMatrix4(qt),b.applyMatrix4(qt),_.z>f&&b.z>f)continue;if(_.z>f){let M=_.z-b.z,S=(_.z-f)/M;_.lerp(b,S)}else if(b.z>f){let M=b.z-_.z,S=(b.z-f)/M;b.lerp(_,S)}_.applyMatrix4(o),b.applyMatrix4(o),_.multiplyScalar(1/_.w),b.multiplyScalar(1/b.w),_.x*=l.x/2,_.y*=l.y/2,b.x*=l.x/2,b.y*=l.y/2,z.start.copy(_),z.start.z=0,z.end.copy(b),z.end.z=0;let y=z.closestPointToPointParameter(Vt,!0);z.at(y,Oe);let h=Rt.lerp(_.z,b.z,y),E=h>=-1&&h<=1,v=Vt.distanceTo(Oe)<K*.5;if(E&&v){z.start.fromBufferAttribute(p,c),z.end.fromBufferAttribute(u,c),z.start.applyMatrix4(r),z.end.applyMatrix4(r);let M=new A,S=new A;H.distanceSqToSegment(z.start,z.end,S,M),n.push({point:S,pointOnLine:M,distance:H.origin.distanceTo(S),object:e,face:null,faceIndex:c,uv:null,uv1:null})}}}var At=class extends ie{constructor(t=new Y,n=new j({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let t=this.geometry,n=t.attributes.instanceStart,o=t.attributes.instanceEnd,i=new Float32Array(2*n.count);for(let r=0,s=0,p=n.count;r<p;r++,s+=2)De.fromBufferAttribute(n,r),Ne.fromBufferAttribute(o,r),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+De.distanceTo(Ne);let l=new tt(i,2,1);return t.setAttribute("instanceDistanceStart",new I(l,1,0)),t.setAttribute("instanceDistanceEnd",new I(l,1,1)),this}raycast(t,n){let o=this.material.worldUnits,i=t.camera;i===null&&!o&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let l=t.params.Line2!==void 0&&t.params.Line2.threshold||0;H=t.ray;let r=this.matrixWorld,s=this.geometry,p=this.material;K=p.linewidth+l,s.boundingSphere===null&&s.computeBoundingSphere(),Et.copy(s.boundingSphere).applyMatrix4(r);let u;if(o)u=K*.5;else{let f=Math.max(i.near,Et.distanceToPoint(H.origin));u=Fe(i,f,p.resolution)}if(Et.radius+=u,H.intersectsSphere(Et)===!1)return;s.boundingBox===null&&s.computeBoundingBox(),St.copy(s.boundingBox).applyMatrix4(r);let a;if(o)a=K*.5;else{let f=Math.max(i.near,St.distanceToPoint(H.origin));a=Fe(i,f,p.resolution)}St.expandByScalar(a),H.intersectsBox(St)!==!1&&(o?Ke(this,n):$e(this,i,n))}onBeforeRender(t){let n=this.material.uniforms;n&&n.resolution&&(t.getViewport(jt),this.material.uniforms.resolution.value.set(jt.z,jt.w))}};var Q=class extends Y{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){let n=t.length-3,o=new Float32Array(2*n);for(let i=0;i<n;i+=3)o[2*i]=t[i],o[2*i+1]=t[i+1],o[2*i+2]=t[i+2],o[2*i+3]=t[i+3],o[2*i+4]=t[i+4],o[2*i+5]=t[i+5];return super.setPositions(o),this}setColors(t){let n=t.length-3,o=new Float32Array(2*n);for(let i=0;i<n;i+=3)o[2*i]=t[i],o[2*i+1]=t[i+1],o[2*i+2]=t[i+2],o[2*i+3]=t[i+3],o[2*i+4]=t[i+4],o[2*i+5]=t[i+5];return super.setColors(o),this}setFromPoints(t){let n=t.length-1,o=new Float32Array(6*n);for(let i=0;i<n;i++)o[6*i]=t[i].x,o[6*i+1]=t[i].y,o[6*i+2]=t[i].z||0,o[6*i+3]=t[i+1].x,o[6*i+4]=t[i+1].y,o[6*i+5]=t[i+1].z||0;return super.setPositions(o),this}fromLine(t){let n=t.geometry;return this.setPositions(n.attributes.position.array),this}};var Mt=class extends At{constructor(t=new Q,n=new j({color:Math.random()*16777215})){super(t,n),this.isLine2=!0,this.type="Line2"}};var Jt=["styles.css","themes.css","refinements.css"],Je=":host{background:transparent!important;display:block}.fragment{width:400px;padding:20px 22px 22px;border-radius:10px;box-shadow:0 24px 70px rgb(0 0 0 / .45)}.fragment h2{margin:12px 0 14px;font:400 25px/1.2 var(--serif);letter-spacing:-.02em}.fragment .reader-context{margin:0;padding-top:14px}",He=240,Kt=72;function $t(e){let t=e;return()=>{t=t+1831565813>>>0;let n=t;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function Xe({beat:e,anchors:t,labels:n}){let{size:o}=le(),i=(0,d.useMemo)(()=>{let y=new Q;y.setPositions(new Float32Array(C*3));let h=new j({linewidth:3.6,transparent:!0,depthWrite:!1,toneMapped:!1}),E=new Mt(y,h);return E.frustumCulled=!1,E},[]),l=(0,d.useMemo)(()=>{let y=$t(11),h=Array.from({length:He},()=>({y:(y()*2-1)*15,z:-30+y()*33,seed:y()*40,gain:.5+y()})),E=new pt().setAttribute("position",new Lt(new Float32Array(He*(Kt-1)*6),3));return{lines:h,geometry:E}},[]),r=(0,d.useRef)(),s=(0,d.useRef)(),p=(0,d.useRef)(),u=(0,d.useRef)(),a=(0,d.useRef)(),f=(0,d.useMemo)(()=>{let y=$t(41),h=[];for(let E=0;E<16;E++){let v=Array.from({length:6},(S,$)=>new A(-10+$*21+(y()-.5)*14,-6+y()*34,8-$*18+(y()-.5)*26)),M=new mt(v).getPoints(70);for(let S=1;S<M.length;S++)h.push(M[S-1].x,M[S-1].y,M[S-1].z,M[S].x,M[S].y,M[S].z)}return new pt().setAttribute("position",new R(h,3))},[]),c=(0,d.useMemo)(()=>{let y=$t(23),h=new Float32Array(900*3);for(let E=0;E<900;E++){let v=y();h.set([-6+v*104+(y()-.5)*30,-8+y()*40,6-v*90+(y()-.5)*34],E*3)}return new pt().setAttribute("position",new Lt(h,3))},[]),m=(0,d.useMemo)(()=>({m:new ut,q:new ee,s:new A,p:new A,v:new A,c:new ne}),[]);ce(({camera:y})=>{let h=e(),E=Ce(h);y.position.set(...E.position),y.lookAt(...E.look),y.updateMatrixWorld();let v=Te(h,t.current),M=i.geometry.attributes.instanceStart.data.array;for(let U=0;U<C-1;U++)M.set(v.positions.subarray(U*3,U*3+6),U*6);i.geometry.attributes.instanceStart.data.needsUpdate=!0;let S=v.color===yt?1.18:1.05;i.material.color.setRGB(v.color[0]*S,v.color[1]*S,v.color[2]*S),i.material.opacity=v.opacity,i.material.resolution.set(o.width,o.height),r.current.position.set(...v.head),r.current.visible=v.dot,r.current.material.opacity=v.opacity;let $=g(h,8,16)*x(1,.22,g(h,32,34))*(1-g(h,46,54));if(p.current.opacity=.34*$,p.current.visible=$>0,$>0){let U=l.geometry.attributes.position.array,k=x(1,.35,g(h,32,36)),P=0;l.lines.forEach(D=>{let bt=-48,Qt=D.y+.32*D.gain*k*wt(bt,h,D.seed);for(let zt=1;zt<Kt;zt++){let Bt=-48+96*zt/(Kt-1),Zt=D.y+.32*D.gain*k*wt(Bt,h,D.seed);U[P++]=bt,U[P++]=Qt,U[P++]=D.z,U[P++]=Bt,U[P++]=Zt,U[P++]=D.z,bt=Bt,Qt=Zt}}),l.geometry.attributes.position.needsUpdate=!0}u.current.opacity=.55*g(h,46,52)*(1-g(h,86,92)),a.current.opacity=.2*g(h,47,53)*(1-g(h,85,91)),Wt.forEach((U,k)=>{let P=h>=G[k].at,D=h>46&&h<92;m.p.set(...U),m.s.setScalar(D?(P?1.6:.8)*g(m.p.distanceTo(y.position),5,11):0),s.current.setMatrixAt(k,m.m.compose(m.p,m.q,m.s)),s.current.setColorAt(k,m.c.setRGB(...P?[1.6,1.6,1.6]:X)),B(n.current[k],U,y,o,P&&h<G[k].at+(G[k].kind==="chain"?9:12)&&h<90)}),s.current.instanceMatrix.needsUpdate=!0,s.current.instanceColor.needsUpdate=!0,B(n.current.card,[2,5,0],y,o,h>=W.from&&h<W.to)});let B=(y,h,E,v,M)=>{y&&(m.v.set(...h).project(E),y.style.transform=`translate(${(m.v.x+1)/2*v.width}px, ${(1-m.v.y)/2*v.height}px)`,y.dataset.on=M&&m.v.z<1)};return d.default.createElement(d.default.Fragment,null,d.default.createElement("primitive",{object:i}),d.default.createElement("mesh",{ref:r},d.default.createElement("sphereGeometry",{args:[.085,20,20]}),d.default.createElement("meshBasicMaterial",{color:[1.3,.56,.1],toneMapped:!1,transparent:!0,depthWrite:!1})),d.default.createElement("lineSegments",{geometry:l.geometry,frustumCulled:!1},d.default.createElement("lineBasicMaterial",{ref:p,color:X,transparent:!0,opacity:0,depthWrite:!1})),d.default.createElement("points",{geometry:c,frustumCulled:!1},d.default.createElement("pointsMaterial",{ref:u,color:X,size:.09,sizeAttenuation:!0,transparent:!0,opacity:0,depthWrite:!1})),d.default.createElement("lineSegments",{geometry:f,frustumCulled:!1},d.default.createElement("lineBasicMaterial",{ref:a,color:X,transparent:!0,opacity:0,depthWrite:!1})),d.default.createElement("instancedMesh",{ref:s,args:[null,null,Wt.length],frustumCulled:!1},d.default.createElement("sphereGeometry",{args:[.07,14,14]}),d.default.createElement("meshBasicMaterial",{toneMapped:!1})))}function Xt({beat:e,anchors:t}){let n=(0,d.useRef)({});return d.default.createElement("div",{className:"film-layer"},d.default.createElement(de,{dpr:[1,1.75],camera:{fov:It,position:[0,0,9],near:.1,far:400},gl:{antialias:!0,alpha:!0}},d.default.createElement(Xe,{beat:e,anchors:t,labels:n}),d.default.createElement(pe,null,d.default.createElement(me,{mipmapBlur:!0,luminanceThreshold:.74,luminanceSmoothing:.18,intensity:1.05}),d.default.createElement(he,{darkness:.6,offset:.28}))),d.default.createElement("div",{className:"film-labels"},G.map((o,i)=>d.default.createElement("span",{key:o.text,"data-kind":o.kind,ref:l=>{n.current[i]=l}},o.text)),d.default.createElement("div",{"data-kind":"card",ref:o=>{n.current.card=o}},d.default.createElement(ue,{sheets:Jt,extra:Je,"data-theme":"advisory",className:"film-fragment"},d.default.createElement("div",{className:"fragment surface"},d.default.createElement("span",{className:"meta"},d.default.createElement("span",{className:"tag blue"},W.tag),d.default.createElement("span",null,W.age),d.default.createElement("span",{className:"tag amber"},W.impact)),d.default.createElement("h2",null,W.text),d.default.createElement("section",{className:"reader-context"},d.default.createElement("h3",null,W.why),d.default.createElement("p",null,W.relevance)))))))}var w=dt(Ut());function ke(e){return{words:Ct.filter(t=>e>=t.from&&e<t.to).map(t=>t.id).join(","),typed:e<N.from?0:Math.min(N.text.length,Math.ceil(N.text.length*g(e,N.from,N.to))),question:e>=92&&e<N.leave+1.4,leaving:e>=N.leave,answer:e>=it.from&&e<it.to+1,answerLeaving:e>=it.to,evidence:Pt.filter(t=>e>=t.at).length,pages:Dt.filter(t=>e>=t.at).length,stacked:e>=136,pagesGone:e>=146,window:e>=ht.from&&e<ht.to}}var lt=e=>e*100+"vh",We=e=>({left:`calc(50% + ${lt(e.x)})`,top:`calc(50% - ${lt(e.y+e.h)})`,width:lt(e.w),height:lt(e.h)});function Yt({beat:e,anchors:t}){let[n,o]=(0,w.useState)(()=>ke(e())),i=(0,w.useRef)(null),l=(0,w.useRef)(null);return(0,w.useEffect)(()=>{let r,s=JSON.stringify(n),p=(a,f)=>({x:(a-innerWidth/2)/innerHeight,y:(innerHeight/2-f)/innerHeight}),u=()=>{let a=ke(e()),f=JSON.stringify(a);if(f!==s&&(s=f,o(a)),i.current){let c=i.current.getBoundingClientRect();t.current.caret=p(c.right+innerHeight*.012,(c.top+c.bottom)/2)}if(l.current){let c=l.current.getBoundingClientRect(),m=p(c.left,c.bottom+innerHeight*.022);t.current.underline={x:m.x,y:m.y,w:c.width/innerHeight}}r=requestAnimationFrame(u)};return r=requestAnimationFrame(u),()=>cancelAnimationFrame(r)},[]),w.default.createElement("div",{className:"film-layer film-type"},Ct.map(r=>w.default.createElement("p",{key:r.id,className:"film-word","data-place":r.place,"data-on":n.words.split(",").includes(r.id)},r.text)),w.default.createElement("p",{className:"film-question","data-on":n.question&&!n.leaving},w.default.createElement("span",{ref:i},N.text.slice(0,n.typed)),w.default.createElement("span",{className:"film-untyped"},N.text.slice(n.typed))),w.default.createElement("div",{className:"film-answer","data-on":n.answer&&!n.answerLeaving},w.default.createElement("p",null,w.default.createElement("span",{ref:l},it.text)),w.default.createElement("ul",null,Pt.map((r,s)=>w.default.createElement("li",{key:r.text,"data-on":s<n.evidence},r.text)))),w.default.createElement("div",{className:"film-pages","data-stacked":n.stacked,"data-gone":n.pagesGone},Dt.map((r,s)=>w.default.createElement("div",{key:r.word,className:"film-page","data-on":s<n.pages,style:{...We(at[s]),"--shift":lt(-at[s].x-.15),"--tilt":(s-1)*4+"deg"}},w.default.createElement("small",null,r.kind),w.default.createElement("b",null,r.title),w.default.createElement("i",null),w.default.createElement("i",null),w.default.createElement("i",null),w.default.createElement("i",null),w.default.createElement("strong",null,r.word)))),w.default.createElement("div",{className:"film-window","data-on":n.window,style:We(st)},w.default.createElement("img",{src:ht.image,alt:""})))}var ct=new URLSearchParams(location.search),_t=ct.has("t")?Number(ct.get("t")):null;Se(e=>{_t=e});var Qe=_t!==null||ct.has("autostart")||ct.has("mute");window.renderScore=async()=>{let e=new Uint8Array(await(await ve()).arrayBuffer()),t="";for(let n=0;n<e.length;n+=32768)t+=String.fromCharCode(...e.subarray(n,n+32768));return btoa(t)};function Ze(){let[e,t]=(0,L.useState)(_t!==null||ct.has("autostart")),n=(0,L.useRef)(performance.now()),o=(0,L.useRef)(structuredClone(Gt)),i=(0,L.useRef)(null),l=(0,L.useRef)(null),r=()=>_t??(e?Math.max(0,Math.min(96,l.current?l.current.ctx.currentTime-l.current.start:(performance.now()-n.current)/1e3)):0),s=()=>ge(r()),p=()=>{if(l.current?.ctx.close(),l.current=null,!Qe){let u=new AudioContext,a=u.currentTime+.12;l.current={ctx:u,start:a,master:we(u,u.destination,a)}}n.current=performance.now(),t(!0)};return(0,L.useEffect)(()=>{let u=a=>{if((a.key===" "||a.key==="Enter")&&(a.preventDefault(),e||p()),(a.key==="r"||a.key==="R")&&p(),(a.key==="m"||a.key==="M")&&l.current){let f=l.current.master.gain;f.value=f.value?0:xe}(a.key==="f"||a.key==="F")&&(document.fullscreenElement?document.exitFullscreen():i.current.requestFullscreen?.())};return addEventListener("keydown",u),()=>removeEventListener("keydown",u)},[e]),L.default.createElement("div",{className:"film",ref:i,onClick:()=>{e||p()}},L.default.createElement(Xt,{beat:s,anchors:o}),L.default.createElement(Yt,{beat:s,anchors:o}),!e&&L.default.createElement("p",{className:"film-start"},"Press space to begin"))}Promise.all([fe(Jt),document.fonts.load('16px "Source Sans 3"'),document.fonts.load('16px "Source Serif 4"')]).then(()=>(0,Ie.createRoot)(document.getElementById("film-root")).render(L.default.createElement(Ze,null)));
