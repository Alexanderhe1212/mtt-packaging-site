// Static image variants must remain usable without a server image optimizer.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import sharp from 'sharp';
const cases=[['about','development-worktable'],['ppwr-compliant-packaging','development-worktable'],['how-we-work','hero-editorial'],['insights','hero-editorial'],['packaging','hero-editorial'],['zh','hero-editorial'],['packaging/folding-cartons','carton-editorial']];
for(const [route,name] of cases){
 const html=await fs.readFile(`dist/client/${route}.html`,'utf8');
 const tag=html.match(new RegExp(`<img[^>]+src="/design/${name}\\.webp"[^>]*>`))?.[0];
 assert(tag,route);
 assert(tag.includes('srcSet=')||tag.includes('srcset='),`${route}: mobile still receives the full editorial image`);
 assert(tag.includes('sizes='),route);
 const srcset=tag.match(/srcset="([^"]+)"/i)[1];
 const original=await fs.stat(`public/design/${name}.webp`);
 for(const entry of srcset.split(',')){
  const [url,width]=entry.trim().split(/\s+/);const file=`public${url}`;
  assert.equal((await sharp(file).metadata()).width,Number(width.slice(0,-1)),url);
  if(url.includes('-800.'))assert((await fs.stat(file)).size<original.size,url);
 }
}
console.log('Seven editorial page image sets: real widths, smaller mobile files and static HTML references verified.');
