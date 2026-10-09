import {tr} from '../lib/tool-language.mjs';
"use client";
/* eslint-disable react-hooks/set-state-in-effect -- synchronize readiness/errors with the external WebGL renderer lifecycle */
import {applyPreviewArtwork} from '../lib/preview-artwork';
import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {buildPreviewModel} from '../lib/box-model';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {giftGeometry,previewOptions} from '../lib/gift-preview.mjs';

export type GiftOptions={paperColor:string;surface:string;opening:number};
export type GiftArtwork={id:string;kind:string;face:string;text?:string;src?:string;x:number;y:number;size:number;color:string;finish?:string;fit?:string;hidden?:boolean};
export default function GiftBoxPreview({type="tianlide",dimensions,artworks,options,onChange,studioStage=false}:{studioStage?:boolean;type?:string;dimensions:{length:number;width:number;height:number};artworks:GiftArtwork[];options?:GiftOptions;onChange?:(value:GiftOptions)=>void}){
 const host=useRef<HTMLDivElement>(null),exporter=useRef<(()=>void)|null>(null),view=useRef<{position:THREE.Vector3;target:THREE.Vector3}|null>(null);
 const [local,setLocal]=useState(()=>previewOptions(options)),[error,setError]=useState(''),[ready,setReady]=useState(false);
 const settings=previewOptions(onChange?(options||local):local);
 function change(patch:Partial<GiftOptions>){const next=previewOptions({...settings,...patch});setLocal(next);onChange?.(next)}
 useEffect(()=>{
  if(!host.current)return;setReady(false);setError('');
  const container=host.current;let disposed=false,artReady=false,frame=0;const textures:THREE.Texture[]=[];
  let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});}catch{setError('3D is unavailable. Try a browser with hardware acceleration.');return;}
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-label',`${type} 3D preview — drag to rotate`);container.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.background=new THREE.Color(studioStage?'#294739':'#eeece5');
  const camera=new THREE.PerspectiveCamera(36,1,.01,100);camera.position.set(4,3.7,5);
  const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.minDistance=2;controls.maxDistance=15;controls.maxPolarAngle=Math.PI*.93;
  const pmrem=new THREE.PMREMGenerator(renderer),room=new RoomEnvironment(),environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;room.dispose();pmrem.dispose();
  const ambient=new THREE.HemisphereLight('#ffffff','#8a7e69',.8);scene.add(ambient);
  const key=new THREE.DirectionalLight('#fff5df',2.4);key.position.set(2,7,4);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;key.shadow.normalBias=.025;scene.add(key);const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.16}));floor.rotation.x=-Math.PI/2;floor.position.y=-.02;floor.receiveShadow=true;scene.add(floor);
  const g=giftGeometry({length:dimensions.length,width:dimensions.width,height:dimensions.height}),{l,w,h,scale}=g;const t=["paperbag","tuck"].includes(type)?.5:["airplane","rsc"].includes(type)?1.5:2,c=1;
  const model=new THREE.Group();model.scale.setScalar(scale);scene.add(model);
  const grain=document.createElement('canvas');grain.width=grain.height=128;const gc=grain.getContext('2d')!;const pixels=gc.createImageData(128,128);let seed=17;
  for(let i=0;i<pixels.data.length;i+=4){seed=(seed*16807)%2147483647;const n=120+seed%35;pixels.data.set([n,n,n,255],i)}gc.putImageData(pixels,0,0);
  const bump=new THREE.CanvasTexture(grain);bump.wrapS=bump.wrapT=THREE.RepeatWrapping;bump.repeat.set(5,5);textures.push(bump);
  const paper=new THREE.MeshStandardMaterial({color:settings.paperColor,roughness:settings.surface==='gloss'?.25:.8,bumpMap:bump,bumpScale:.12});
  const {root,surfaces}=buildPreviewModel(type,l,w,h,t,c,settings.opening,paper);model.add(root);
  applyPreviewArtwork(surfaces,artworks,settings.paperColor,textures,()=>!disposed).then(()=>{if(!disposed){artReady=true;setReady(true)}}).catch(()=>{if(!disposed)setError('Some artwork could not load. Please upload it again.')});
  const bounds=new THREE.Box3().setFromObject(model),center=bounds.getCenter(new THREE.Vector3()),extent=bounds.getSize(new THREE.Vector3());floor.position.y=bounds.min.y-.02;controls.target.copy(center);const distance=Math.max(extent.x,extent.y,extent.z)*(studioStage?2.1:2.8);if(view.current){camera.position.copy(view.current.position);}camera.position.sub(center).normalize().multiplyScalar(Math.max(distance,studioStage?4:5)).add(center);
  function resize(){
   const width=Math.max(1,container.clientWidth),height=Math.max(studioStage?240:360,container.clientHeight);
   renderer.setSize(width,height);camera.aspect=width/height;
   // Fit every corner in both axes; a narrow mobile canvas must not crop the box.
   const direction=camera.position.clone().sub(center).normalize(),right=new THREE.Vector3().crossVectors(camera.up,direction).normalize(),up=new THREE.Vector3().crossVectors(direction,right).normalize();
   const tanY=Math.tan(THREE.MathUtils.degToRad(camera.fov/2)),tanX=tanY*camera.aspect;let fit=0;
   for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z]){const v=new THREE.Vector3(x,y,z).sub(center),depth=v.dot(direction);fit=Math.max(fit,Math.abs(v.dot(right))/tanX+depth,Math.abs(v.dot(up))/tanY+depth)}
   camera.position.copy(center).addScaledVector(direction,Math.max(2,fit*1.15));controls.maxDistance=Math.max(15,fit*3);camera.updateProjectionMatrix();
  }
  const observer=new ResizeObserver(resize);observer.observe(container);resize();
  function animate(){if(disposed)return;controls.update();renderer.render(scene,camera);frame=requestAnimationFrame(animate)}animate();
  const capture=()=>{const size=renderer.getSize(new THREE.Vector2()),pixelRatio=renderer.getPixelRatio();renderer.setPixelRatio(1);renderer.setSize(2400,Math.round(2400/camera.aspect),false);renderer.render(scene,camera);const url=renderer.domElement.toDataURL('image/png');renderer.setPixelRatio(pixelRatio);renderer.setSize(size.x,size.y);return url};
  const onCapture=(event:Event)=>{if(artReady)(event as CustomEvent).detail?.receive?.(capture())};window.addEventListener('mtt-capture-preview',onCapture);
  exporter.current=()=>{const url=capture();const link=document.createElement('a');link.download=`MTT-${type}-效果预览.png`;link.href=url;link.click()};
  return()=>{window.removeEventListener('mtt-capture-preview',onCapture);view.current={position:camera.position.clone(),target:controls.target.clone()};disposed=true;cancelAnimationFrame(frame);observer.disconnect();controls.dispose();environment.dispose();scene.traverse(o=>{const m=o as THREE.Mesh;m.geometry?.dispose();if(m.material)(Array.isArray(m.material)?m.material:[m.material]).forEach(v=>v.dispose())});textures.forEach(t=>t.dispose());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();exporter.current=null};
 },[type,dimensions.length,dimensions.width,dimensions.height,artworks,settings.paperColor,settings.surface,settings.opening,studioStage]);
 return <div className={`gift-preview ${studioStage?'studio-preview':''}`}><div className="gift-preview-heading"><div><strong>{({rsc:tr("Shipping carton"),airplane:tr("Mailer box"),tianlide:tr("Lift-off lid box"),drawer:tr("Drawer box"),flip:tr("Hinged lid box"),book:tr("Book-style box"),foldable_flip:tr("Fold-flat hinged box"),window_flip:tr("Window hinged box"),double_door:tr("Double-door box"),shoulder:tr("Shoulder box"),tuck:tr("Tuck-end carton"),paperbag:tr("Paper shopping bag")} as Record<string,string>)[type]} · 3D preview</strong><small>{tr("Drag to rotate, scroll to zoom, use the opening slider.")}</small></div><button disabled={!ready||!!error} onClick={()=>exporter.current?.()}>{tr("Download high-resolution PNG")}</button></div><div ref={host} className="gift-canvas"/>{error&&<p role="alert">{error}</p>}<div className="gift-controls">{type!=="paperbag"&&<button onClick={()=>change({opening:settings.opening>0?0:55})}>{settings.opening>0?tr("Close box"):tr("Open box to inspect structure")}</button>}<label>{tr("Paper color")}<input aria-label="Paper color" type="color" value={settings.paperColor} onChange={e=>change({paperColor:e.target.value})}/></label><label>{tr("Surface finish")}<select value={settings.surface} onChange={e=>change({surface:e.target.value})}><option value="matte">{tr("Matte paper")}</option><option value="gloss">{tr("Gloss paper")}</option></select></label>{type!=="paperbag"&&<label>{type==="drawer"?tr("Slide open"):tr("Open lid")} {settings.opening}%<input aria-label="Opening amount" type="range" min="0" max="100" value={settings.opening} onChange={e=>change({opening:Number(e.target.value)})}/></label>}</div><p className="gift-note">Proportions follow internal dimensions. Illustrative thickness: rigid board 2 mm, carton/bag 0.5 mm, corrugated 1.5 mm; mating clearance 2 mm per side. Window, double-door and flap top faces do not support full-face artwork. Use Folding preview for the flat-to-assembled structural illustration. Materials and foil are visual simulations; physical sampling is required.</p></div>
}
