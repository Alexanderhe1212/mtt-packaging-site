/**
 * Google Search Console 28-day performance report for MTT Packaging.
 *
 * Reads service account credentials from GSC_SERVICE_ACCOUNT_JSON, GSC_KEY_FILE,
 * or ./gsc-key.json (gitignored) and outputs total metrics, Top 20 keywords,
 * and high-impression / low-CTR (< 2%) pages needing optimization.
 */
import fs from 'node:fs';
import path from 'node:path';
import { google } from 'googleapis';

const ROOT = process.cwd();
const DEFAULT_KEY_PATH = path.join(ROOT, 'gsc-key.json');
const CANDIDATE_PROPERTIES = ['sc-domain:mttpackaging.com', 'https://mttpackaging.com/'];

/** Load service account JSON from env or local file. */
export function loadGscCredentials() {
  const inline = process.env.GSC_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) return JSON.parse(inline);
  const keyPath = process.env.GSC_KEY_FILE?.trim() || DEFAULT_KEY_PATH;
  if (!fs.existsSync(keyPath)) return null;
  return JSON.parse(fs.readFileSync(keyPath, 'utf8'));
}

/** Build an authenticated Google Search Console client. */
export async function createSearchConsoleClient(scopes) {
  const credentials = loadGscCredentials();
  if (!credentials) return null;
  const auth = new google.auth.GoogleAuth({ credentials, scopes });
  return google.searchconsole({ version: 'v1', auth });
}

/** Resolve the verified Search Console property URL. */
export async function resolveSiteUrl(client) {
  const override = process.env.GSC_SITE_URL?.trim();
  if (override) return override;
  const { data } = await client.sites.list();
  const entries = (data.siteEntry || []).map((s) => s.siteUrl).filter(Boolean);
  for (const candidate of CANDIDATE_PROPERTIES) {
    if (entries.includes(candidate)) return candidate;
  }
  return entries[0] || CANDIDATE_PROPERTIES[1];
}

function isoDaysAgo(days) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function fmtPct(value) {
  return `${(value * 100).toFixed(2)}%`;
}

async function main() {
  if (process.argv.includes('--help')) {
    console.log('Usage: node scripts/gsc-report.mjs [--min-impressions N]');
    return;
  }

  const client = await createSearchConsoleClient([
    'https://www.googleapis.com/auth/webmasters.readonly',
  ]);
  if (!client) {
    console.error(
      'Missing GSC credentials: put gsc-key.json in project root (gitignored) or set GSC_SERVICE_ACCOUNT_JSON.',
    );
    process.exitCode = 1;
    return;
  }

  const siteUrl = await resolveSiteUrl(client);
  const endDate = isoDaysAgo(2);
  const startDate = isoDaysAgo(29);
  const minImpressionsIdx = process.argv.indexOf('--min-impressions');
  const minImpressions =
    minImpressionsIdx >= 0 ? Number(process.argv[minImpressionsIdx + 1] || 10) : 10;

  const [totalsRes, queriesRes, pagesRes] = await Promise.all([
    client.searchanalytics.query({
      siteUrl,
      requestBody: { startDate, endDate, dataState: 'all' },
    }),
    client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['query'],
        rowLimit: 20,
        dataState: 'all',
      },
    }),
    client.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ['page'],
        rowLimit: 250,
        dataState: 'all',
      },
    }),
  ]);

  const totals = totalsRes.data.rows?.[0] || {
    clicks: 0,
    impressions: 0,
    ctr: 0,
    position: 0,
  };

  console.log(`\n=== GSC 28-Day Report (${siteUrl} | ${startDate} .. ${endDate}) ===`);
  console.log(
    `Clicks: ${totals.clicks} | Impressions: ${totals.impressions} | CTR: ${fmtPct(
      totals.ctr || 0,
    )} | Avg Position: ${(totals.position || 0).toFixed(2)}`,
  );

  console.log('\n--- Top 20 Queries ---');
  const queryRows = queriesRes.data.rows || [];
  if (!queryRows.length) {
    console.log('(No query rows returned for this window)');
  } else {
    console.table(
      queryRows.map((r) => ({
        query: r.keys?.[0],
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: fmtPct(r.ctr || 0),
        position: Number((r.position || 0).toFixed(1)),
      })),
    );
  }

  const lowCtrPages = (pagesRes.data.rows || [])
    .filter((r) => (r.impressions || 0) >= minImpressions && (r.ctr || 0) < 0.02)
    .sort((a, b) => (b.impressions || 0) - (a.impressions || 0));

  console.log(`\n--- High-Impression / Low-CTR Pages (impressions >= ${minImpressions}, CTR < 2%) ---`);
  if (!lowCtrPages.length) {
    console.log('(No qualifying low-CTR pages in this window)');
  } else {
    console.table(
      lowCtrPages.map((r) => ({
        page: r.keys?.[0],
        impressions: r.impressions,
        clicks: r.clicks,
        ctr: fmtPct(r.ctr || 0),
        position: Number((r.position || 0).toFixed(1)),
      })),
    );
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await main();
}
