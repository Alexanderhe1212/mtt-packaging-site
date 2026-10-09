import * as THREE from 'three';
import {buildBox} from './packaging.mjs';
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t)};
export function hingePlacement(parent,panel){
 const edge=panel.fold.edge;
 const hx=edge==='left'?-parent.w/2:edge==='right'?parent.w/2:panel.x+panel.w/2-parent.x-parent.w/2;
 const hy=edge==='top'?-parent.h/2:edge==='bottom'?parent.h/2:panel.y+panel.h/2-parent.y-parent.h/2;
 return {axis:edge==='left'||edge==='right'?'y':'x',hinge:[hx,hy,0],center:[edge==='left'?-panel.w/2:edge==='right'?panel.w/2:0,edge==='top'?-panel.h/2:edge==='bottom'?panel.h/2:0,0]};
}
export function createFoldModel(box,paper,thickness=1){
 const root=new THREE.Group();root.rotation.x=-Math.PI/2;root.rotation.z=['rsc','tuck','paperbag'].includes(box.id)?0:Math.PI;
 const components=[],nodes=[],surfaces={},details=[];let offsetY=64,maxWidth=0;
 for(const piece of box.pieces){
  const group=new THREE.Group();root.add(group);const rootPanel=piece.panels[0],centers=new Map();
  const flat=new THREE.Vector3(64-piece.bounds.x+rootPanel.x+rootPanel.w/2,offsetY-piece.bounds.y+rootPanel.y+rootPanel.h/2,0);
  offsetY+=piece.bounds.h+64;maxWidth=Math.max(maxWidth,piece.bounds.w+128);
  const target=new THREE.Vector3(...piece.pose.position);if(piece.kind==='cover')target.z-=thickness;
  const rotation=new THREE.Quaternion().setFromEuler(new THREE.Euler(...piece.pose.rotation));
  components.push({group,flat,target,rotation,piece});
  for(const p of piece.panels){
   const center=new THREE.Group();center.name=`${piece.id}/${p.id}`;centers.set(p.id,center);
   if(p.fold){const parent=piece.panels.find(v=>v.id===p.fold.parent),placement=hingePlacement(parent,p),hinge=new THREE.Group();hinge.position.set(...placement.hinge);centers.get(parent.id).add(hinge);center.position.set(...placement.center);hinge.add(center);nodes.push({hinge,axis:placement.axis,panel:p,piece:piece.id,center});}
   else group.add(center);
   const shape=new THREE.Shape();shape.moveTo(-p.w/2,-p.h/2);shape.lineTo(p.w/2,-p.h/2);shape.lineTo(p.w/2,p.h/2);shape.lineTo(-p.w/2,p.h/2);shape.closePath();
   if(p.window){const v=p.window,hole=new THREE.Path(),x=v.x-p.w/2,y=v.y-p.h/2;hole.moveTo(x,y);hole.lineTo(x,y+v.h);hole.lineTo(x+v.w,y+v.h);hole.lineTo(x+v.w,y);hole.closePath();shape.holes.push(hole);
    const glass=new THREE.Mesh(new THREE.PlaneGeometry(v.w,v.h),new THREE.MeshPhysicalMaterial({color:'#b5d6cd',transparent:true,opacity:.22,roughness:.15,side:THREE.DoubleSide}));glass.position.set(x+v.w/2,y+v.h/2,0);center.add(glass);
   }
   const geometry=new THREE.ExtrudeGeometry(shape,{depth:thickness,bevelEnabled:false,steps:1});geometry.translate(0,0,-thickness/2);
   const material=p.face==='glue'?new THREE.MeshStandardMaterial({color:'#c8ac76',roughness:.9,side:THREE.DoubleSide}):paper;
   const mesh=new THREE.Mesh(geometry,material);mesh.castShadow=true;mesh.receiveShadow=true;if(p.face==='glue')mesh.position.z=thickness*1.2;center.add(mesh);
   if(p.fold){const edge=p.fold.edge,x=edge==='left'?p.w/2:edge==='right'?-p.w/2:0,y=edge==='top'?p.h/2:edge==='bottom'?-p.h/2:0;const horizontal=edge==='top'||edge==='bottom';const points=horizontal?[[-p.w/2,y],[p.w/2,y]]:[[x,-p.h/2],[x,p.h/2]];for(const side of [-1,1]){const line=new THREE.Line(new THREE.BufferGeometry().setFromPoints(points.map(v=>new THREE.Vector3(v[0],v[1],side*(thickness/2+.05)))),new THREE.LineDashedMaterial({color:'#c8ac76',dashSize:3,gapSize:2}));line.computeLineDistances();center.add(line)}}
   const edges=new THREE.LineSegments(new THREE.EdgesGeometry(geometry,30),new THREE.LineBasicMaterial({color:'#897b5e',transparent:true,opacity:.38}));mesh.add(edges);
   for(const line of p.creases||[]){const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(line[0]-p.w/2,line[1]-p.h/2,thickness/2+.06),new THREE.Vector3(line[2]-p.w/2,line[3]-p.h/2,thickness/2+.06)]);const crease=new THREE.Line(g,new THREE.LineDashedMaterial({color:'#b69a63',dashSize:3,gapSize:2}));crease.computeLineDistances();center.add(crease);}
   if(!p.window&&!surfaces[p.face]&&['front','back','left','right','top','bottom'].includes(p.face))surfaces[p.face]={parent:center,width:p.w,height:p.h,position:[0,0,p.outside*(thickness/2+.08)],rotation:[0,p.outside===-1?Math.PI:0,0]};
  }
  if(piece.handles){const {length:l,width:w,height:h}=piece.handles,handles=new THREE.Group(),r=Math.min(l*.22,h*.25),cord=new THREE.MeshStandardMaterial({color:'#b69a63',roughness:.8});
   for(const y of [-w/2,w/2]){const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(-r,y,h),new THREE.Vector3(-r,y,h+r),new THREE.Vector3(0,y,h+r*1.6),new THREE.Vector3(r,y,h+r),new THREE.Vector3(r,y,h)]);handles.add(new THREE.Mesh(new THREE.TubeGeometry(curve,32,Math.max(.6,thickness),8,false),cord));}
   root.add(handles);details.push(handles);
  }
 }
 // Artwork maps to the actual moving panel, including the separate lid/sleeve.
 // Split carton flaps and two doors have no single continuous top artwork face.
 if(['rsc','double_door','window_flip'].includes(box.id))delete surfaces.top;
 const flatCenter=new THREE.Vector3(maxWidth/2,offsetY/2,0);components.forEach(c=>c.flat.sub(flatCenter));
 function update(percent,opening=0){
  const p=Math.max(0,Math.min(1,Number(percent)/100||0)),open=Math.max(0,Math.min(1,Number(opening)/100||0)),assembly=smooth((p-.64)/.3);
  for(const n of nodes){const folded=smooth((p-n.panel.fold.stage)/.18);n.hinge.rotation[n.axis]=n.panel.fold.angle*folded+(n.panel.openAngle||0)*open*assembly;}
  for(const c of components){c.group.position.lerpVectors(c.flat,c.target,assembly);c.group.quaternion.identity().slerp(c.rotation,assembly);if(components.length>1&&c!==components[0])c.group.position.z+=Math.sin(Math.PI*assembly)*(box.dimensions.height+30);if(c.piece.openMove)c.group.position.addScaledVector(new THREE.Vector3(...c.piece.openMove),open*assembly);}
  for(const d of details){d.visible=p>.94;d.scale.setScalar(smooth((p-.94)/.06));}
  root.updateMatrixWorld(true);
 }
 update(100);
 // Keep artwork upright on vertical faces and readable from the front of horizontal faces.
 for(const [face,s] of Object.entries(surfaces)){let best=0,score=-Infinity;for(let quarter=0;quarter<4;quarter++){const rotation=new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(s.rotation[0],s.rotation[1],quarter*Math.PI/2)),world=s.parent.matrixWorld.clone().multiply(rotation),axis=new THREE.Vector3(...(['top','bottom'].includes(face)?[1,0,0]:[0,1,0])).transformDirection(world),value=['top','bottom'].includes(face)?axis.x:axis.y;if(value>score){score=value;best=quarter}}s.rotation[2]=best*Math.PI/2;if(best%2)[s.width,s.height]=[s.height,s.width];}
 return {root,surfaces,update,nodes,components};
}