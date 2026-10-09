import {structurePieces} from './structure-panels.mjs';
const round = (value) => Math.round(value * 100) / 100;

export const BOX_TEMPLATES = [
  { id:"tianlide", name:"天地盖礼盒", category:"rigid", categoryName:"精品礼盒", description:"上盖与下盒分开的经典礼盒", material:"灰板裱特种纸", route:"开料 → 裱纸 → 成型 → 质检" },
  { id:"drawer", name:"抽屉盒", category:"rigid", categoryName:"精品礼盒", description:"像抽屉一样拉开的套盒", material:"灰板裱纸", route:"开料 → 裱纸 → 围套 → 成型" },
  { id:"flip", name:"翻盖礼盒", category:"rigid", categoryName:"精品礼盒", description:"盖子与盒身连接，可加磁吸", material:"灰板裱纸", route:"开料 → 裱纸 → 组装 → 磁吸" },
  { id:"book", name:"书型盒", category:"rigid", categoryName:"精品礼盒", description:"像书本一样从侧面翻开", material:"灰板裱纸", route:"开料 → 书壳 → 盒胚 → 组装" },
  { id:"foldable_flip", name:"折叠翻盖盒", category:"rigid", categoryName:"精品礼盒", description:"可压平运输的翻盖礼盒", material:"灰板裱纸", route:"开料 → 裱纸 → 折叠粘合 → 组装" },
  { id:"window_flip", name:"开窗翻盖盒", category:"rigid", categoryName:"精品礼盒", description:"盖面带透明展示窗", material:"灰板、裱纸、PET", route:"开窗 → 贴窗 → 裱纸 → 成型" },
  { id:"double_door", name:"双开门礼盒", category:"rigid", categoryName:"精品礼盒", description:"左右两扇门向中间闭合", material:"灰板裱纸", route:"开料 → 门板 → 盒胚 → 组装" },
  { id:"shoulder", name:"围边天地盖", category:"rigid", categoryName:"精品礼盒", description:"盒身带露肩围边的天地盖", material:"灰板裱纸", route:"开料 → 内围边 → 裱纸 → 套合" },
  { id:"airplane", name:"飞机盒", category:"corrugated", categoryName:"瓦楞盒", description:"一片成型的电商快递盒", material:"E 楞或 B 楞瓦楞纸板", route:"印刷 → 裱瓦 → 模切 → 粘箱" },
  { id:"rsc", name:"普通运输箱", category:"corrugated", categoryName:"瓦楞盒", description:"常用对口运输纸箱（FEFCO 0201）", material:"三层或五层瓦楞纸板", route:"分纸 → 印刷 → 开槽 → 钉/粘箱" },
  { id:"tuck", name:"插口卡纸盒", category:"carton", categoryName:"卡纸盒", description:"常见化妆品、食品折叠纸盒", material:"白卡纸或金银卡", route:"印刷 → 表面处理 → 模切 → 糊盒" },
  { id:"paperbag", name:"手提纸袋", category:"bag", categoryName:"手提袋", description:"带提绳和折叠袋底的纸袋", material:"白卡纸或牛皮纸", route:"印刷 → 覆膜 → 模切 → 糊袋 → 穿绳" },
];

export function boundsOf(panels) {
  const minX=Math.min(...panels.map(p=>p.x)), minY=Math.min(...panels.map(p=>p.y));
  const maxX=Math.max(...panels.map(p=>p.x+p.w)), maxY=Math.max(...panels.map(p=>p.y+p.h));
  return { x:round(minX), y:round(minY), w:round(maxX-minX), h:round(maxY-minY) };
}

export function buildBox(type,dimensions={}) {
  const template=BOX_TEMPLATES.find(item=>item.id===type);
  if(!template) throw new Error(`未知盒型：${type}`);
  const L=Math.max(20,Number(dimensions.length)||200), W=Math.max(15,Number(dimensions.width)||140), H=Math.max(10,Number(dimensions.height)||60);
  const pieces=structurePieces(type,L,W,H);
  const netArea=round(pieces.reduce((sum,item)=>sum+item.panels.reduce((area,p)=>area+p.w*p.h,0),0));
  return {...template,dimensions:{length:L,width:W,height:H,unit:"mm",basis:"成品内尺寸"},pieces,netAreaMm2:netArea,netAreaM2:round(netArea/1e6),warning:"结构图为毫米级参考；量产前必须由工厂结构工程师复核纸纹、设备补偿、公差和排版并打样。"};
}

export function listByCategory(){return BOX_TEMPLATES.reduce((groups,item)=>{(groups[item.category]??=[]).push(item);return groups},{});}
