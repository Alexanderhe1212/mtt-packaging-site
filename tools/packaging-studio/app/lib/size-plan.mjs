// Physical dimensions are stored in millimetres; display units never reinterpret them.
export const AXES = ['length', 'width', 'height'];
export const FACTORS = {mm: 1, cm: 10, inch: 25.4};
export const DESIGN_HANDOFF_KEY = 'mtt_studio_handoff_v1';
export const displayNumber = n => String(Number(Number(n).toFixed(4)));
export const dimensionText = d => AXES.map(k => displayNumber(d[k])).join(' × ') + ' mm';
export function validDimensions(d) {return !!d && AXES.every(k => Number.isFinite(Number(d[k])) && Number(d[k]) > 0 && Number(d[k]) <= 5000);}
export function normalizeSizePlan(p = {}) {
 const s = p.sizePlan || {};
 return {mode: s.mode === 'product' ? 'product' : 'box', unit: Object.hasOwn(FACTORS, s.unit) ? s.unit : 'mm', clearanceMm: Number.isFinite(s.clearanceMm) && s.clearanceMm >= 0 && s.clearanceMm <= 500 ? s.clearanceMm : (p.thresholds?.paddingMm ?? 5)};
}
export function draftFromProject(p) {
 const s=normalizeSizePlan(p), d=s.mode==='product'?p.product.dimensions:p.dimensions, factor=FACTORS[s.unit];
 return {...Object.fromEntries(AXES.map(k=>[k,displayNumber(d[k]/factor)])),clearance:displayNumber(s.clearanceMm/factor)};
}
export function planSize(draft, mode, unit) {
 const factor=FACTORS[unit];
 if(!factor)return {error:'Choose a supported unit.'};
 const d=Object.fromEntries(AXES.map(k=>[k,Number(draft[k])*factor]));
 if(!validDimensions(d))return {error:'Enter positive dimensions, each no greater than 5,000 mm.'};
 const clearance=Number(draft.clearance)*factor;
 if(mode==='product' && (String(draft.clearance).trim()==='' || !Number.isFinite(clearance) || clearance<0 || clearance>500))return {error:'Enter an allowance from 0 to 500 mm per side.'};
 const internal=Object.fromEntries(AXES.map(k=>[k,d[k]+(mode==='product'?clearance*2:0)]));
 if(!validDimensions(internal))return {error:'The planned internal size exceeds the 5,000 mm tool limit.'};
 return {dimensions:internal,productDimensions:mode==='product'?d:null,clearanceMm:mode==='product'?clearance:0};
}
export function projectFromCalculator(h) {
 if(!h || !Object.hasOwn(FACTORS,h.unit))throw Error('This calculator handoff has an unsupported unit.');
 const f=FACTORS[h.unit], dimensions={length:Number(h.internalL)*f,width:Number(h.internalW)*f,height:Number(h.internalH)*f};
 const productDimensions={length:Number(h.productLength)*f,width:Number(h.productWidth)*f,height:Number(h.productHeight)*f};
 const clearanceMm=Number(h.clearance)*f;
 if(!validDimensions(dimensions)||!validDimensions(productDimensions)||!Number.isFinite(clearanceMm)||clearanceMm<0||clearanceMm>500)throw Error('Calculator dimensions are missing or outside this designer’s limits.');
 if(AXES.some(k=>Math.abs(dimensions[k]-(productDimensions[k]+2*clearanceMm))>.15))throw Error('Calculator values do not agree. Please recalculate before continuing.');
 const type=({rigid:'tianlide',folding:'tuck',corrugated:'rsc'})[h.packagingType]||'tianlide';
 return {type,dimensions,solutionId:'custom',sizePlan:{mode:'product',unit:h.unit,clearanceMm},product:{name:'',category:h.productType||'general',dimensions:productDimensions,quantity:Number.isInteger(Number(h.quantity))&&Number(h.quantity)>0?Number(h.quantity):0},insert:({paper:'paper',eva:'eva',foam:'foam'})[h.insert]||'none',visualOptions:{paperColor:'#eee5cf',surface:'matte',opening:55},recommendationReason:(h.insert==='yes'?'Insert requested — material to be reviewed. ':'')+'Dimensions carried from the MTT box size calculator. Structure, material and fit require review.'};
}
