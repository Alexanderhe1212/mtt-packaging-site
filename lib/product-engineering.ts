import type { PackagingProduct } from './products';
// Review prompts, not factory tolerances or claims of validated performance.
const checks: Record<string, [string,string]> = {
 'lift-off':['Check the lid internal size against the wrapped base external size, insertion depth and removal force. The lid is fully separate; it has no hinge.','核对上盖内尺寸与裱糊后底盒外尺寸、套入深度和取盖手感。盖底完全分离，无铰链。'],
 drawer:['Check sleeve internal clearance against the finished tray, full travel and pull-tab attachment. Test with the actual product loaded.','核对套筒内空间与成品抽匣配合、完整抽拉行程和拉带固定；装入实物后测试。'],
 book:['Check the spine hinge allowance, cover alignment and concealed magnet positions/polarity. Verify closure without the lid pressing on the product.','核对书脊转折余量、盖面齐口及隐藏磁铁的位置和极性；合盖不得挤压产品。'],
 'double-door':['Check left/right door symmetry, centre seam and both hinge allowances. Verify opening clearance and closure alignment with the loaded insert.','核对左右门对称、中央门缝和两侧转折余量；装入内托及产品后检查开门空间和闭合齐口。'],
 shoulder:['Check the shoulder attachment, exposed height and lid clearance. Confirm the lid seats without catching the neck or pressing on contents.','核对围边固定、露肩高度和盖内配合；上盖应正常落位，不挂住围边或压到产品。'],
 'stacked-drawers':['Check each drawer independently: sleeve clearance, divider support, pull attachment and clearance from adjacent drawers when loaded.','逐层检查抽屉配合、隔板支撑、拉带固定及装载后与相邻抽屉的间隙。'],
 hexagonal:['Check matching lid/base polygons, corner joints and wrap turn-ins. Review all six corners for interference during lid removal.','核对盖底多边形配合、转角拼接和包边；检查六个角取盖时是否干涉。'],
 round:['Check lid/base diameter clearance, roundness, wall seam and top/bottom joints. Test lid removal with the finished wrap applied.','核对盖底直径配合、圆度、筒壁接缝及顶底连接；裱糊完成后测试取盖。'],
 tiered:['Check tray stacking support, access to the lower layer and lift-tab attachment. Loaded trays must be removable without disturbing the other layer.','核对层间承托、下层取放通道和提带固定；装载后应能取出托盘而不碰乱另一层。'],
};
export function engineeringChecks(p:PackagingProduct,zh=false){
 const extra: Record<string,[string,string]> = {tuck:['Check tuck retention, dust-flap clearance, crease cracking and glued seam with the filled bottle.','装入实物后检查插舌、防尘翼、压痕爆线和糊口。'],mailer:['Check side-wing locking, flute direction and packed movement; review transit testing.','检查侧翼锁合、楞向、装载位移和运输测试。'],'ribbon-bag':['Confirm bag width × gusset × height, handle anchoring, bottom reinforcement and loaded testing.','确认袋宽×侧褶×袋高、提手固定、袋底加强及装载测试。']}; const pair=checks[p.structure]||extra[p.structure];
 const notes=[pair[zh?1:0],zh?'尺寸请分别确认成品内尺寸、成品外尺寸和产品最大外廓。内托槽位需要取放空间；图片不能确定公差、板厚或运输保护效果。':'Confirm finished internal dimensions, finished external dimensions and the product maximum envelope separately. Insert cavities need removal access; images do not establish tolerances, board thickness or transit performance.'];
 if(['tea-coffee-chocolate','bakery-food','nutrition-wellness'].includes(p.category))notes.push(zh?'明确食品或营养品是否独立密封包装。若材料直接接触内容物，需按目标市场核对接触材料及适用证明；外盒外观不代表食品接触合格。':'Specify whether contents have separate sealed primary packaging. For direct contact, review contact materials and applicable evidence for the destination market; an outer box image does not establish food-contact suitability.');
 if(p.category==='jewelry-watches')notes.push(zh?'使用实际首饰或手表检查内衬摩擦、固定和取放；绒布外观不能证明防刮或防变色性能。':'Check lining abrasion, retention and removal with the actual jewelry or watch; a fabric appearance does not establish scratch or tarnish protection.');
 return notes;
}
