import { createServer } from 'vite';
import { mkdir, readFile, writeFile, readdir, copyFile } from 'node:fs/promises';
import path from 'node:path';

// Vinext's static export does not emit the sitemap metadata route.
// Load the authoritative route function using the existing TS-capable Vite runtime.
const server = await createServer({ configFile: false, server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: sitemap } = await server.ssrLoadModule('/app/sitemap.ts');
  const { default: manifest } = await server.ssrLoadModule('/app/manifest.ts');
  await writeFile('dist/client/manifest.webmanifest', JSON.stringify(manifest()));
  const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const entries = sitemap().map(entry => `<url><loc>${escape(entry.url)}</loc>${entry.lastModified ? `<lastmod>${escape(entry.lastModified instanceof Date ? entry.lastModified.toISOString() : entry.lastModified)}</lastmod>` : ''}</url>`);
  await writeFile('public/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`);
  await copyFile('public/sitemap.xml', 'dist/client/sitemap.xml');
} finally { await server.close(); }

async function collect(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const filename = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await collect(filename));
    else if (entry.name.endsWith('.html') && !['index.html', '404.html'].includes(entry.name) && !entry.name.startsWith('_')) files.push(filename);
  }
  return files;
}
for (const file of await collect('dist/client')) {
  const directory = file.slice(0, -5);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), await readFile(file));
}
console.log('Sitemap emitted from app/sitemap.ts; trailing-slash pages prepared with unchanged canonical URLs.');
