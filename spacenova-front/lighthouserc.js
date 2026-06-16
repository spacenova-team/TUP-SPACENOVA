module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist/spacenova/browser',
      numberOfRuns: 3
    },
    upload: {
      target: 'filesystem',
      outputDir: './.lighthouseci'
    }
  }
};
