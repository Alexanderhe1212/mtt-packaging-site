// Millimetre reference panels. Fold and assembly poses are shared by SVG and both 3D views.
// Allowances below are editable modelling assumptions, not factory standards.
export const STRUCTURE_ASSUMPTIONS={clearance:2,glue:15,tongue:20,hem:25};
const rad=d=>d*Math.PI/180;
export function structurePieces(type,L,W,H,options={}){
 const a={...STRUCTURE_ASSUMPTIONS,...options},pieces=[];
 function start(id,name,w,h,face='bottom',pose={position:[0,0,0],rotation:[0,0,0]}){
  const p={id,name,kind:'board',notes:[],pose,panels:[{id:'root',name:face==='bottom'?'底面':'正面',x:0,y:0,w,h,face,outside:-1}]};pieces.push(p);return p;
 }
 function add(p,id,name,parent,edge,w,h,face,angle,stage=.1,extra={}){
  const q=p.panels.find(v=>v.id===parent);let x=q.x+(q.w-w)/2,y=q.y+(q.h-h)/2;
  if(edge==='left')x=q.x-w;if(edge==='right')x=q.x+q.w;if(edge==='top')y=q.y-h;if(edge==='bottom')y=q.y+q.h;
  const node={id,name,x,y,w,h,face,outside:-1,fold:{parent,edge,angle:rad(angle),stage},...extra};p.panels.push(node);return node;
 }
 function tray(id,name,l,w,h,inverted=false,z=0){
  const p=start(id,name,l,w,'bottom',{position:[0,0,z],rotation:[0,0,0]});p.kind='greyboard';const s=inverted?-1:1;
  if(inverted)Object.assign(p.panels[0],{face:'top',name:'盖面',outside:1});
  add(p,'front','前面','root','bottom',l,h,'front',s*90,.08);
  add(p,'back','后面','root','top',l,h,'back',s*-90,.08);
  add(p,'left','左面','root','left',h,w,'left',s*90,.2);
  add(p,'right','右面','root','right',h,w,'right',s*-90,.2);return p;
 }
 function cover(id,name,l,w,h,mode='back'){
  const p=start(id,name,l,w);p.kind='cover';
  if(mode==='side'){
   add(p,'spine','书脊','root','left',h,w,'spine',90,.1);
   add(p,'lid','封面','spine','left',l,w,'top',90,.38,{openAngle:rad(-125)});
  }else if(mode==='doors'){
   for(const [edge,s]of [['left',1],['right',-1]]){
    add(p,`spine-${edge}`,'侧脊','root',edge,h,w,'spine',s*90,.1);
    add(p,`door-${edge}`,edge==='left'?'左门':'右门',`spine-${edge}`,edge,l/2,w,`door-${edge}`,s*90,.38,{openAngle:rad(-s*125)});
   }
  }else{
   add(p,'spine','连接脊','root','top',l,h,'spine',-90,.1);
   add(p,'lid','盖面','spine','top',l,w,'top',-90,.38,{openAngle:rad(125)});
   if(type!=='window_flip')add(p,'closure','前搭扣','lid','top',l,Math.min(h*.4,a.tongue),'closure',-90,.52);
  }return p;
 }
 function strip(id,name,l,w,h,{bag=false,collar=false,tuck=false,z=0}={}){
  const p=start(id,name,l,h,'front',{position:[0,-w/2,z+h/2],rotation:[-Math.PI/2,0,0]});
  const widths=[l,w,l,w],faces=['front','right','back','left'];
  for(let i=1;i<4;i++)add(p,`side-${i}`,i===2?'背面':'侧面',i===1?'root':`side-${i-1}`,'right',widths[i],h,faces[i],-90,.04+i*.06);
  add(p,'glue','糊口','root','left',Math.min(a.glue,w*.25),h,'glue',90,.3);
  if(collar)return p;
  for(let i=0;i<4;i++){
   const parent=i===0?'root':`side-${i}`;
   if(bag){
    add(p,`hem-${i}`,'袋口折边',parent,'top',widths[i],Math.min(a.hem,h*.18),'hem',-180,.4);
    add(p,`bottom-${i}`,'袋底折片',parent,'bottom',widths[i],w*(i%2?.48:.6),'bottom',90,.28+(i%2?0:.08),{outside:1});
    if(i%2)p.panels.find(n=>n.id===parent).creases=[[widths[i]/2,0,widths[i]/2,h]];
   }else if(tuck){
    if(i===0||i===2){
     const edge=i===0?'top':'bottom',sign=i===0?-1:1;
     add(p,`${edge}-${i}`,i===0?'上盖':'下盖',parent,edge,l,w,i===0?'top':'bottom',sign*90,.4,{outside:-1,openAngle:i===0?rad(120):0});
     add(p,`tongue-${i}`,'插舌',`${edge}-${i}`,edge,l,Math.min(a.tongue,h*.22),'tongue',sign*90,.53);
    }else for(const edge of ['top','bottom'])add(p,`${edge}-${i}`,'防尘翼',parent,edge,w,Math.min(w*.48,l*.3),'dust',edge==='top'?-90:90,.28,{openAngle:edge==='top'?rad(100):0});
   }else{
    for(const edge of ['top','bottom'])add(p,`${edge}-${i}`,edge==='top'?'上摇盖':'下摇盖',parent,edge,widths[i],w/2,edge==='top'?'top':'bottom',edge==='top'?-90:90,.28+(i%2?0:.12),{outside:1,openAngle:edge==='top'?rad(120):0});
   }
  }
  if(bag){p.handles={length:l,width:w,height:h};p.notes.push('袋底搭接、风琴褶与提绳孔为结构示意，需按承重要求打样');}
  return p;
 }
 const gap=a.clearance*2;
 if(type==='tianlide'){
  tray('base','下盒',L,W,H);const lid=tray('lid','上盖',L+gap,W+gap,Math.max(10,H*.45),true,H);lid.openMove=[0,0,H+30];
 }else if(type==='drawer'){
  const inner=tray('drawer','内抽',L,W,H);inner.openMove=[0,W*.8,0];
  const sleeve=start('sleeve','外套',L+gap,W+gap);sleeve.kind='cover';
  add(sleeve,'left','左侧','root','left',H+gap,W+gap,'left',90,.1);
  add(sleeve,'top','顶面','left','left',L+gap,W+gap,'top',90,.25);
  add(sleeve,'right','右侧','top','left',H+gap,W+gap,'right',90,.4);
  add(sleeve,'glue','粘口','right','left',a.glue,W+gap,'glue',90,.52);
 }else if(['flip','book','foldable_flip','window_flip','double_door'].includes(type)){
  const base=tray('base','内盒',L,W,H);
  if(type==='foldable_flip'){
   for(const id of ['front','back']){const p=base.panels.find(v=>v.id===id),d=Math.min(H,L*.3);p.creases=[[0,0,d,H],[L,0,L-d,H]];}
   base.notes.push('折叠角连接与可压平结构为参考，裱纸铰接及角贴片需结构复核');
  }
  const c=cover('cover',type==='book'?'书壳':type==='double_door'?'双门外壳':'翻盖外壳',L+gap,W+gap,H+gap,type==='book'?'side':type==='double_door'?'doors':'back');
  if(type==='window_flip'){const p=c.panels.find(v=>v.id==='lid');p.window={x:p.w*.2,y:p.h*.2,w:p.w*.6,h:p.h*.6};c.notes.push('PET 开窗位置和尺寸为可视化建议');}
 }else if(type==='shoulder'){
  tray('base','下盒',L,W,H*.65);
  strip('collar','内围边',L-gap,W-gap,H*.75,{collar:true,z:H*.12});
  const lid=tray('lid','上盖',L+gap,W+gap,H*.35,true,H);lid.openMove=[0,0,H*.8+30];
 }else if(type==='airplane'){
  const p=tray('body','飞机盒盒片',L,W,H);p.kind='corrugated';
  add(p,'lid','上盖','back','top',L,W,'top',-90,.38,{openAngle:rad(120)});
  add(p,'tongue','前插舌','lid','top',L,Math.min(H*.6,a.tongue),'tongue',-90,.52);
  add(p,'ear-left','左插翼','lid','left',Math.min(H*.6,W*.25),W,'ear',90,.48);
  add(p,'ear-right','右插翼','lid','right',Math.min(H*.6,W*.25),W,'ear',-90,.48);
 }else if(type==='rsc')strip('body','运输箱箱片',L,W,H);
 else if(type==='tuck')strip('body','插口盒盒片',L,W,H,{tuck:true});
 else if(type==='paperbag')strip('body','手提袋袋片',L,W,H,{bag:true});
 else throw new Error(`Unknown structure: ${type}`);
 for(const p of pieces){const xs=p.panels.map(n=>n.x),ys=p.panels.map(n=>n.y);const x=Math.min(...xs),y=Math.min(...ys);p.bounds={x,y,w:Math.max(...p.panels.map(n=>n.x+n.w))-x,h:Math.max(...p.panels.map(n=>n.y+n.h))-y};}
 return pieces;
}
