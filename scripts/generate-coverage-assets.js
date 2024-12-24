const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const puppeteer = require('puppeteer');
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch');
const path = require('path');

const badgeDir = './badges';
const readmePath = './README.md';
const coveragePath = './coverage/coverage-summary.json';
const coverageHTMLPath = './coverage/lcov-report/index.html';

// Ensure badges directory exists
if (!fs.existsSync(badgeDir)) {
  fs.mkdirSync(badgeDir);
}

// Generate badges
const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
const metrics = ['statements', 'branches', 'functions', 'lines'];

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

// Generate coverage summary image
(async () => {
  if (!fs.existsSync(coverageHTMLPath)) {
    process.exit(1);
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${path.resolve(coverageHTMLPath)}`);
  await page.screenshot({ path: `${badgeDir}/coverage-summary.png`, fullPage: true });

  await browser.close();

  // Update README
  const badges = metrics.map((metric) => `![${metric}](./${badgeDir}/${metric}.svg)`).join('\n');
  const coverageImageMarkdown = `![Coverage Report](./${badgeDir}/coverage-summary.png)`;

  const readmeContent = fs.readFileSync(readmePath, 'utf8');
  const updatedReadme = readmeContent.replace(
    /(## Test Coverage\n)([\s\S]*?)(\n## |$)/,
    `$1\n${badges}\n\n${coverageImageMarkdown}\n\n$3`,
  );

  fs.writeFileSync(readmePath, updatedReadme);
})();
