module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist/client',
      url: ['/', '/packaging/custom-rigid-boxes', '/request-a-quote', '/tools/gift-box-solution-builder'],
      numberOfRuns: 1,
      settings: { chromeFlags: '--headless --no-sandbox' },
    },
    assert: {
      assertions: {
        'categories:seo': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['warn', { minScore: 0.98 }],
        'categories:performance': ['warn', { minScore: 0.8 }],
      },
    },
    upload: { target: 'filesystem', outputDir: './qa/lighthouse-report' },
  },
};
