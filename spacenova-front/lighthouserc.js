module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist/spacenova/browser',
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.5 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci'
    }
  }
};
