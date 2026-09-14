import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
mkdirSync('work/growth',{recursive:true});
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4217';
assert(['127.0.0.1','localhost'].includes(new URL(base).hostname),'Local test server required');
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
try {
 const page=await browser.newPage();
 await page.setRequestInterception(true);page.on('request',r=>r.url().startsWith(base)||r.url().startsWith('data:')?r.continue():r.abort());
 for(const width of [390,1440]){
  await page.setViewport({width,height:900});
  await page.goto(base+'/insights/perfume-box-and-bag-packaging/',{waitUntil:'networkidle0'});
  if(await page.$('.cookie-btn-reject')) { await page.click('.cookie-btn-reject'); await page.waitForSelector('.cookie-banner',{hidden:true}); }
  await page.click('.article-contents summary');
  assert(await page.$eval('.article-contents',e=>e.open));
  await page.click('.article-contents a[href="#guide-section-3"]');
  await page.waitForFunction(()=>location.hash==='#guide-section-3');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width);
  await page.$eval('#guide-designs',e=>e.scrollIntoView({behavior:'instant',block:'start'}));
  await page.waitForFunction(()=>Math.abs(document.querySelector('#guide-designs').getBoundingClientRect().top)<120);
  await page.$eval('.article-design-grid img',async img=>{await img.decode();if(!img.naturalWidth)throw new Error('Design image missing')});
  await page.screenshot({path:`work/growth/phase-ten-${width}.png`});
  const count=await page.$$eval('.article-design-grid article',e=>e.length);assert.equal(count,3);
  await page.click('.article-design-grid article a');
  await page.waitForFunction(()=>location.pathname.startsWith('/products/'));
  assert(await page.$('h1'));
 }
 console.log('390/1440px: no overflow, contents toggle/anchor, three designs and product navigation passed');
}finally{await browser.close()}
