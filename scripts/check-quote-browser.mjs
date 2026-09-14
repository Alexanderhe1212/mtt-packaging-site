// Real browser regression checks against a local build. All external requests blocked.
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
import fs from 'node:fs';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4217';
assert(['127.0.0.1','localhost'].includes(new URL(base).hostname),'Local test server required');
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
const page=await browser.newPage();let submitted=0,accept=false;
await page.setRequestInterception(true);
page.on('request',r=>{
 if(r.url()==='https://formspree.io/f/xyeyzwpw'){
  submitted++;return r.respond({status:accept?200:503,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({ok:accept})});
 }
 if(r.url().startsWith(base)||r.url().startsWith('data:'))return r.continue();
 return r.abort();
});
const data={productType:'other',productLength:'100',productWidth:'80',productHeight:'50',unit:'mm',packagingType:'corrugated',clearance:'5',boardThickness:'2',insert:'none',quantity:'1,000–2,999 pcs',internalL:'110',internalW:'90',internalH:'60',externalL:'114',externalW:'94',externalH:'64',volumeDisplay:'1',sheetLayoutUsed:false,cbmUsed:false};
const key=fs.readFileSync('lib/box-calculator.ts','utf8').match(/CALC_HANDOFF_KEY\s*=\s*['"]([^'"]+)/)[1];
try{
 await page.setViewport({width:390,height:844});
 await page.goto(base+'/request-a-quote/',{waitUntil:'networkidle0'});
 await page.evaluate((key,data)=>sessionStorage.setItem(key,JSON.stringify(data)),key,data);
 for(const [family,type] of Object.entries({rigid:'Rigid Box',carton:'Folding Carton',corrugated:'Corrugated Box',bag:'Paper Bag'})){
  await page.goto(base+'/request-a-quote/?'+new URLSearchParams({product:'TEST Selected design',product_family:family,accessories:'Greeting card, Ribbon'}),{waitUntil:'networkidle0'});
  assert.equal(await page.$eval('[name=packagingType]',e=>e.value),type);
  assert.equal(await page.$eval('[name=selected_product]',e=>e.value),'TEST Selected design');
  assert.equal(await page.$eval('[name=boxDimensions]',e=>e.value),'');
  assert.equal(await page.$('[name=calculator_summary]'),null,'unrelated stale calculator data must not attach');
 }
 await page.select('[name=packagingType]','Not sure - recommendation requested');
 await page.select('[name=quantity]','Not sure - planning stage');
 for(const [name,value] of Object.entries({name:'Local test',email:'local-test@example.com',country:'United Kingdom',artwork_url:'https://example.com/reference'}))await page.type(`[name=${name}]`,value);
 assert(await page.$eval('form[action*="formspree"]',f=>f.checkValidity()));
 await page.$eval('[type=submit]',b=>b.click());
 await page.waitForSelector('[role=alert]');
 assert.equal(submitted,1);assert.equal(await page.$eval('[name=email]',e=>e.value),'local-test@example.com');
 assert(await page.evaluate(key=>Boolean(sessionStorage.getItem(key)),key));
 accept=true;
 await Promise.all([page.waitForNavigation(),page.$eval('[type=submit]',b=>b.click())]);
 assert(page.url().includes('/thank-you'));assert.equal(submitted,2);
 assert(await page.evaluate(key=>Boolean(sessionStorage.getItem(key)),key),'unrelated enquiry preserves calculator data');
 await page.goto(base+'/request-a-quote/?source=calculator',{waitUntil:'networkidle0'});
 assert.equal(await page.$eval('[name=packagingType]',e=>e.value),'Corrugated Box');
 assert.equal(await page.$eval('[name=boxDimensions]',e=>e.value),'110 × 90 × 60 mm');
 assert(await page.$('[name=calculator_summary]'));
 for(const width of [390,1280]){
  await page.setViewport({width,height:900});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'quote overflow');
 }
 console.log('Browser: four family prefills, stale calculator isolation, uncertain planning enquiry, artwork link, failure/retry, accepted redirect and 390/1280px layout pass. No live enquiry sent.');
}finally{await browser.close()}
