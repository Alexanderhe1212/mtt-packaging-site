// Local end-to-end check: no enquiry or third-party request is sent.
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import {Launcher} from 'chrome-launcher';
const base = process.env.MTT_TEST_ORIGIN || 'http://127.0.0.1:4217';
assert(['localhost', '127.0.0.1'].includes(new URL(base).hostname));
const browser = await puppeteer.launch({executablePath: Launcher.getInstallations()[0], headless: true, args: ['--no-sandbox']});
try {
  for (const width of [390, 1440]) for (const target of ['quote', 'studio']) {
    const page = await browser.newPage();
    await page.setViewport({width, height: 844});
    await page.setRequestInterception(true);
    page.on('request', r => r.url().startsWith(base) || r.url().startsWith('data:') ? r.continue() : r.abort());
    await page.goto(`${base}/tools/box-size-calculator/`, {waitUntil: 'networkidle0'});
    for (const [name, value] of [['length', '180'], ['width', '120'], ['height', '50']]) {
      await page.type(`[aria-label="Product ${name} (mm)"]`, value);
    }
    await page.click('button.calc-v2-submit');
    await page.waitForSelector('.calc-v2-quote-btn');
    const buttons = await page.$$('.calc-v2-quote-btn');
    await buttons[target === 'studio' ? 0 : 1].click();
    await page.waitForFunction(t => location.pathname.includes(t === 'studio' ? 'gift-box-solution-builder' : 'request-a-quote'), {}, target);
    if (target === 'quote') {
      await page.waitForSelector('[name=calculator_summary]');
      assert((await page.$eval('[name=calculator_summary]', e => e.value)).includes('180'));
    } else {
      await page.waitForFunction(() => document.querySelector('iframe')?.contentDocument?.querySelector('dialog[open]'), {timeout: 20000});
      const text = await page.$eval('iframe', f => f.contentDocument.querySelector('dialog').textContent);
      assert(text.includes('186 × 126 × 56 mm'), text);
    }
    await page.close();
  }
  console.log('Calculator navigation: quote handoff and studio import passed at 390/1440px.');
} finally { await browser.close(); }
