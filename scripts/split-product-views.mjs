import fs from 'node:fs';
import sharp from 'sharp';
const ps=JSON.parse(fs.readFileSync('lib/products.json'));
const audit=[];
for(const p of ps){
 const m=JSON.parse(fs.readFileSync(`docs/catalog/generated/${p.code}.json`));
 const {data,info}=await sharp(m.source).removeAlpha().raw().toBuffer({resolveWithObject:true});
 const {width:w,height:h,channels:c}=info;
 const white=(x,y)=>{const i=(y*w+x)*c;return data[i]>240&&data[i+1]>240&&data[i+2]>240;};
 function boundary(axis,fraction){const size=axis==='x'?w:h;let best=Math.round(size*fraction),score=0;for(let n=Math.round(size*(fraction-.18));n<size*(fraction+.18);n++){let s=0;const length=axis==='x'?h:w;for(let q=0;q<length;q++)if(white(axis==='x'?n:q,axis==='x'?q:n))s++;if(s>score){score=s;best=n;}}return score/(axis==='x'?h:w)>.85?best:Math.round(size*fraction);}
 const xs=[0,boundary('x',1/3),boundary('x',2/3),w],ys=[0,boundary('y',.5),h];
 audit.push({code:p.code,width:w,height:h,xs,ys});
 for(let i=0;i<5;i++){const col=i%3,row=Math.floor(i/3),left=xs[col]+5,top=ys[row]+5,width=xs[col+1]-left-5,height=ys[row+1]-top-5;await sharp(m.source).extract({left,top,width,height}).webp({quality:88}).toFile('public'+p.image.replace('.webp',`-${i}.webp`));}
}
fs.writeFileSync('docs/catalog/crop-audit.json',JSON.stringify(audit,null,2)+'\n');
console.log('120 products split into 600 individual views.');
