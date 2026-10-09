"use client";
import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {applyPreviewArtwork,type PreviewArtwork,type PreviewSurface} from '../lib/preview-artwork';
import {createFoldModel} from '../lib/fold-scene.mjs';
type BoxData=ReturnType<typeof import('../lib/packaging.mjs').buildBox>;
export default function FoldingPreview({box,visualOptions,artworks=[]}:{box:BoxData;artworks?:PreviewArtwork[];visualOptions?:{paperColor:string;surface:string}}){
 const host=useRef<HTMLDivElement>(null),progress=useRef(0),play=useRef(false),resetView=useRef<()=>void>(()=>{});
 const [value,setValue]=useState(0),[playing,setPlaying]=useState(false),[error,setError]=useState('');
 const stage=value===0?'Flat reference panels':value<64?'Fold panels':value<94?'Assemble components':'Assembled box';
 useEffect(()=>{
  if(!host.current)return;const element=host.current;let renderer:THREE.WebGLRenderer|undefined,frame=0,observer:ResizeObserver|undefined,controls:OrbitControls|undefined;const scene=new THREE.Scene(),textures:THREE.Texture[]=[];let alive=true;let captureListener:((e:Event)=>void)|undefined;
  progress.current=0;play.current=false;setValue(0);setPlaying(false);setError('');
  try{
   renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;renderer.shadowMap.enabled=true;element.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label',`${box.id} flat-to-assembled animation`);
   scene.background=new THREE.Color('#f2f0e9');scene.add(new THREE.HemisphereLight('#ffffff','#a2947b',2.4));const light=new THREE.DirectionalLight('#fff3df',3);light.position.set(-500,1400,900);scene.add(light);
   const paper=new THREE.MeshStandardMaterial({color:visualOptions?.paperColor||(['rsc','airplane','paperbag'].includes(box.id)?'#b99a70':'#315e50'),roughness:visualOptions?.surface==='gloss'?.22:.8,side:THREE.DoubleSide});
   const t=['tuck','paperbag'].includes(box.id)?.5:['airplane','rsc'].includes(box.id)?1.5:2;
   const model=createFoldModel(box,paper,t);scene.add(model.root);model.update(0);applyPreviewArtwork(model.surfaces as Record<string,PreviewSurface>,artworks,visualOptions?.paperColor||'#315e50',textures,()=>alive).catch(()=>{if(alive)setError('Some artwork could not load. Re-upload it in the design editor.')});
   const camera=new THREE.PerspectiveCamera(36,1,.1,100000);controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.maxPolarAngle=Math.PI*.94;
   let autoFrame=true;controls.addEventListener('start',()=>{autoFrame=false});resetView.current=()=>{autoFrame=true};
   const resize=()=>{if(!renderer)return;const width=Math.max(1,element.clientWidth),height=Math.max(280,Math.min(480,width*.72));renderer.setSize(width,height);element.style.height=`${height}px`;camera.aspect=width/height;camera.updateProjectionMatrix()};observer=new ResizeObserver(resize);observer.observe(element);resize();
   captureListener=(event:Event)=>{if(!renderer)return;const size=renderer.getSize(new THREE.Vector2()),ratio=renderer.getPixelRatio();try{renderer.setPixelRatio(1);renderer.setSize(2400,Math.round(2400/camera.aspect),false);renderer.render(scene,camera);(event as CustomEvent).detail?.receive?.(renderer.domElement.toDataURL('image/png'))}finally{renderer.setPixelRatio(ratio);renderer.setSize(size.x,size.y)}};window.addEventListener('mtt-capture-preview',captureListener);
   let previous=performance.now(),lastUI=0;
   const animate=(now:number)=>{frame=requestAnimationFrame(animate);const dt=Math.min(now-previous,100);previous=now;
    if(play.current){progress.current=Math.min(100,progress.current+dt/125);if(now-lastUI>70||progress.current===100){setValue(progress.current);lastUI=now}if(progress.current===100){play.current=false;setPlaying(false)}}
    model.update(progress.current);
    if(autoFrame){const bounds=new THREE.Box3().setFromObject(model.root),center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());const aspect=Math.min(camera.aspect,1),span=Math.max(size.x,size.y,size.z,40);const mix=Math.min(1,progress.current/70);const direction=new THREE.Vector3(.08+mix*.95,1.8-mix*.95,.05+mix*1.15).normalize();controls!.target.copy(center);camera.position.copy(center).addScaledVector(direction,span*(2.1/aspect));camera.near=Math.max(.1,span/10000);camera.far=span*100;camera.updateProjectionMatrix();}
    controls?.update();renderer?.render(scene,camera);
   };frame=requestAnimationFrame(animate);
  }catch{setError('Animation is unavailable in this browser. The dimensioned flat layout is still available.');}
  return()=>{if(captureListener)window.removeEventListener('mtt-capture-preview',captureListener);alive=false;textures.forEach(t=>t.dispose());cancelAnimationFrame(frame);observer?.disconnect();controls?.dispose();scene.traverse(o=>{const m=o as THREE.Mesh;m.geometry?.dispose();if(m.material)(Array.isArray(m.material)?m.material:[m.material]).forEach(x=>x.dispose())});renderer?.dispose();renderer?.forceContextLoss();renderer?.domElement.remove();resetView.current=()=>{}};
 },[box.id,box.dimensions.length,box.dimensions.width,box.dimensions.height,artworks,visualOptions?.paperColor,visualOptions?.surface]);
 function seek(n:number){play.current=false;setPlaying(false);progress.current=n;setValue(n);resetView.current()}
 function toggle(){if(progress.current===100)seek(0);play.current=!play.current;setPlaying(play.current)}
 return <div className="fold-demo"><div className="fold-heading"><strong>From flat panels to your box</strong><span>{box.dimensions.length} × {box.dimensions.width} × {box.dimensions.height} mm</span></div><div ref={host} style={{width:'100%',minHeight:280}}/>{error&&<p role="alert">{error}</p>}<p aria-live="polite"><strong>{stage}</strong> · {Math.round(value)}%</p><label>Assembly progress<input aria-label="Folding progress" type="range" min="0" max="100" value={value} onChange={e=>seek(Number(e.target.value))}/></label><div className="fold-controls"><button disabled={!!error} onClick={toggle}>{playing?'Pause':'Play assembly'}</button><button disabled={!!error} onClick={()=>{seek(0);play.current=true;setPlaying(true)}}>Replay</button><button onClick={()=>seek(0)}>Flat panels</button><button onClick={()=>seek(65)}>Folded parts</button><button onClick={()=>seek(100)}>Assembled box</button><button onClick={()=>resetView.current()}>Reset view</button></div><p className="fold-note">Structural assembly illustration. Rigid board parts are joined by wrapping and assembly, not scored like a carton. Glue, wrapping, locking tabs, bag-bottom gussets and fold-flat corner construction require engineering review and a physical sample. This is not a production-ready dieline or a collision-tested manufacturing sequence.</p></div>
}
