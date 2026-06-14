import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'out');
const enDir = path.join(outDir, 'en');

// Recursively copy directory
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying English content to root...');

// Copy English sub-pages to root.
// With trailingSlash:false, nested routes like /en/about emit to out/en/about.html,
// which copyDir lifts to out/about.html. (The /en homepage itself lives at out/en.html,
// outside this directory — handled separately below.)
if (fs.existsSync(enDir)) {
  copyDir(enDir, outDir);
  console.log('✓ English sub-pages copied to root');
}

// Create the root homepage (out/index.html) that serves the English homepage.
// Layout depends on next.config trailingSlash:
//   - trailingSlash:false (current) -> homepage is out/en.html
//   - trailingSlash:true            -> homepage is out/en/index.html
const homepageCandidates = [
  path.join(outDir, 'en.html'),       // trailingSlash: false
  path.join(enDir, 'index.html'),     // trailingSlash: true
];
const enHomepage = homepageCandidates.find((p) => fs.existsSync(p));

if (!enHomepage) {
  console.error(
    'Error: could not find the English homepage. Looked for:\n' +
      homepageCandidates.map((p) => `  - ${path.relative(outDir, p)}`).join('\n') +
      '\nThe site would deploy with no homepage at "/". Failing the build.'
  );
  process.exit(1);
}

fs.copyFileSync(enHomepage, path.join(outDir, 'index.html'));
console.log(`✓ Root index.html created from ${path.relative(outDir, enHomepage)}`);

console.log('Done!');
