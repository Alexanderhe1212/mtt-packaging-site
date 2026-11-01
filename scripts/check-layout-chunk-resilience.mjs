import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4217';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const paths=['/insights/eva-vs-paperboard-inserts/','/insights/cmyk-vs-spot-colour-packaging/','/products/custom-diffuser-packaging-set/','/zh/products/custom-diffuser-packaging-set/','/','/request-a-quote/'];
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
const results=[];
try{
 for(const chunk of ['layout-segment-context-','app-runtime-']) for(const path of paths){
 const context=await browser.createBrowserContext(),page=await context.newPage();let blocked=0;const errors=[];
 await page.setViewport({width:390,height:844});await page.setRequestInterception(true);
 page.on('request',r=>{if(r.url().includes('/chunks/'+chunk)){blocked++;return r.abort('failed');}if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))return r.abort();r.continue();});
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+path,{waitUntil:'networkidle0'});await new Promise(r=>setTimeout(r,1000));
 const state=await page.evaluate(()=>({error:document.documentElement.id==='__next_error__',h1:document.querySelector('h1')?.textContent,canonical:document.querySelector('link[rel=canonical]')?.href,bodyLength:document.body.innerText.length}));
 // Losing the eager entry must leave the exported HTML readable, not hydrate
 // a partial tree and replace the whole document with a 200-status error page.
 if(chunk==='app-runtime-')assert(blocked>0,'The entry-failure scenario did not intercept a request');
 assert.equal(state.canonical,'https://mttpackaging.com'+(path==='/'?path:path.slice(0,-1)));
 results.push({path,chunk,blocked,...state,errors});await context.close();
 }
 console.log(JSON.stringify(results,null,2));assert(results.every(r=>!r.error&&r.h1&&r.bodyLength>500),'Failed layout chunk erased page content');
}finally{await browser.close();}
