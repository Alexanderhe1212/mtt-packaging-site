// Regenerate fixed previews from the same browser renderer as the live fallback.
// Build and serve locally first, then run with MTT_TEST_ORIGIN set to that server.
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
import {STRUCTURES} from '../tools/packaging-studio/app/lib/solution-project.mjs';
const base=process.env.MTT_TEST_ORIGIN||'http://127.0.0.1:4217';
assert(['localhost','127.0.0.1'].includes(new URL(base).hostname));
const browser=await puppeteer.launch({executablePath:Launcher.getInstallations()[0],headless:true,args:['--no-sandbox']});
try{
 const page=await browser.newPage();
 await page.setViewport({width:1440,height:1000});
 await page.setRequestInterception(true);
 page.on('request',r=>r.url().includes('/images/studio-structures/')?r.abort():r.url().startsWith(base)||r.url().startsWith('data:')?r.continue():r.abort());
 await page.goto(base+'/tools/gift-box-solution-builder/app.html',{waitUntil:'networkidle0'});
 const output='public/images/studio-structures';await mkdir(output,{recursive:true});
 for(const type of Object.keys(STRUCTURES)){
  const el=await page.$('.box-thumb-'+type);assert(el,type);
  await el.evaluate(e=>e.scrollIntoView());
  await page.waitForFunction(e=>e.querySelector('img')?.naturalWidth>0&&e.querySelector('img').src.startsWith('data:image/webp;base64,'),{},el);
  const src=await el.$eval('img',e=>e.src);
  await writeFile(output+'/'+type+'.webp',Buffer.from(src.split(',')[1],'base64'));
 }
 console.log('Generated '+Object.keys(STRUCTURES).length+' illustrative previews from the live model.');
}finally{await browser.close()}
