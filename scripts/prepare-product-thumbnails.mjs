// Derived display thumbnails only: originals and packaging artwork are unchanged.
// Read buffers first so cloud-backed local files are hydrated before native decoding.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const CONCURRENCY = 8;

async function runPool(items, worker) {
  let index = 0;
  const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (index < items.length) {
      const current = items[index++];
      await worker(current);
    }
  });
  await Promise.all(runners);
}

async function needsBuild(source, target, expectedWidth = null) {
  const input = await fs.stat(source);
  const output = await fs.stat(target).catch(() => null);
  if (!output || input.mtimeMs > output.mtimeMs) return true;
  if (expectedWidth !== null) {
    const meta = await sharp(await fs.readFile(target)).metadata();
    return meta.width !== expectedWidth;
  }
  return false;
}

const products = (
  await Promise.all(
    [
      'lib/products.json',
      'lib/products-expanded.json',
      'lib/products-november-17.json',
      'lib/products-november-18.json',
    ].map(async (p) => JSON.parse(await fs.readFile(p, 'utf8')))
  )
).flat();

await fs.mkdir('public/products/thumbs', { recursive: true });
const thumbTasks = [];
for (const p of products) {
  const views = p.conceptSingleView ? 1 : p.structure === 'fold-flat' ? 6 : 5;
  for (let view = 0; view < views; view++) {
    const source = 'public' + p.image.replace('.webp', `-${view}.webp`);
    const target = 'public/products/thumbs/' + path.basename(source);
    thumbTasks.push({ source, target });
  }
}

await runPool(thumbTasks, async ({ source, target }) => {
  if (await needsBuild(source, target)) {
    await sharp(await fs.readFile(source))
      .resize({ width: 160, height: 160, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(target);
  }
});
console.log(`${thumbTasks.length} product thumbnails prepared; full-size originals preserved.`);

await fs.mkdir('public/products/cards', { recursive: true });
await runPool(products, async (p) => {
  const source = 'public' + p.image.replace('.webp', '-0.webp');
  const target = 'public/products/cards/' + path.basename(source);
  if (await needsBuild(source, target, 320)) {
    await sharp(await fs.readFile(source))
      .resize({ width: 320, height: 320, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(target);
  }
});
console.log(`${products.length} responsive catalogue images prepared.`);

// Small navigation marks retain the full-size source for larger placements.
await fs.mkdir('public/brand/responsive', { recursive: true });
await runPool([54, 108], async (width) => {
  const source = 'public/brand/mtt-gold-triangle.webp';
  const target = `public/brand/responsive/mtt-gold-triangle-${width}.webp`;
  if (await needsBuild(source, target, width)) {
    await sharp(await fs.readFile(source)).resize(width, width).webp({ quality: 88 }).toFile(target);
  }
});

// Accessory choice cards display at 96 CSS pixels; 288px retains detail on 3x screens.
await fs.mkdir('public/accessories/responsive', { recursive: true });
const accessoryNames = ['bag', 'card', 'cloth', 'pouch', 'ribbon', 'sleeve', 'tag', 'tissue'];
await runPool(accessoryNames, async (name) => {
  const source = `public/accessories/${name}.jpg`;
  const target = `public/accessories/responsive/${name}.webp`;
  if (await needsBuild(source, target)) {
    await sharp(await fs.readFile(source))
      .resize({ width: 288, height: 288, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(target);
  }
});
console.log('8 responsive accessory previews prepared; originals preserved.');
