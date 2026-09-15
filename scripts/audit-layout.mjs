import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
import fs from 'node:fs';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4223';
if(!['127.0.0.1','localhost'].includes(new URL(base).hostname))throw new Error('Local static server required');
fs.mkdirSync('work',{recursive:true});
const paths=[...fs.readFileSync('dist/client/sitemap.xml','utf8').matchAll(/<loc>https:\/\/mttpackaging.com([^<]*)<\/loc>/g)].map(m=>m[1]);
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
const findings=[];
try{
let page;
// Recycle the tab to keep a full-catalogue scan within browser memory limits.
async function fresh(){if(page)await page.close();page=await browser.newPage();await page.setJavaScriptEnabled(false);await page.setRequestInterception(true);page.on('request',r=>['document','stylesheet','font'].includes(r.resourceType())&&r.url().startsWith(base)?r.continue():r.abort());}
await fresh();
for(const width of [1440,768,390]){
 await page.setViewport({width,height:900});
 for(const [i,path] of paths.entries()){
 if(i%20===0){await fresh();await page.setViewport({width,height:900});console.log(width,i,path);}
 await page.goto(base+path,{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>document.fonts.ready);
 const result=await page.evaluate(()=>{
 const narrow=[...document.querySelectorAll('main h2,main h3,main p')].filter(e=>{
 const r=e.getBoundingClientRect();return e.checkVisibility()&&r.width>0&&r.width<180&&e.textContent.trim().length>65&&r.height>200;
 }).map(e=>({text:e.textContent.slice(0,100),width:Math.round(e.getBoundingClientRect().width),height:Math.round(e.getBoundingClientRect().height),parent:e.parentElement.className}));
 return {overflow:document.documentElement.scrollWidth>innerWidth+2,narrow};
 });
 if(result.overflow||result.narrow.length)findings.push({path,width,...result});
 }
 console.log('Checked',paths.length,'pages at',width);
}
fs.writeFileSync('work/layout-audit-results.json',JSON.stringify(findings,null,2));console.log('Findings',findings.length);
}finally{await browser.close()}
