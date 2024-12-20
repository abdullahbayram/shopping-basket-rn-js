const fs = require('fs');

const badges = ['statements', 'branches', 'functions', 'lines'];
const badgeDir = './badges';
const readmePath = './README.md';

// Generate badge markdown
const badgeMarkdown = badges.map((badge) => `![${badge}](./${badgeDir}/${badge}.svg)`).join('\n');

// Add coverage-summary.png to the markdown
const coverageImageMarkdown = `![Coverage Report](./${badgeDir}/coverage-summary.png)`;

// Read the content of README.md
const readmeContent = fs.readFileSync(readmePath, 'utf8');

// Match and replace only the "Test Coverage" section
const updatedReadme = readmeContent.replace(
  /(## Test Coverage\n)([\s\S]*?)(\n## |$)/,
  `$1\n${badgeMarkdown}\n\n${coverageImageMarkdown}\n\n$3`,
);

// Write the updated README file
fs.writeFileSync(readmePath, updatedReadme);

console.log('README.md updated with coverage badges and coverage summary image!');
