import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import sharp from 'sharp';

const products = ['lib/products.json', 'lib/products-expanded.json'].flatMap(file => JSON.parse(fs.readFileSync(file)));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const records = products.map(product => {
  const file = `docs/catalog/loaded-refresh/${product.code}.json`;
  const record = JSON.parse(fs.readFileSync(file));
  assert.equal(record.status, 'reviewed', `${product.code}: visual review incomplete`);
  assert.ok(record.reviewNotes, `${product.code}: missing review notes`);
  assert.ok(fs.existsSync(record.source), `${product.code}: missing source`);
  return {product, file, record};
});
fs.mkdirSync('work/catalog-loaded-sources', {recursive: true});
const audit = [];
for (const {product, file, record} of records) {
  const source = `work/catalog-loaded-sources/${product.code}.png`;
  if (path.resolve(record.source) !== path.resolve(source)) fs.copyFileSync(record.source, source);
  const {width, height} = await sharp(source).metadata();
  assert.ok(Math.abs(width / height - 1.5) < .03, `${product.code}: unexpected sheet layout`);
  const order = [1, 0, 2, 3, 4]; // Loaded hero, closed set, side, loaded detail, finish.
  const images = [];
  for (const [index, cell] of order.entries()) {
    const col = cell % 3, row = Math.floor(cell / 3);
    const left = Math.round(col * width / 3) + 6, top = Math.round(row * height / 2) + 6;
    const right = Math.round((col + 1) * width / 3) - 6, bottom = Math.round((row + 1) * height / 2) - 6;
    const output = 'public' + product.image.replace('.webp', `-${index}.webp`);
    await sharp(source).extract({left, top, width: right - left, height: bottom - top}).webp({quality: 90}).toFile(output);
    images.push({path: output, sha256: hash(output)});
  }
  const sourceHash = hash(source);
  fs.writeFileSync(file, JSON.stringify({...record, source, reviewedSourceHash: sourceHash, viewOrder: order, images}, null, 2) + '\n');
  const legacy = `docs/catalog/generated/${product.code}.json`;
  if (fs.existsSync(legacy)) {
    const previous = JSON.parse(fs.readFileSync(legacy));
    fs.writeFileSync(legacy, JSON.stringify({...previous, source, prompt: record.prompt, status: 'approved', reviewedSourceHash: sourceHash, reviewNotes: record.reviewNotes}, null, 2) + '\n');
  }
  audit.push({code: product.code, source, sourceHash, width, height, viewOrder: order, images});
}
fs.writeFileSync('docs/catalog/loaded-view-audit.json', JSON.stringify(audit, null, 2) + '\n');
console.log(`${products.length} reviewed products exported; ${products.length * 5} images, loaded hero first.`);
