import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4217';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
try {
 for(const zh of [false,true]) for(const blocked of ['ProductAccessories-','ProductGallery-',null]) {
 const context=await browser.createBrowserContext();const page=await context.newPage();let failures=0;
 await page.setViewport({width:390,height:844});await page.setRequestInterception(true);
 page.on('request',r=>{if(blocked&&r.url().includes('/chunks/'+blocked)){failures++;return r.abort('failed');}if(!r.url().startsWith(base)&&!r.url().startsWith('data:'))return r.abort();r.continue();});
 await page.goto(base+(zh?'/zh':'')+'/products/custom-diffuser-packaging-set/',{waitUntil:'networkidle0'});
 await new Promise(r=>setTimeout(r,1500));
 const state=await page.evaluate(()=>({error:document.documentElement.id==='__next_error__',h1:document.querySelector('h1')?.textContent,fields:document.querySelectorAll('dl dd').length,img:!!document.querySelector('.product-detail img'),links:Array.from(document.querySelectorAll('.product-detail a.button')).map(e=>e.href),overflow:document.documentElement.scrollWidth>innerWidth}));
 if(blocked)assert(failures>0,'Missing intercepted request: '+blocked);
 assert.equal(state.error,false,'Product content lost after '+blocked);
 assert(state.h1);assert(state.fields>=8);assert(state.img);assert(!state.overflow);
 assert(state.links.length>=2);for(const href of state.links){const u=new URL(href);assert(u.searchParams.get('product'));assert(u.searchParams.get('product_family'));}
 if(!blocked){await page.click('.product-accessories input');const href=await page.$eval('.product-summary a.button',e=>e.href);assert(new URL(href).searchParams.get('accessories'));}
 await context.close();console.log('PASS',zh?'ZH':'EN',blocked||'normal');
 }
}finally{await browser.close();}
