const fs = require('fs');

const badges = ['statements', 'branches', 'functions', 'lines'];
const badgeDir = './badges';
const readmePath = './README.md';

// Generate badge markdown
const badgeMarkdown = badges.map((badge) => `![${badge}](./${badgeDir}/${badge}.svg)`).join('\n');

// Read README content
const readmeContent = fs.readFileSync(readmePath, 'utf8');

// Regex to replace the entire "Code Coverage" section
const updatedReadme = readmeContent.replace(
  /## Code Coverage[\s\S]*?(?=\n## |$)/,
  `## Code Coverage\n\n${badgeMarkdown}\n\n`,
);

// Write the updated content back to README
fs.writeFileSync(readmePath, updatedReadme);

console.log('README.md updated with coverage badges!');
