export function previewOptions(value={}) {
  return {paperColor:/^#[0-9a-f]{6}$/i.test(value?.paperColor||'')?value.paperColor:'#244438',surface:value?.surface==='gloss'?'gloss':'matte',opening:Math.max(0,Math.min(100,Number(value?.opening)||0))};
}
export function giftGeometry(dimensions) {
  const values=['length','width','height'].map(k=>Number(dimensions[k]));
  if(!values.every(v=>Number.isFinite(v)&&v>0&&v<=5000))throw new Error('礼盒尺寸应在 0–5000 mm 范围内');
  const [l,w,h]=values, t=2, clearance=1;
  return {l,w,h,t,clearance,lidHeight:Math.max(20,h*.45),scale:3/Math.max(l+2*t+2*clearance,w+2*t+2*clearance,h+2*t)};
}
