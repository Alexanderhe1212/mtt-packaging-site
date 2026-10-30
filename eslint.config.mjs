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
      'components/{CookieConsent,LanguagePicker}.tsx',
      'tools/packaging-studio/app/StudioApp.tsx',
      'tools/packaging-studio/app/components/{DynamicBoxThumbnail,FoldingPreview}.tsx',
    ],
    rules: { 'react-hooks/set-state-in-effect': 'warn' },
  },
  // Local browser-operation drafts are gitignored and never built or deployed.
  globalIgnores(['work/**', '.next/**', 'dist/**', '.studio-build/**', 'public/tools/gift-box-solution-builder/assets/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;
