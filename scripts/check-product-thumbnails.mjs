import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const products=(await Promise.all(['lib/products.json','lib/products-expanded.json'].map(async p=>JSON.parse(await fs.readFile(p,'utf8'))))).flat();
let originalBytes=0,thumbnailBytes=0;
for(const p of products){
 for(let i=0;i<5;i++){
  const name=path.basename(p.image.replace('.webp',`-${i}.webp`));
  const original='dist/client/products/'+name,thumb='dist/client/products/thumbs/'+name;
  const meta=await sharp(thumb).metadata();assert(meta.width<=160&&meta.height<=160,name);
  originalBytes+=(await fs.stat(original)).size;thumbnailBytes+=(await fs.stat(thumb)).size;
 }
 for(const prefix of ['','zh/']){
  const html=await fs.readFile(`dist/client/${prefix}products/${p.slug}.html`,'utf8');
  for(let i=0;i<5;i++)assert(html.includes('/products/thumbs/'+path.basename(p.image.replace('.webp',`-${i}.webp`))),p.slug);
  assert(html.includes('fetchPriority="high"')||html.includes('fetchpriority="high"'),p.slug);
 }
}
assert(thumbnailBytes<originalBytes);
console.log(`${products.length*5} thumbnails and ${products.length*2} page references pass; ${Math.round(1000*(1-thumbnailBytes/originalBytes))/10}% smaller combined thumbnail payload.`);
