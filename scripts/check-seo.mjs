/**
 * Pre-build SEO/GEO lint for MTT Packaging Next.js/Vinext source files.
 *
 * Inspects guide JSON records, product catalogue JSON records, internal links,
 * Quick Answer word counts, title/meta lengths, image alt text, and image files.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BANNED_RE =
  /In today.s competitive market|In conclusion|anonymized project discussion|20–35%|\$2–4/i;

function readJson(relPath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, relPath), 'utf8'));
}

function getModifiedFiles() {
  try {
    const out = execFileSync('git', ['status', '--porcelain'], {
      cwd: ROOT,
      encoding: 'utf8',
    });
    return new Set(
      out
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => line.slice(3).trim().replace(/^.* -> /, '')),
    );
  } catch {
    return new Set();
  }
}

function collectGuideJsonPaths() {
  const articlesSrc = fs.readFileSync(path.join(ROOT, 'lib/articles.ts'), 'utf8');
  const matches = [...articlesSrc.matchAll(/from\s+['"]\.\/([^'"]+\.json)['"]/g)].map(
    (m) => m[1],
  );
  return matches.filter((name) => name !== 'buyer-article-updates.json').map((name) => `lib/${name}`);
}

function collectProductJsonPaths() {
  const productsSrc = fs.readFileSync(path.join(ROOT, 'lib/products.ts'), 'utf8');
  return [...productsSrc.matchAll(/from\s+['"]\.\/([^'"]+\.json)['"]/g)].map(
    (m) => `lib/${m[1]}`,
  );
}

function checkGuides(errors, modifiedFiles) {
  const guides = new Map();
  for (const relPath of collectGuideJsonPaths()) {
    const raw = readJson(relPath);
    const items = Array.isArray(raw) ? raw : [raw];
    for (const item of items) {
      if (guides.has(item.slug)) errors.push(`Duplicate guide slug: ${item.slug}`);
      guides.set(item.slug, { ...item, _file: relPath });
    }
  }

  const updates = readJson('lib/buyer-article-updates.json');
  const navSrc = fs.readFileSync(path.join(ROOT, 'lib/article-navigation.ts'), 'utf8');
  const seenTitles = new Set();
  const seenSummaries = new Set();

  for (const [slug, base] of guides.entries()) {
    const g = { ...base, ...(updates[slug] || {}) };
    const title = (g.seoTitle || `${g.title} | MTT Packaging`).trim();
    if (!g.title?.trim()) errors.push(`${slug}: missing H1 title`);
    if (title.length >= 70) errors.push(`${slug}: SEO title length ${title.length} >= 70`);
    const summaryLen = (g.summary || '').trim().length;
    if (!summaryLen) errors.push(`${slug}: missing meta description (summary)`);
    else if (summaryLen < 50 || summaryLen > 160) {
      errors.push(`${slug}: meta description length ${summaryLen} outside 50..160`);
    }
    if (seenTitles.has(g.title)) errors.push(`${slug}: duplicate title`);
    if (seenSummaries.has(g.summary)) errors.push(`${slug}: duplicate summary`);
    seenTitles.add(g.title);
    seenSummaries.add(g.summary);

    const words = (g.intro || '').trim().split(/\s+/).filter(Boolean).length;
    if (words < 40 || words > 100) {
      errors.push(`${slug}: Quick Answer intro has ${words} words (expected 40-100)`);
    }
    if (!Array.isArray(g.sections) || g.sections.length < 2) {
      errors.push(`${slug}: expected at least 2 H2 sections`);
    }
    if (!g.imageAlt?.trim()) errors.push(`${slug}: missing hero imageAlt`);
    const heroPath = path.join(ROOT, 'public', String(g.image || '').replace(/^\/+/, ''));
    if (!fs.existsSync(heroPath)) errors.push(`${slug}: missing hero image ${g.image}`);

    const bodyHtml = (g.sections || []).map((s) => s[1]).join(' ');
    if (/href=["']\/request-a-quote/i.test(bodyHtml)) {
      errors.push(`${slug}: duplicate /request-a-quote CTA inside article body`);
    }
    const hasInlineLink = /href=["']\//.test(bodyHtml);
    const hasNavEntry = navSrc.includes(slug);
    if (!hasNavEntry && !hasInlineLink) {
      errors.push(`${slug}: missing internal links in both sections and article-navigation.ts`);
    }
    if (modifiedFiles.has(g._file) && !hasInlineLink) {
      errors.push(`${slug} (${g._file}): modified guide is missing inline internal link in sections`);
    }
    for (const imgTag of bodyHtml.matchAll(/<img\b[^>]*>/gi)) {
      if (!/\balt=["'][^"']+["']/i.test(imgTag[0])) {
        errors.push(`${slug}: inline <img> missing non-empty alt attribute`);
      }
    }
    const visible = [
      g.title,
      g.summary,
      g.intro,
      g.cta || '',
      ...(g.sections || []).flat(),
      ...(g.faq || []).flat(),
    ].join(' ');
    if (BANNED_RE.test(visible)) {
      errors.push(`${slug}: banned cliché/claim detected`);
    }
  }

  return guides.size;
}

function checkProducts(errors) {
  const codes = new Set();
  const slugs = new Set();
  const terms = new Set();
  let count = 0;

  for (const relPath of collectProductJsonPaths()) {
    for (const p of readJson(relPath)) {
      count += 1;
      if (codes.has(p.code)) errors.push(`Duplicate product code: ${p.code}`);
      if (slugs.has(p.slug)) errors.push(`Duplicate product slug: ${p.slug}`);
      const primary = (p.searchTerms?.[0] || '').toLowerCase();
      if (!primary) errors.push(`${p.code}: missing searchTerms[0]`);
      else if (terms.has(primary)) errors.push(`${p.code}: duplicate searchTerms[0] (${primary})`);
      codes.add(p.code);
      slugs.add(p.slug);
      terms.add(primary);

      const seoTitle = (p.seoTitle || p.name || '').trim();
      if (!seoTitle || seoTitle.length >= 70) {
        errors.push(`${p.code}: seoTitle length ${seoTitle.length} outside 1..69`);
      }
      const seoDescLen = (p.seoDescription || '').trim().length;
      if (!seoDescLen) errors.push(`${p.code}: missing seoDescription`);
      else if (seoDescLen < 50 || seoDescLen > 160) {
        errors.push(`${p.code}: seoDescription length ${seoDescLen} outside 50..160`);
      }
      const zhDescLen = (p.descriptionZh || '').trim().length;
      if (!zhDescLen) errors.push(`${p.code}: missing descriptionZh`);
      else if (zhDescLen < 50 || zhDescLen > 160) {
        errors.push(`${p.code}: descriptionZh length ${zhDescLen} outside 50..160`);
      }

      const indices = p.conceptSingleView
        ? [0]
        : p.structure === 'fold-flat'
          ? [0, 1, 2, 3, 4, 5]
          : [0, 1, 2, 3, 4];
      for (const idx of indices) {
        const relImg = String(p.image || '').replace('.webp', `-${idx}.webp`).replace(/^\/+/, '');
        if (!fs.existsSync(path.join(ROOT, 'public', relImg))) {
          errors.push(`${p.code}: missing public/${relImg}`);
        }
      }
    }
  }
  return count;
}

function main() {
  const errors = [];
  const modifiedFiles = getModifiedFiles();
  const guideCount = checkGuides(errors, modifiedFiles);
  const productCount = checkProducts(errors);

  if (errors.length) {
    console.error(`SEO check failed with ${errors.length} issue(s):`);
    for (const err of errors) console.error(` - ${err}`);
    process.exitCode = 1;
    return;
  }
  console.log(`SEO check passed: ${guideCount} guides and ${productCount} products verified.`);
}

main();
