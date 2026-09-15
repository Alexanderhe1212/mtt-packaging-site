import assert from 'node:assert/strict';
import fs from 'node:fs';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4223';
assert(['127.0.0.1','localhost'].includes(new URL(base).hostname));
const paths=[...fs.readFileSync('dist/client/sitemap.xml','utf8').matchAll(/<loc>https:\/\/mttpackaging.com(\/insights\/[^<]+)<\/loc>/g)].map(m=>m[1]);
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage();
 await page.setRequestInterception(true);page.on('request',r=>r.url().startsWith(base)||r.url().startsWith('data:')?r.continue():r.abort());
 for(const width of [390,768,1440]){
  await page.setViewport({width,height:900});
  for(const path of paths){
   await page.goto(base+path,{waitUntil:'domcontentloaded'});
   const errors=await page.evaluate(()=>{
    const issues=[];
    for(const row of document.querySelectorAll('.article-body > section')){
     const content=row.querySelector(':scope > div');
     const available=row.clientWidth;
     if(content.getBoundingClientRect().width<available-(row.classList.contains('article-numbered-section')?130:2))issues.push('Narrow content: '+content.textContent.slice(0,60));
    }
    if(document.documentElement.scrollWidth>innerWidth+2)issues.push('Horizontal overflow');
    return issues;
   });
   assert.deepEqual(errors,[],path+' at '+width);
  }
 }
 console.log(`${paths.length} articles: body and FAQ widths passed at 390, 768 and 1440px`);
}finally{await browser.close()}
