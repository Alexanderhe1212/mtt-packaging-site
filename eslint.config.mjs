import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // GitHub Pages serves static HTML; native anchors are intentional crawlable navigation.
  { rules: { '@next/next/no-html-link-for-pages': 'off' } },
  // Review browser-only storage/URL/GPU synchronization as warnings; keep the rule visible.
  {
    files: [
      'components/{CalcQuoteSummary,CookieConsent,LanguagePicker,ProductCatalogue,QuoteForm}.tsx',
      'tools/packaging-studio/app/StudioApp.tsx',
      'tools/packaging-studio/app/components/{BoxThumbnail,FoldingPreview}.tsx',
    ],
    rules: { 'react-hooks/set-state-in-effect': 'warn' },
  },
  globalIgnores(['.next/**', 'dist/**', '.studio-build/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
