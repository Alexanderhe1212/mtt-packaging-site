import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const products=(await Promise.all(['lib/products.json','lib/products-expanded.json','lib/products-november-17.json','lib/products-november-18.json'].map(async p=>JSON.parse(await fs.readFile(p,'utf8'))))).flat();
let originalBytes=0,thumbnailBytes=0;
for(const p of products){
 const card='dist/client/products/cards/'+path.basename(p.image.replace('.webp','-0.webp'));
 assert((await sharp(card).metadata()).width===320);
 for(let i=0;i<(p.conceptSingleView?1:p.structure==='fold-flat'?6:5);i++){
  const name=path.basename(p.image.replace('.webp',`-${i}.webp`));
  const original='dist/client/products/'+name,thumb='dist/client/products/thumbs/'+name;
  const meta=await sharp(thumb).metadata();assert(meta.width<=160&&meta.height<=160,name);
  originalBytes+=(await fs.stat(original)).size;thumbnailBytes+=(await fs.stat(thumb)).size;
 }
 for(const prefix of ['','zh/']){
  const html=await fs.readFile(`dist/client/${prefix}products/${p.slug}.html`,'utf8');
  for(let i=0;i<(p.conceptSingleView?1:p.structure==='fold-flat'?6:5);i++)assert(html.includes('/products/thumbs/'+path.basename(p.image.replace('.webp',`-${i}.webp`))),p.slug);
  assert(html.includes('fetchPriority="high"')||html.includes('fetchpriority="high"'),p.slug);
 }
}
assert(thumbnailBytes<originalBytes);
console.log(`${products.reduce((n,p)=>n+(p.conceptSingleView?1:p.structure==='fold-flat'?6:5),0)} thumbnails and ${products.length*2} page references pass; ${Math.round(1000*(1-thumbnailBytes/originalBytes))/10}% smaller combined thumbnail payload.`);

for(const width of [54,108]){
 const file=`dist/client/brand/responsive/mtt-gold-triangle-${width}.webp`;
 assert.equal((await sharp(file).metadata()).width,width);
 assert((await fs.stat(file)).size<(await fs.stat('dist/client/brand/mtt-gold-triangle.webp')).size);
}

// Each accessory card has a generated 3x display image and keeps its original.
for(const name of ['bag','card','cloth','pouch','ribbon','sleeve','tag','tissue']){
 const file=`dist/client/accessories/responsive/${name}.webp`;
 const meta=await sharp(file).metadata();
 assert(meta.width<=288&&meta.height<=288, name);
 assert((await fs.stat(file)).size<(await fs.stat(`dist/client/accessories/${name}.jpg`)).size, name);
}
console.log('8 responsive accessory previews and originals validated.');

for(const locale of ['', 'zh/']){
 const html=await fs.readFile(`dist/client/${locale}products.html`,'utf8');
 const grid=html.split('class="product-grid"')[1];
 assert(grid, `${locale}catalogue grid`);
 const first=grid.match(/<img\b[^>]*>/)?.[0]||'';
 assert(/loading="eager"/.test(first)&&/fetchpriority="high"/i.test(first), `${locale}first catalogue image must be eagerly prioritized`);
}

for(const locale of ['', 'zh/']){
 const html=await fs.readFile(`dist/client/${locale}products.html`,'utf8');
 const grid=html.split('class="product-grid"')[1];
 const first=grid.match(/<img\b[^>]*>/)?.[0]||'';
 assert(/width="500"/.test(first)&&/height="500"/.test(first), `${locale}catalogue card must provide its square image dimensions`);
}
for(const locale of ['', 'zh/']){
 const html=await fs.readFile(`dist/client/${locale}products.html`,'utf8');
 const grid=html.split('class="product-grid"')[1].split('class="catalogue-empty"')[0];
 const cards=[...grid.matchAll(/<span class="product-view"><img\b[^>]*>/g)].map(m=>m[0]);
 assert.equal(cards.length,products.length,`${locale}catalogue image count`);
 assert(cards.every(img=>/width="500"/.test(img)&&/height="500"/.test(img)),`${locale}all catalogue cards have image dimensions`);
}
