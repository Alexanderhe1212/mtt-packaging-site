import fs from 'node:fs';
import sharp from 'sharp';
const records=JSON.parse(fs.readFileSync('lib/products.json','utf8'));
fs.mkdirSync('docs/catalog/qa',{recursive:true});
let ready=[];
for(const p of records){const path=`docs/catalog/generated/${p.code}.json`;if(!fs.existsSync(path))continue;const m=JSON.parse(fs.readFileSync(path));if(!m.source||!fs.existsSync(m.source))continue;const out='public'+p.image;if(!fs.existsSync(out)||fs.statSync(out).mtimeMs<fs.statSync(path).mtimeMs)await sharp(m.source).webp({quality:85}).toFile(out);ready.push({...p,source:m.source});}
for(let i=0;i<records.length;i+=4){const batch=records.slice(i,i+4).map(p=>ready.find(r=>r.code===p.code));if(batch.some(p=>!p))continue;const key=batch.map(x=>x.code).join('_');const output=`docs/catalog/qa/${key}.jpg`;if(fs.existsSync(output)&&batch.every(x=>fs.statSync(x.source).mtimeMs<fs.statSync(output).mtimeMs))continue;const inputs=[];for(let j=0;j<batch.length;j++){inputs.push({input:await sharp(batch[j].source).resize(900,600,{fit:'fill'}).toBuffer(),left:(j%2)*900,top:Math.floor(j/2)*630+30});inputs.push({input:Buffer.from(`<svg width="900" height="30"><text x="12" y="22" font-size="20">${batch[j].code}</text></svg>`),left:(j%2)*900,top:Math.floor(j/2)*630});}await sharp({create:{width:1800,height:1260,channels:3,background:'#ffffff'}}).composite(inputs).jpeg({quality:90}).toFile(output);}
console.log(`${ready.length}/${records.length} generated assets prepared; visual review still required.`);
