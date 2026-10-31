import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4239';
assert(['127.0.0.1','localhost'].includes(new URL(base).hostname));
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
try {
 for(const blocked of ['CookieConsent-','CookieSettingsButton-','analytics-',null]) {
  const context=await browser.createBrowserContext();
  const page=await context.newPage();let failures=0;
  await page.setRequestInterception(true);
  page.on('request',r=>{
   if(blocked&&r.url().includes('/chunks/'+blocked)){failures++;return r.abort('failed');}
   if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))return r.abort();
   r.continue();
  });
  await page.goto(base+'/insights/candle-box-glass-jar-protection/',{waitUntil:'networkidle0'});
  await new Promise(r=>setTimeout(r,1500));
  const state=await page.evaluate(()=>({error:document.documentElement.id==='__next_error__',title:document.querySelector('h1')?.textContent,body:document.body.textContent,quote:!!document.querySelector('a[href="/request-a-quote"]')}));
  if(blocked)assert(failures>0,'Test did not intercept '+blocked);
  assert.equal(state.error,false,'Optional '+blocked+' failure replaced the page');
  assert.equal(state.title,'Candle Jar Packaging Protection: Inside an MTT Gift Box');
  assert(state.body.includes('Measure the glass before choosing the cavity'));
  assert(state.quote,'Static enquiry link must survive');
  if(blocked==='CookieConsent-'){
   assert.equal(await page.evaluate(()=>localStorage.getItem('mtt_cookie_consent_v2')),null);
   assert.equal(await page.evaluate(()=>window['ga-disable-G-Z132GJZZ57']),true);
   assert.equal(await page.$$eval('script[src]',es=>es.filter(e=>/googletagmanager|clarity\.ms/.test(e.src)).length),0);
   await context.close();continue;
  }
  await page.click('.cookie-btn-reject');
  assert.equal(await page.evaluate(()=>localStorage.getItem('mtt_cookie_consent_v2')),'denied');
  if(blocked==='CookieSettingsButton-')assert(await page.$('a[href="/cookie-policy"]'));
  else {await page.click('.footer-cookie-btn');await page.waitForSelector('.cookie-banner',{visible:true});}
  await context.close();
 }
 console.log('Article survives failed cookie/analytics chunks; normal cookie controls remain usable.');
}finally{await browser.close();}
