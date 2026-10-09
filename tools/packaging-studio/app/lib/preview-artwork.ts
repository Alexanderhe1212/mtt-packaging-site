import * as THREE from 'three';
import {imagePlacement} from './image-placement.mjs';
export type PreviewSurface={parent:THREE.Group;width:number;height:number;position:[number,number,number];rotation:[number,number,number]};
export type PreviewArtwork={id:string;kind:string;face:string;text?:string;src?:string;x:number;y:number;size:number;color:string;finish?:string;fit?:string;hidden?:boolean};
export async function applyPreviewArtwork(surfaces:Record<string,PreviewSurface>,artworks:PreviewArtwork[],paperColor:string,textures:THREE.Texture[],alive:()=>boolean){
   for(const [face,s] of Object.entries(surfaces))for(const [layerIndex,art] of artworks.entries()){
    if(art.hidden||art.face!==face)continue;const finish=art.finish||'print',items=[art];
    const canvas=document.createElement('canvas');const ratio=s.width/s.height;canvas.width=ratio>=1?1536:Math.max(1,Math.round(1536*ratio));canvas.height=ratio>=1?Math.max(1,Math.round(1536/ratio)):1536;
    const ctx=canvas.getContext('2d')!;
    for(const a of items){
     const x=canvas.width*a.x/100,y=canvas.height*a.y/100,size=canvas.width*a.size/100;
     if(a.kind==='text'){ctx.font=`600 ${size/Math.max(2,(a.text||'').length*.62)}px Georgia, serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=finish==='print'?a.color:'#ffffff';ctx.fillText(a.text||'',x,y,size);}
     else if(a.src){const img=new Image();await new Promise<void>(resolve=>{img.onload=()=>resolve();img.onerror=()=>resolve();img.src=a.src!});if(!alive())return;if(img.naturalWidth){const rect=imagePlacement(img.naturalWidth,img.naturalHeight,canvas.width,canvas.height,a.size,a.fit||'contain');ctx.save();if(a.fit==='cover'){ctx.beginPath();ctx.rect(x-rect.boxWidth/2,y-rect.boxHeight/2,rect.boxWidth,rect.boxHeight);ctx.clip()}ctx.drawImage(img,x-rect.width/2,y-rect.height/2,rect.width,rect.height);ctx.restore()}}
    }
    if(finish!=='print'){ctx.globalCompositeOperation='source-in';ctx.fillStyle='#ffffff';ctx.fillRect(0,0,canvas.width,canvas.height);}
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;textures.push(texture);
    const material=new THREE.MeshStandardMaterial({map:texture,transparent:true,depthWrite:false,metalness:['gold','silver'].includes(finish)?1:0,roughness:finish==='uv'?.06:finish==='print'||finish==='emboss'?.72:.23,bumpMap:finish==='emboss'?texture:null,bumpScale:finish==='emboss'?.8:0,color:finish==='gold'?'#dfb651':finish==='silver'?'#eeeeef':['uv','emboss'].includes(finish)?paperColor:'#ffffff',polygonOffset:true,polygonOffsetFactor:-2});
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(s.width,s.height),material);mesh.position.set(...s.position);mesh.rotation.set(...s.rotation);mesh.renderOrder=layerIndex+1;s.parent.add(mesh);
   }
}
