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
 // Mobile first visit: home -> product selection -> chosen design -> contextual enquiry.
 await page.setViewport({width:390,height:844});
 await page.goto(base+'/',{waitUntil:'networkidle0'});
 if(await page.$('.cookie-btn-reject'))await page.click('.cookie-btn-reject');
 assert(await page.$eval('.ed-actions a[href="/products"]',e=>e.getBoundingClientRect().height>=44),'Home browse touch target');
 await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('.ed-actions a[href="/products"]')]);
 await page.type('input[type=search]','MTT-R0111');
 await page.waitForFunction(()=>document.querySelectorAll('.product-card').length===1);
 await Promise.all([page.waitForNavigation({waitUntil:'networkidle0'}),page.click('.product-card')]);
 for(const prefix of ['', '/zh']){
  if(prefix)await page.goto(base+prefix+'/products/perfume-and-refill-lift-off/',{waitUntil:'networkidle0'});
  assert.equal(await page.$$eval('h1',es=>es.length),1);
  const position=await page.evaluate(()=>({title:document.querySelector('h1').getBoundingClientRect().top,cta:document.querySelector('.product-summary .button').getBoundingClientRect().bottom,gallery:document.querySelector('.product-gallery').getBoundingClientRect().top}));
  assert(position.title<position.gallery && position.cta<844,'Selected product and quote must precede mobile gallery');
  await page.click('.product-accessories input');
  const selectedLink=await page.$eval('.product-summary .button',e=>e.href);
  const selected=new URL(selectedLink);
  assert(selected.searchParams.get('product').startsWith('MTT-R0111'));
  assert.equal(selected.searchParams.get('product_family'),'rigid');
  assert(selected.searchParams.get('accessories'));
  await page.goto(selectedLink,{waitUntil:'networkidle0'});
  assert((await page.$eval('[name=selected_product]',e=>e.value)).startsWith('MTT-R0111'));
  assert.equal(await page.$eval('[name=selected_accessories]',e=>e.value),selected.searchParams.get('accessories'));
  if(!prefix)assert.equal(await page.$eval('[name=packagingType]',e=>e.value),'Rigid Box');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 }
 for(const width of [360,768,1440]){
  await page.setViewport({width,height:844});
  await page.goto(base+'/products/perfume-duo-collapsible-magnetic-rigid-box/',{waitUntil:'networkidle0'});
  const layout=await page.evaluate(()=>{const s=document.querySelector('.product-summary').getBoundingClientRect(),g=document.querySelector('.product-gallery').getBoundingClientRect();return {summaryBottom:s.bottom,summaryLeft:s.left,galleryTop:g.top,galleryRight:g.right,overflow:document.documentElement.scrollWidth>innerWidth+1}});
  assert(!layout.overflow);
  if(width<=1000)assert(layout.summaryBottom<=layout.galleryTop);
  else assert(layout.summaryLeft>=layout.galleryRight);
 }
 // Industry links must preserve the buyer's application; filters survive reload and Back.
 for(const prefix of ['', '/zh']){
  await page.goto(base+prefix+'/products/?category=jewelry-watches&family=rigid',{waitUntil:'networkidle0'});
  const expected=all.filter(p=>p.category==='jewelry-watches'&&p.family==='rigid').length;
  await page.waitForFunction(n=>document.querySelectorAll('.product-card').length===n,{},expected);
  await page.evaluate(()=>{window.__mttFilterProbe=true});
  await page.type('input[type=search]','ring');
  assert(await page.evaluate(()=>window.__mttFilterProbe),'Filtering must not reload the page');
  const links=await page.$$eval('.product-card',es=>es.map(e=>e.getAttribute('href')));
  assert(links.length>0 && links.length<expected);
  assert.equal(new URL(page.url()).searchParams.get('q'),'ring');
  await page.reload({waitUntil:'networkidle0'});
  assert.deepEqual(await page.$$eval('.product-card',es=>es.map(e=>e.getAttribute('href'))),links);
  await page.goto(base+links[0],{waitUntil:'networkidle0'});
  await page.goBack({waitUntil:'networkidle0'});
  assert.deepEqual(await page.$$eval('.product-card',es=>es.map(e=>e.getAttribute('href'))),links);
  await page.click('.product-results button');
  assert.equal(new URL(page.url()).searchParams.size,0);
  await page.type('input[type=search]','no-such-packaging-000');
  const enquiry=await page.$eval('.catalogue-empty a',e=>e.getAttribute('href'));
  assert.equal(enquiry,prefix+'/request-a-quote');
 }
 for(const [industry,category] of [['cosmetics-skincare-packaging','fragrance-beauty'],['jewelry-watch-packaging','jewelry-watches'],['gift-set-pr-kit-packaging','corporate-gifts']]){
  await page.goto(base+'/industries/'+industry+'/',{waitUntil:'networkidle0'});
  const link=await page.$eval('.industry-catalogue>a',e=>e.href);
  assert.equal(new URL(link).searchParams.get('category'),category);
 }
 for(const width of [390,1440]) {
  await page.setViewport({width,height:900});
  for(const path of ['/products/','/zh/products/']) {
   await page.goto(base+path,{waitUntil:'networkidle0'});
   assert(await page.$eval('.product-card img',e=>e.srcset.includes('320w')&&e.srcset.includes('500w')));
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
   // Buyers start with all families, then narrow by their product without losing that application.
   await page.waitForFunction(n=>document.querySelectorAll('.product-card').length===n,{},all.length);
   assert(await page.$eval('.product-application-tabs',e=>!e.closest('details')));
   const applications=[...new Set(all.map(p=>p.category))];
   for(const [i,category] of applications.entries()){
    await (await page.$$('.product-application-tabs button'))[i].click();
    await page.waitForFunction(n=>document.querySelectorAll('.product-card').length===n,{},all.filter(p=>p.category===category).length);
    const categoryTabs=await page.$$('.product-family-tabs button');
    for(const [j,family] of ['rigid','carton','corrugated','bag'].entries()){
     await categoryTabs[j+1].click();
     await page.waitForFunction(n=>document.querySelectorAll('.product-card').length===n,{},all.filter(p=>p.category===category&&p.family===family).length);
    }
    await page.click('.product-results button');
   }
   await page.type('input[type=search]','candle jar');
   await page.waitForFunction(()=>document.querySelectorAll('.product-card').length>0);
   const jarLinks=await page.$$eval('.product-card',es=>es.map(e=>e.getAttribute('href')));
   assert(jarLinks.some(x=>x.includes('/products/')));
   await page.click('.product-results button');
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
 // Clearing a URL-provided filter must override the initial snapshot, not reapply it.
 await page.goto(base+'/products/?family=bag',{waitUntil:'networkidle0'});
 await page.waitForFunction(n=>document.querySelectorAll('.product-card').length===n,{},all.filter(p=>p.family==='bag').length);
 await page.click('.product-results button');
 await page.waitForFunction(n=>document.querySelectorAll('.product-card').length===n,{},all.length);
 await page.goto(base+'/products/?family=unknown&structure=unknown',{waitUntil:'networkidle0'});
 await page.waitForFunction(n=>document.querySelectorAll('.product-card').length===n,{},all.length);
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
  const back=await page.$eval('.catalogue-shell>a',e=>e.href);
  assert.equal(new URL(back).searchParams.get('family'),family);
  await page.goto(back,{waitUntil:'networkidle0'});
  await page.waitForFunction(n=>document.querySelectorAll('.product-card').length===n,{},all.filter(p=>p.family===family).length);
 }
 // A two-column product template previously squeezed these paragraphs below 180px on tablets.
 for(const width of [768,900]){
  await page.setViewport({width,height:900});
  await page.goto(base+'/products/haircare-gift-ritual-hexagonal/',{waitUntil:'networkidle0'});
  const cramped=await page.$$eval('.purchase-guide p,.product-accessories p',es=>es.filter(e=>e.getBoundingClientRect().width<180).length);
  assert.equal(cramped,0,'Cramped product instructions at '+width);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 }
 // Adjacent related-product links must remain usable finger targets in both locales.
 await page.setViewport({width:390,height:900});
 for(const prefix of ['', '/zh']){
  await page.goto(base+prefix+'/products/perfume-and-refill-lift-off/',{waitUntil:'networkidle0'});
  const targets=await page.$$eval('.product-related-links a',es=>es.map(e=>({height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width})));
  assert(targets.length>0 && targets.every(t=>t.height>=44 && t.width>=24),'Related product touch targets: '+prefix);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
 }
 assert.deepEqual(errors,[]);
} finally {await browser.close();fs.mkdirSync('work/growth',{recursive:true});fs.writeFileSync('work/growth/v12-browser.json',JSON.stringify({results,errors},null,2));}
console.log('Catalogue EN/ZH at 390/1440: comparison, all family filters, no-results/reset; four product galleries and quote links; axe checks passed.');
