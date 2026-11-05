// Hold application scripts while the static HTML accepts the buyer's first selection.
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';

const origin = process.env.MTT_TEST_ORIGIN || 'http://127.0.0.1:4217';
assert(['localhost', '127.0.0.1'].includes(new URL(origin).hostname));
const browser = await puppeteer.launch({executablePath: Launcher.getInstallations()[0], headless: true});
try {
  const page = await browser.newPage();
  await page.setViewport({width: 390, height: 844, isMobile: true, hasTouch: true});
  await page.setCacheEnabled(false);
  let resume;
  const ready = new Promise(resolve => { resume = resolve; });
  let delayed = 0;
  await page.setRequestInterception(true);
  page.on('request', async request => {
    if (!request.url().startsWith(origin) && !request.url().startsWith('data:')) return request.abort();
    if (request.resourceType() === 'script') {
      delayed++;
      await ready;
    }
    return request.continue();
  });

  const loaded = page.goto(origin + '/products/?utm_source=catalogue-test', {waitUntil: 'networkidle0'});
  await page.waitForSelector('.catalogue-refine summary', {visible: true});
  await page.locator('.catalogue-refine summary').click();
  await page.select('.catalogue-refine select', 'jewelry-watches');
  await page.locator('.product-family-tabs button[value="rigid"]').click();
  await page.waitForSelector('[data-early-filter-status]', {visible: true});
  assert(delayed > 0);
  resume();
  await loaded;
  await page.waitForFunction(() => {
    const params = new URLSearchParams(location.search);
    return params.get('category') === 'jewelry-watches' && params.get('family') === 'rigid';
  });
  assert.equal(new URL(page.url()).searchParams.get('utm_source'), 'catalogue-test');
  assert(await page.$eval('[data-early-filter-status]', element => element.hidden));
  const choices = await page.$$eval('.product-card', cards => cards.map(card => card.pathname));
  assert(choices.includes('/products/earring-collection-library-stacked-drawers'));
  assert(!choices.includes('/products/signature-perfume-lift-off'));
  console.log('Early mobile category and family selections survived delayed JavaScript.');
} finally {
  await browser.close();
}
