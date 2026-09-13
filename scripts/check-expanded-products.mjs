import assert from 'node:assert/strict';
import fs from 'node:fs';
const old=JSON.parse(fs.readFileSync('lib/products.json'));
const added=JSON.parse(fs.readFileSync('lib/products-expanded.json'));
const all=[...old,...added];
assert.equal(new Set(all.map(p=>p.code)).size,all.length);
assert.equal(new Set(all.map(p=>p.slug)).size,all.length);
const families={rigid:['lift-off','drawer','shoulder','book','double-door','hexagonal','stacked-drawers'],carton:['tuck','auto-bottom','window-tuck','sleeve-carton','pillow','gable','hex-carton'],corrugated:['mailer','divided-mailer','rsc','corr-sleeve'],bag:['ribbon-bag','cord-bag','twisted-bag','flat-handle-bag','diecut-bag']};
for(const p of added){assert.ok(families[p.family]?.includes(p.structure));for(let i=0;i<5;i++)assert.ok(fs.existsSync('public'+p.image.replace('.webp','-'+i+'.webp')));for(const k of ['description','descriptionZh','logic','logicZh','material','materialZh','seoTitle','seoDescription'])assert.ok(p[k]?.length);}
assert.equal(new Set(all.map(p=>p.family)).size,4);
console.log(all.length+' products across four families; new structures, bilingual fields and '+added.length*5+' image assets passed.');

for(const f of ["carton","corrugated","bag"])assert.equal(all.filter(p=>p.family===f).length,30,`${f} requires 30 products`);
