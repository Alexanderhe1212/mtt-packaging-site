// Suggestions use layout rules, not subject recognition; photos stay uncropped by default.
export function suggestedUsage(image){return image.hasTransparency?'logo':'photo'}
export function layoutOptions(usage='photo'){
 if(usage==='background')return [
 {id:'full',name:'Full background',reason:'Fills the face; edges may crop',x:50,y:50,size:100,fit:'cover'},
 {id:'border',name:'White-space border',reason:'Keeps the full image with a border',x:50,y:50,size:82,fit:'contain'},
 {id:'panel',name:'Central artwork',reason:'Leaves space for branding',x:50,y:56,size:70,fit:'contain'}];
 if(usage==='logo')return [
 {id:'classic',name:'Classic center',reason:'Complete logo with balanced spacing',x:50,y:50,size:52,fit:'contain'},
 {id:'quiet',name:'More white space',reason:'Smaller logo to show the material',x:50,y:50,size:34,fit:'contain'},
 {id:'upper',name:'Upper brand position',reason:'Leaves room for text below',x:50,y:30,size:40,fit:'contain'}];
 return [
 {id:'complete',name:'Full image',reason:'Complete product image, no crop',x:50,y:50,size:82,fit:'contain'},
 {id:'gallery',name:'Gallery layout',reason:'Smaller image with more space',x:50,y:50,size:64,fit:'contain'},
 {id:'lower',name:'Lower image',reason:'Leaves room above for a headline',x:50,y:62,size:64,fit:'contain'}];
}
export function layoutTransform(option){return {x:option.x,y:option.y,size:option.size,fit:option.fit}}
