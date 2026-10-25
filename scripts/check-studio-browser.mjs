// Local browser checks: no real enquiry or external API request is sent.
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4217';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
try{
 let page=await browser.newPage();
 await page.setViewport({width:1440,height:1000});
 await page.setRequestInterception(true);
 page.on('request',r=>r.url().startsWith(base)||r.url().startsWith('data:')?r.continue():r.abort());
 await page.evaluateOnNewDocument(()=>{
  window.__thumbnailContexts=0;
  const original=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(kind,...args){if(/^webgl/.test(kind))window.__thumbnailContexts++;return original.call(this,kind,...args)};
 });
 await page.goto(base+'/tools/gift-box-solution-builder/app.html',{waitUntil:'networkidle0'});
 const tiles=await page.$$('.structure-tile');assert.equal(tiles.length,12);
 for(const tile of tiles){await tile.evaluate(e=>e.scrollIntoView());await page.waitForFunction(e=>e.querySelector('img')?.naturalWidth>0,{},tile)}
 const contexts=await page.evaluate(()=>window.__thumbnailContexts);
 assert.equal(contexts,0,`Fixed structure previews unnecessarily created ${contexts} WebGL contexts`);
 // Revisit with fixed images unavailable: the live fallback must still share a renderer.
 await page.close();
 const fallback=await browser.newPage();
 await fallback.setRequestInterception(true);
 fallback.on('request',r=>r.url().includes('/images/studio-structures/')?r.abort():r.url().startsWith(base)||r.url().startsWith('data:')?r.continue():r.abort());
 await fallback.evaluateOnNewDocument(()=>{
  window.__thumbnailContexts=0;const original=HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext=function(kind,...args){if(/^webgl/.test(kind))window.__thumbnailContexts++;return original.call(this,kind,...args)};
 });
 await fallback.goto(base+'/tools/gift-box-solution-builder/app.html',{waitUntil:'networkidle0'});
 const fallbackTiles=await fallback.$$('.structure-tile');
 for(const tile of fallbackTiles){await tile.evaluate(e=>e.scrollIntoView());await fallback.waitForFunction(e=>e.querySelector('img')?.naturalWidth>0&&e.querySelector('img').src.startsWith('data:'),{},tile)}
 assert.equal(await fallback.evaluate(()=>window.__thumbnailContexts),1,'Live thumbnail fallback must share one WebGL context');
 page=fallback;
 await fallbackTiles[0].click();
 await page.waitForSelector('[aria-label="Product length"]');
 assert.equal(await page.$eval('[aria-label="Product length"]',e=>e.value),'180');
 await page.$eval('[aria-label="Product length"]',e=>{e.focus();e.select()});
 await page.type('[aria-label="Product length"]','200');
 assert(await page.$eval('.size-formula',e=>e.textContent.includes('210 × 130 × 60 mm')));
 await page.click('.studio-steps button:nth-child(4)');
 await page.waitForSelector('.quote-form');
 assert(await page.$eval('.quote-specs',e=>e.textContent.includes('210 × 130 × 60 mm')));
 console.log('Studio: 12 fixed previews use no WebGL contexts; missing-image fallback shares one context; size change reaches the quote summary; no enquiry sent.');
}finally{await browser.close()}
