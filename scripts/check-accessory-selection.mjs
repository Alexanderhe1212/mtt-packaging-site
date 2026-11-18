// Real browser regression: no customer enquiry is sent.
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4217';
assert(['127.0.0.1','localhost'].includes(new URL(base).hostname));
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage();await page.setRequestInterception(true);page.on('request',r=>r.url().startsWith(base)||r.url().startsWith('data:')?r.continue():r.abort());
 for(const width of [390,1280])for(const [slug,code] of [['skincare-pump-refill-pouch-book-box','MTT-R1301'],['four-vial-perfume-discovery-drawer-card-pocket','MTT-R1302'],['earring-display-card-book-gift-box','MTT-R1303'],['six-vial-paperboard-discovery-sleeve-tray','MTT-C0131'],['hinged-hexagonal-radial-insert-gift-box','MTT-R1304'],['half-moon-two-piece-rigid-gift-box','MTT-R1305']]){
  await page.setViewport({width,height:844});await page.goto(base+'/products/'+slug+'/',{waitUntil:'networkidle0'});
  await page.waitForSelector('[data-testid="selected-set"]');assert((await page.$eval('[data-testid="selected-set"]',e=>e.innerText)).includes('No accessories selected'));
  assert.equal(await page.$$eval('.product-thumbs button',e=>e.length),5,code+' needs five views');
  for(let i=0;i<5;i++){await page.$eval(`.product-thumbs button:nth-child(${i+1})`,e=>e.click());await page.waitForFunction(i=>{const x=document.querySelector('.product-gallery > .product-view img');return x?.complete&&x.naturalWidth>0&&x.currentSrc.includes(`-${i}.webp`)},{},i)}
  await page.$eval('.product-accessories label input',e=>e.click());
  assert((await page.$eval('[data-testid="selected-set"]',e=>e.innerText)).includes('Greeting card'));
  assert.equal(await page.$$eval('[data-testid="selected-set"] figure',e=>e.length),2);
  const href=await page.$eval('.product-accessories a[href*="request-a-quote"]',e=>e.href),u=new URL(href);assert(u.searchParams.get('product').includes(code));assert.equal(u.searchParams.get('accessories'),'Greeting card');
  await page.$eval('.product-accessories label input',e=>e.click());assert((await page.$eval('[data-testid="selected-set"]',e=>e.innerText)).includes('No accessories selected'));
  await page.goto(href,{waitUntil:'networkidle0'});await page.waitForFunction(()=>document.querySelector('[name=selected_accessories]')?.value==='Greeting card');
  assert((await page.$eval('[name=selected_product]',e=>e.value)).includes(code));
 }
 await page.setViewport({width:390,height:844});await page.goto(base+'/zh/products/earring-display-card-book-gift-box/',{waitUntil:'networkidle0'});
 await page.waitForSelector('[data-testid=selected-set]');await page.$eval('.product-accessories label input',e=>e.click());
 assert((await page.$eval('[data-testid=selected-set]',e=>e.innerText)).includes('定制贺卡'));
 const zhHref=await page.$eval('.product-accessories a[href*="request-a-quote"]',e=>e.href);assert.equal(new URL(zhHref).searchParams.get('accessories'),'定制贺卡');
 await page.goto(zhHref,{waitUntil:'networkidle0'});await page.waitForFunction(()=>document.querySelector('[name=selected_accessories]')?.value==='定制贺卡');
 console.log('Six product galleries and selected-accessory previews, deselection and quote handoff pass at 390/1280; no enquiry sent.');
}finally{await browser.close()}
