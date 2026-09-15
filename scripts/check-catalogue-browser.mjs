// Local-only catalogue regression and axe audit. External traffic is blocked.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4217';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const all=[...JSON.parse(fs.readFileSync('lib/products.json')),...JSON.parse(fs.readFileSync('lib/products-expanded.json'))];
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true});
const results=[],errors=[];
try {
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.setRequestInterception(true);page.on('request',r=>r.url().startsWith(base)||r.url().startsWith('data:')?r.continue():r.abort());
 for(const width of [390,1440]) {
  await page.setViewport({width,height:900});
  for(const path of ['/products/','/zh/products/']) {
   await page.goto(base+path,{waitUntil:'networkidle0'});
   if(await page.$('.cookie-btn-reject'))await page.click('.cookie-btn-reject');
   assert.equal(await page.$eval('.packaging-comparison',e=>e.open),false);
   await page.click('.packaging-comparison summary');
   assert.equal(await page.$$eval('.packaging-comparison article',e=>e.length),4);
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   const audit=await page.evaluate(()=>axe.run());
   results.push({path,width,violations:audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),manualReview:audit.incomplete.map(v=>v.id)});
   assert.equal(audit.violations.length,0,JSON.stringify(results.at(-1)));
   await page.$eval('.packaging-comparison',e=>e.scrollIntoView());
   await page.screenshot({path:`work/growth/v12-${width}-${path.includes('zh')?'zh':'en'}.png`});
   await page.click('.packaging-comparison summary');
   const tabs=await page.$$('.product-family-tabs button');
   for(const [i,family] of ['','rigid','carton','corrugated','bag'].entries()) {
    await tabs[i].click();
    await page.waitForFunction(n=>document.querySelectorAll('.product-card').length===n,{},all.filter(p=>!family||p.family===family).length);
   }
   await page.type('input[type=search]','no-such-packaging-000');
   assert.equal(await page.$$eval('.product-card',e=>e.length),0);
   await page.click('.product-results button');
   await page.waitForFunction(n=>document.querySelectorAll('.product-card').length===n,{},all.length);
  }
 }
 // Exercise all five gallery views and selected-product quote handoff for each family.
 for(const family of ['rigid','carton','corrugated','bag']) {
  const p=all.find(p=>p.family===family);
  await page.goto(base+'/products/'+p.slug+'/',{waitUntil:'networkidle0'});
  for(let i=0;i<5;i++){
   await (await page.$$('.product-thumbs button'))[i].click();
   await page.$eval('.product-gallery>.product-view img',async img=>{await img.decode();if(!img.naturalWidth)throw Error('Missing gallery image')});
   assert((await page.$eval('.product-gallery>.product-view img',e=>e.src)).endsWith(`-${i}.webp`));
  }
  await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const audit=await page.evaluate(()=>axe.run());
  results.push({family,path:'/products/'+p.slug,violations:audit.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),manualReview:audit.incomplete.map(v=>v.id)});
  assert.equal(audit.violations.length,0,JSON.stringify(results.at(-1)));
  const link=await page.$eval('.product-detail a[href*="request-a-quote"]',e=>e.href);
  const url=new URL(link);assert.equal(url.searchParams.get('product_family'),family);
 }
 assert.deepEqual(errors,[]);
} finally {await browser.close();fs.mkdirSync('work/growth',{recursive:true});fs.writeFileSync('work/growth/v12-browser.json',JSON.stringify({results,errors},null,2));}
console.log('Catalogue EN/ZH at 390/1440: comparison, all family filters, no-results/reset; four product galleries and quote links; axe checks passed.');
