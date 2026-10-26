// Real browser regression checks against a local build. All external requests blocked.
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
import fs from 'node:fs';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4217';
assert(['127.0.0.1','localhost'].includes(new URL(base).hostname),'Local test server required');
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
const page=await browser.newPage();let submitted=0,accept=false,forceHttpSuccess=false;const submissionBodies=[],measurements=[];
await page.exposeFunction("qaMeasurement",entry=>measurements.push(entry));
await page.evaluateOnNewDocument(()=>{
 localStorage.setItem("mtt_cookie_consent_v2","granted");
 const entries=[];const original=entries.push;entries.push=function(...items){for(const item of items)window.qaMeasurement(Array.from(item));return original.apply(this,items)};window.dataLayer=entries;
});
await page.setRequestInterception(true);
page.on('request',r=>{
 if(r.url()==='https://formspree.io/f/xyeyzwpw'){
  if(r.method()==='OPTIONS')return r.respond({status:204,headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST','Access-Control-Allow-Headers':'Content-Type,Accept'},body:''});
  submitted++;submissionBodies.push(r.postData()||'');return r.respond({status:accept||forceHttpSuccess?200:503,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({ok:accept})});
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
 assert.equal(submitted,1);assert(submissionBodies[0].includes('name="lead_source"\r\n\r\nquote_page'));assert(submissionBodies[0].includes('name="submission_page"\r\n\r\n/request-a-quote/'));
 assert(!measurements.some(e=>e[0]==='event'&&e[1]==='generate_lead'),'rejected form must not count as an accepted lead');assert(measurements.some(e=>e[0]==='event'&&e[1]==='quote_error'));
 assert.equal(await page.$eval('[name=email]',e=>e.value),'local-test@example.com');
 assert(await page.evaluate(key=>Boolean(sessionStorage.getItem(key)),key));
 accept=true;
 await Promise.all([page.waitForNavigation(),page.$eval('[type=submit]',b=>b.click())]);
 assert(page.url().includes('/thank-you'));assert.equal(submitted,2);assert.equal(measurements.filter(e=>e[0]==='event'&&e[1]==='generate_lead').length,1);assert.equal(measurements.filter(e=>e[0]==='event'&&e[1]==='quote_start').length,1);
 assert(!JSON.stringify(measurements.filter(e=>e[0]==='event')).includes('local-test@example.com'),'enquiry email must not appear in analytics events');
 assert(await page.evaluate(key=>Boolean(sessionStorage.getItem(key)),key),'unrelated enquiry preserves calculator data');
 await page.goto(base+'/request-a-quote/?source=calculator',{waitUntil:'networkidle0'});
 assert.equal(await page.$eval('[name=packagingType]',e=>e.value),'Corrugated Box');
 assert.equal(await page.$eval('[name=boxDimensions]',e=>e.value),'110 × 90 × 60 mm');
 assert(await page.$('[name=calculator_summary]'));
 for(const width of [390,1280]){
  await page.setViewport({width,height:900});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'quote overflow');
 }
 // Exercise the real chatbot UI: HTTP 200 alone must not count as acceptance.
 await page.goto(base+'/request-a-quote/',{waitUntil:'networkidle0'});
 const clickChat=async text=>{await page.waitForFunction(text=>[...document.querySelectorAll('.chatbot-widget button,.hugo-widget button')].some(e=>e.textContent.trim()===text),{},text);await page.evaluate(text=>[...document.querySelectorAll('.chatbot-widget button,.hugo-widget button')].find(e=>e.textContent.trim()===text).click(),text)};
 await page.click('[aria-label="Talk to Hugo"]');await clickChat('Help me get started →');await clickChat('Start Project Check');
 await clickChat('Custom Rigid Box');await clickChat('1,000–4,999 pcs');await clickChat('Not Sure Yet');
 await page.waitForSelector('.chatbot-input');await page.type('.chatbot-input','United Kingdom');await clickChat('Continue');await clickChat('Need a Physical Sample');
 await page.waitForSelector('input[placeholder="Your name"]');await page.type('input[placeholder="Your name"]','Local chat test');await clickChat('Continue');
 await page.waitForSelector('.chatbot-input[type=email]');await page.type('.chatbot-input[type=email]','local-test@example.com');await clickChat('Continue');await clickChat('Skip');
 accept=false;forceHttpSuccess=true;await clickChat('Submit Enquiry');
 await page.waitForFunction(()=>[...document.querySelectorAll('.chatbot-widget button')].some(e=>e.textContent.trim()==='Try Again'));
 assert.equal(measurements.filter(e=>e[0]==='event'&&e[1]==='chatbot_submitted').length,0);
 accept=true;await clickChat('Try Again');await page.waitForSelector('.chatbot-success-icon');
 assert.equal(measurements.filter(e=>e[0]==='event'&&e[1]==='chatbot_submitted').length,1);
 const chat=JSON.parse(submissionBodies.at(-1));assert.equal(chat.leadSource,'Website Chatbot');assert.equal(chat.email,'local-test@example.com');
 assert(!JSON.stringify(measurements.filter(e=>e[0]==='event')).includes('local-test@example.com'));
 console.log('Browser: four family prefills, stale calculator isolation, uncertain planning enquiry, artwork link, failure/retry, source fields, consented event triggers without enquiry email, accepted redirect, chatbot rejected-JSON/retry and 390/1280px layout pass. No live enquiry sent.');
}finally{await browser.close()}
