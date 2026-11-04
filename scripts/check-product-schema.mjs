import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {siteUrl, breadcrumb} from '../lib/seo.ts';

// Exercise the actual serialized component expression, including HTML escaping.
// This complements, and does not replace, the production build/release checks.
const source = readFileSync('components/ProductDetail.tsx', 'utf8');
const expression = source.split('__html:')[1]?.split('}}/>')[0];
assert.ok(expression, 'ProductDetail JSON-LD expression must be present');
const products = ['lib/products.json', 'lib/products-expanded.json']
  .flatMap(path => JSON.parse(readFileSync(path, 'utf8')));
const forbidden = new Set(['offers', 'price', 'priceCurrency', 'availability',
  'aggregateRating', 'review', 'ratingValue', 'reviewCount', 'gtin', 'mpn']);
function checkNoInventedClaims(value) {
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    assert.ok(!forbidden.has(key), `Unsupported commerce claim: ${key}`);
    checkNoInventedClaims(child);
  }
}
for (const p of products) for (const zh of [false, true]) {
  const json = runInNewContext(expression, {p, zh, siteUrl, breadcrumb});
  const data = JSON.parse(json);
  if (process.argv.includes('--built')) {
    const path = `${zh ? '/zh' : ''}/products/${p.slug}`;
    const html = readFileSync(`dist/client${path}/index.html`, 'utf8');
    const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
      .map(match => JSON.parse(match[1]));
    const actual = scripts.flatMap(value => value['@graph'] || [value]);
    assert.equal(actual.filter(n => n['@type'] === 'Product').length, 1, path);
    for (const expected of data['@graph']) {
      assert.deepEqual(actual.find(n => n['@type'] === expected['@type']), expected, path);
    }
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}${path}"`), path);
    assert.ok(html.includes(`hrefLang="en" href="${siteUrl}/products/${p.slug}"`), path);
    assert.ok(html.includes(`hrefLang="zh-Hans" href="${siteUrl}/zh/products/${p.slug}"`), path);
  }
  const graph = data['@graph'];
  const entities = graph.filter(n => n['@type'] === 'Product');
  assert.equal(entities.length, 1, `${p.code}/${zh}: exactly one Product`);
  const product = entities[0];
  const page = graph.find(n => n['@type'] === 'WebPage');
  const url = `${siteUrl}${zh ? '/zh' : ''}/products/${p.slug}`;
  assert.equal(product['@id'], `${url}#product`);
  assert.equal(page.mainEntity['@id'], product['@id']);
  assert.equal(product.mainEntityOfPage['@id'], page['@id']);
  assert.equal(product.url, url);
  assert.equal(product.name, zh ? p.nameZh : p.name);
  assert.equal(product.identifier, p.code);
  assert.ok(product.description.startsWith(zh ? p.descriptionZh : p.description));
  assert.match(product.description, zh ? /非现货或已交付订单证明/ : /not stock availability or evidence of a delivered order/);
  assert.deepEqual(product.image, page.image);
  for (const image of product.image) assert.ok(existsSync('public' + new URL(image).pathname), image);
  assert.equal(graph.filter(n => n['@type'] === 'BreadcrumbList').length, 1);
  assert.equal(page.inLanguage, zh ? 'zh-Hans' : 'en');
  checkNoInventedClaims(product);
}
const hostile = {...products[0], name: '</script><script>alert(1)</script>'};
const escaped = runInNewContext(expression, {p:hostile, zh:false, siteUrl, breadcrumb});
assert.ok(!escaped.includes('<'), 'JSON-LD must escape HTML delimiters');
assert.equal(JSON.parse(escaped)['@graph'].find(n=>n['@type']==='Product').name, hostile.name);
console.log(`PASS: ${products.length * 2} localized product graphs; images, links, claims and escaping`);
