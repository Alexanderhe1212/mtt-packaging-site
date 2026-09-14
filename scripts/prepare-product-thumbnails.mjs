// Derived display thumbnails only: originals and packaging artwork are unchanged.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const products=(await Promise.all(['lib/products.json','lib/products-expanded.json'].map(async p=>JSON.parse(await fs.readFile(p,'utf8'))))).flat();
await fs.mkdir('public/products/thumbs',{recursive:true});
let count=0;
for(const p of products) for(let view=0;view<5;view++){
 const source='public'+p.image.replace('.webp',`-${view}.webp`);
 const target='public/products/thumbs/'+path.basename(source);
 const input=await fs.stat(source);
 const output=await fs.stat(target).catch(()=>null);
 if(!output||input.mtimeMs>output.mtimeMs) await sharp(source).resize({width:160,height:160,fit:'inside',withoutEnlargement:true}).webp({quality:82}).toFile(target);
 count++;
}
console.log(`${count} product thumbnails prepared; full-size originals preserved.`);
