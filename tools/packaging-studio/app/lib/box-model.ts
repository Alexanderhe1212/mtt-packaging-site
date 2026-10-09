import * as THREE from 'three';
import {buildBox} from './packaging.mjs';
import {createFoldModel} from './fold-scene.mjs';
type Surface={parent:THREE.Group;width:number;height:number;position:[number,number,number];rotation:[number,number,number]};
export function buildPreviewModel(type:string,l:number,w:number,h:number,t:number,_clearance:number,opening:number,paper:THREE.Material){
 const model=createFoldModel(buildBox(type,{length:l,width:w,height:h}),paper,t);model.update(100,opening);
 return {root:model.root,surfaces:model.surfaces as Record<string,Surface>};
}
