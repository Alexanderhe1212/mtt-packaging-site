// Derived display thumbnails only: originals and packaging artwork are unchanged.
// Read buffers first so cloud-backed local files are hydrated before native decoding.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const products=(await Promise.all(['lib/products.json','lib/products-expanded.json','lib/products-november-17.json'].map(async p=>JSON.parse(await fs.readFile(p,'utf8'))))).flat();
await fs.mkdir('public/products/thumbs',{recursive:true});
let count=0;
for(const p of products) for(let view=0;view<(p.conceptSingleView?1:p.structure==='fold-flat'?6:5);view++){
 const source='public'+p.image.replace('.webp',`-${view}.webp`);
 const target='public/products/thumbs/'+path.basename(source);
 const input=await fs.stat(source);
 const output=await fs.stat(target).catch(()=>null);
 if(!output||input.mtimeMs>output.mtimeMs) await sharp(await fs.readFile(source)).resize({width:160,height:160,fit:'inside',withoutEnlargement:true}).webp({quality:82}).toFile(target);
 count++;
}
console.log(`${count} product thumbnails prepared; full-size originals preserved.`);

await fs.mkdir('public/products/cards',{recursive:true});
for(const p of products){
 const source='public'+p.image.replace('.webp','-0.webp');
 const target='public/products/cards/'+path.basename(source);
 const input=await fs.stat(source),output=await fs.stat(target).catch(()=>null);
 if(!output||input.mtimeMs>output.mtimeMs||(await sharp(await fs.readFile(target)).metadata()).width!==320)await sharp(await fs.readFile(source)).resize({width:320,height:320,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toFile(target);
}
console.log(`${products.length} responsive catalogue images prepared.`);

// Small navigation marks retain the full-size source for larger placements.
await fs.mkdir('public/brand/responsive',{recursive:true});
for(const width of [54,108])await sharp(await fs.readFile('public/brand/mtt-gold-triangle.webp')).resize(width,width).webp({quality:88}).toFile(`public/brand/responsive/mtt-gold-triangle-${width}.webp`);

// Accessory choice cards display at 96 CSS pixels; 288px retains detail on 3x screens.
await fs.mkdir('public/accessories/responsive',{recursive:true});
for(const name of ['bag','card','cloth','pouch','ribbon','sleeve','tag','tissue']){
 const input=await fs.readFile(`public/accessories/${name}.jpg`);
 await sharp(input).resize({width:288,height:288,fit:'inside',withoutEnlargement:true}).webp({quality:82}).toFile(`public/accessories/responsive/${name}.webp`);
}
console.log('8 responsive accessory previews prepared; originals preserved.');
