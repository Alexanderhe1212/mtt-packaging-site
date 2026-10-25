import {useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {buildPreviewModel} from '../lib/box-model';
import type {ThumbnailProps} from './BoxThumbnail';
const cache=new Map<string,string>();
// Thumbnail jobs run sequentially on the main thread; share one offscreen GPU context.
let thumbnailRenderer:THREE.WebGLRenderer|undefined;
function getThumbnailRenderer(){
 if(!thumbnailRenderer){
  thumbnailRenderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
  thumbnailRenderer.setSize(720,500);thumbnailRenderer.setPixelRatio(1);
  thumbnailRenderer.shadowMap.enabled=true;thumbnailRenderer.shadowMap.type=THREE.PCFSoftShadowMap;
  thumbnailRenderer.outputColorSpace=THREE.SRGBColorSpace;thumbnailRenderer.toneMapping=THREE.ACESFilmicToneMapping;thumbnailRenderer.toneMappingExposure=1.35;
  window.addEventListener('pagehide',()=>{thumbnailRenderer?.dispose();thumbnailRenderer?.forceContextLoss();thumbnailRenderer=undefined},{once:true});
 }
 return thumbnailRenderer;
}
export default function DynamicBoxThumbnail({type,decorative=false,dimensions,options,label}:ThumbnailProps&{label:string}){
 const cacheKey=JSON.stringify([type,dimensions,options]);
 const [visible,setVisible]=useState(false);
 const [src,setSrc]=useState(cache.get(cacheKey)||''),[failed,setFailed]=useState(false);const host=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(!host.current)return;if(!('IntersectionObserver' in window)){setVisible(true);return}const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setVisible(true);observer.disconnect()}},{rootMargin:'120px'});observer.observe(host.current);return()=>observer.disconnect()},[]);
 useEffect(()=>{if(!visible)return;setSrc(cache.get(cacheKey)||'');setFailed(false);if(cache.has(cacheKey))return;let cancelled=false;const timer=setTimeout(()=>{let renderer:THREE.WebGLRenderer|undefined;const scene=new THREE.Scene();try{
 renderer=getThumbnailRenderer();
 scene.background=new THREE.Color('#f4f1ea');scene.add(new THREE.HemisphereLight('#ffffff','#b3aa98',2));const light=new THREE.DirectionalLight('#fff3df',3);light.position.set(-170,380,260);light.castShadow=true;light.shadow.mapSize.set(1024,1024);Object.assign(light.shadow.camera,{left:-350,right:350,top:350,bottom:-350,near:1,far:1000});light.shadow.bias=-.001;scene.add(light);
 const tall=['tuck','paperbag'].includes(type),l=dimensions?.length||(tall?110:220),w=dimensions?.width||(tall?65:150),h=dimensions?.height||(tall?180:75);const paper=new THREE.MeshStandardMaterial({color:options?.paperColor||(['airplane','rsc','paperbag'].includes(type)?'#b99a70':'#315e50'),roughness:options?.surface==='gloss'?.22:.78});const {root}=buildPreviewModel(type,l,w,h,['airplane','rsc'].includes(type)?2:1.8,1,options?.opening??55,paper);scene.add(root);
 const bounds=new THREE.Box3().setFromObject(root),center=bounds.getCenter(new THREE.Vector3()),size=bounds.getSize(new THREE.Vector3());const span=Math.max(size.x,size.y,size.z)*1.3;const camera=new THREE.PerspectiveCamera(35,720/500,1,3000);camera.position.copy(center).add(new THREE.Vector3(span*1.25,span*.9,span*1.65));camera.lookAt(center);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(2500,2500),new THREE.ShadowMaterial({opacity:.14}));floor.rotation.x=-Math.PI/2;floor.position.y=bounds.min.y-.3;floor.receiveShadow=true;scene.add(floor);renderer.render(scene,camera);const url=renderer.domElement.toDataURL('image/webp',.88);cache.set(cacheKey,url);if(!cancelled)setSrc(url);
 }catch{if(!cancelled)setFailed(true)}finally{scene.traverse(o=>{if(o instanceof THREE.DirectionalLight)o.shadow.dispose();const m=o as THREE.Mesh;m.geometry?.dispose();if(m.material)(Array.isArray(m.material)?m.material:[m.material]).forEach(x=>x.dispose())});renderer?.renderLists.dispose()}},0);return()=>{cancelled=true;clearTimeout(timer)}},[cacheKey,visible]);
 return <div ref={host} className={`box-thumb box-illustration box-thumb-${type}`} style={{aspectRatio:'36 / 25',overflow:'hidden',background:'#f4f1ea',borderRadius:12}}>{src?<img src={src} alt={decorative?'':`${label} — illustrative assembled structure`} style={{width:'100%',height:'100%',objectFit:'contain'}}/>:<p>{failed?'Preview unavailable — ': 'Loading preview — '}{label}</p>}</div>
}
