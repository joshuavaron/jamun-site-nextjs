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

// Copy all English content to root
if (fs.existsSync(enDir)) {
  console.log('Copying English content to root...');
  copyDir(enDir, outDir);
  console.log('✓ English content copied to root');

  // Create root index.html that serves English homepage
  const enIndex = path.join(enDir, 'index.html');
  const rootIndex = path.join(outDir, 'index.html');
  if (fs.existsSync(enIndex)) {
    fs.copyFileSync(enIndex, rootIndex);
    console.log('✓ Root index.html created');
  }
} else {
  console.error('Error: /out/en directory not found');
  process.exit(1);
}

console.log('Done!');
