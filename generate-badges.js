const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch');

const coverage = JSON.parse(fs.readFileSync('./coverage/coverage-summary.json', 'utf8'));
const metrics = ['statements', 'branches', 'functions', 'lines'];

// Ensure `badges` directory exists
const badgeDir = './badges';
if (!fs.existsSync(badgeDir)) {
  fs.mkdirSync(badgeDir);
  console.log('Created badges directory');
}

const getColor = (pct) => {
  if (pct >= 80) return 'brightgreen';
  if (pct >= 60) return 'yellow';
  return 'red';
};

metrics.forEach(async (metric) => {
  const pct = coverage.total[metric].pct.toFixed(2);
  const color = getColor(pct);

  const url = `https://img.shields.io/badge/${metric}-${pct}%25-${color}.svg`;
  const response = await fetch(url);
  const svg = await response.text();

  fs.writeFileSync(`${badgeDir}/${metric}.svg`, svg);
  console.log(`Generated ${metric} badge: ${pct}% (${color})`);
});
