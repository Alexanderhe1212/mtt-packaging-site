/**
 * Submit changed URLs to Bing IndexNow and (when configured) Google Search Console.
 *
 * (a) Uses the existing 32-char hex IndexNow key in public/{key}.txt (or creates one
 *     if absent) and notifies https://api.indexnow.org/indexnow.
 * (b) When gsc-key.json or GSC_SERVICE_ACCOUNT_JSON is available, resubmits
 *     sitemap.xml / sitemap-products.xml and calls GSC URL Inspection on target URLs.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createSearchConsoleClient, resolveSiteUrl } from './gsc-report.mjs';

const ROOT = process.cwd();
const ORIGIN = 'https://mttpackaging.com';
const PUBLIC_DIR = path.join(ROOT, 'public');

function ensureIndexNowKey() {
  const files = fs.readdirSync(PUBLIC_DIR);
  for (const name of files) {
    if (!/^[a-f0-9]{32}\.txt$/i.test(name)) continue;
    const stem = name.slice(0, -4);
    const content = fs.readFileSync(path.join(PUBLIC_DIR, name), 'utf8').trim();
    if (content === stem) {
      return { key: stem, keyLocation: `${ORIGIN}/${name}`, created: false };
    }
  }
  const key = crypto.randomBytes(16).toString('hex');
  const filename = `${key}.txt`;
  fs.writeFileSync(path.join(PUBLIC_DIR, filename), key, 'utf8');
  return { key, keyLocation: `${ORIGIN}/${filename}`, created: true };
}

function parseCliArgs(argv) {
  const urls = [];
  let dryRun = false;
  let sitemapOnly = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run') dryRun = true;
    else if (arg === '--sitemap-only') sitemapOnly = true;
    else if (arg === '--url' && argv[i + 1]) {
      urls.push(argv[i + 1]);
      i += 1;
    } else if (!arg.startsWith('-')) {
      urls.push(arg);
    }
  }
  return { urls, dryRun, sitemapOnly };
}

function normalizeUrl(raw) {
  if (/^https?:\/\//i.test(raw)) return raw.replace(/\/+$/, '') || ORIGIN;
  const clean = raw.replace(/^\/+/, '').replace(/\/+$/, '');
  return clean ? `${ORIGIN}/${clean}` : ORIGIN;
}

function discoverChangedUrlsFromManifest() {
  const manifestPath = path.join('/tmp', 'indexnow-result.json');
  if (fs.existsSync(manifestPath)) {
    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    if (Array.isArray(data.urls) && data.urls.length) return data.urls;
  }
  try {
    const changed = execFileSync('git', ['diff', '--name-only', 'HEAD~1..HEAD'], {
      cwd: ROOT,
      encoding: 'utf8',
    })
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const inferred = new Set();
    for (const file of changed) {
      if (file.startsWith('lib/buyer-guides-') && fs.existsSync(path.join(ROOT, file))) {
        const items = JSON.parse(fs.readFileSync(path.join(ROOT, file), 'utf8'));
        for (const item of Array.isArray(items) ? items : [items]) {
          if (item.slug) inferred.add(`${ORIGIN}/insights/${item.slug}`);
        }
        inferred.add(`${ORIGIN}/insights`);
      }
    }
    return [...inferred];
  } catch {
    return [];
  }
}

async function submitIndexNow(urls, keyInfo, dryRun) {
  if (!urls.length) {
    console.log('IndexNow: no target URLs to submit.');
    return;
  }
  const payload = {
    host: 'mttpackaging.com',
    key: keyInfo.key,
    keyLocation: keyInfo.keyLocation,
    urlList: urls,
  };
  if (dryRun) {
    console.log('IndexNow dry-run payload:', JSON.stringify(payload, null, 2));
    return;
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });
  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow failed with HTTP ${response.status}: ${await response.text()}`);
  }
  console.log(`IndexNow: HTTP ${response.status} for ${urls.length} URL(s).`);
}

async function submitGsc(urls, dryRun) {
  const client = await createSearchConsoleClient(['https://www.googleapis.com/auth/webmasters']);
  if (!client) {
    console.log(
      'GSC skipped: gsc-key.json / GSC_SERVICE_ACCOUNT_JSON not configured yet.',
    );
    return;
  }
  const siteUrl = await resolveSiteUrl(client);
  const sitemaps = [`${ORIGIN}/sitemap.xml`, `${ORIGIN}/sitemap-products.xml`];

  if (dryRun) {
    console.log(`GSC dry-run: would submit sitemaps to ${siteUrl} and inspect ${urls.length} URL(s).`);
    return;
  }

  for (const feedpath of sitemaps) {
    await client.sitemaps.submit({ siteUrl, feedpath });
    console.log(`GSC sitemap submitted: ${feedpath} (${siteUrl})`);
  }

  for (const inspectionUrl of urls.slice(0, 10)) {
    const res = await client.urlInspection.index.inspect({
      requestBody: { inspectionUrl, siteUrl },
    });
    const idx = res.data.inspectionResult?.indexStatusResult;
    console.log(
      `GSC inspect ${inspectionUrl}: verdict=${idx?.verdict || 'UNKNOWN'} | state=${
        idx?.coverageState || 'UNKNOWN'
      } | lastCrawl=${idx?.lastCrawlTime || 'N/A'}`,
    );
  }
}

async function main() {
  const { urls, dryRun, sitemapOnly } = parseCliArgs(process.argv.slice(2));
  const keyInfo = ensureIndexNowKey();
  console.log(
    `IndexNow key ready: ${keyInfo.keyLocation}${keyInfo.created ? ' (created)' : ' (existing)'}`,
  );

  const targetUrls = sitemapOnly
    ? []
    : (urls.length ? urls.map(normalizeUrl) : discoverChangedUrlsFromManifest());

  await submitIndexNow(targetUrls, keyInfo, dryRun);
  await submitGsc(targetUrls, dryRun);
}

await main();
