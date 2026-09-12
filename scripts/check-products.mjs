import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
const products=JSON.parse(fs.readFileSync('lib/products.json','utf8'));
assert.equal(products.length,120);
assert.equal(new Set(products.map(p=>p.slug)).size,120);
assert.equal(new Set(products.map(p=>p.code)).size,120);
assert.equal(new Set(products.map(p=>p.description)).size,120);
assert.equal(new Set(products.map(p=>p.category)).size,6);
for(const category of new Set(products.map(p=>p.category)))assert.equal(products.filter(p=>p.category===category).length,20);
const allowed=new Set(['lift-off','drawer','book','double-door','shoulder','stacked-drawers','hexagonal','round','tiered']);
for(const p of products){
 assert.equal(p.family,'rigid');assert.ok(allowed.has(p.structure),p.structure);
 for(const k of ['name','nameZh','description','descriptionZh','logic','logicZh','material','materialZh','board','boardZh','wrap','wrapZh','finish','finishZh','insert','insertZh'])assert.ok(p[k]?.trim(),`${p.code}.${k}`);
 if(process.argv.includes('--images')||process.argv.includes('--release'))[0,1,2,3,4].forEach(i=>assert.ok(fs.existsSync('public'+p.image.replace('.webp',`-${i}.webp`)),p.image));
 if(process.argv.includes('--release')){const m=JSON.parse(fs.readFileSync(`docs/catalog/generated/${p.code}.json`));assert.equal(m.status,'approved',`${p.code} requires visual review`);assert.equal(m.reviewedSourceHash,crypto.createHash('sha256').update(fs.readFileSync(m.source)).digest('hex'),`${p.code} changed after review`);}
}
console.log('120 rigid products; six groups of 20; bilingual specifications and structure-family boundaries verified.');
