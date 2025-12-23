import sharp from 'sharp';
import { readdir, readFile } from 'fs/promises';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const svgFiles = [
  'public/images/logos/jamun-logo.svg',
  'public/images/logos/jamun-blue-side-logo.svg',
  'public/images/logos/jamun-white-side-logo.svg',
  'public/images/logos/jamun-white-logo.svg',
];

// Output sizes - create multiple sizes for different use cases
const sizes = [
  { suffix: '', width: null }, // Original size
  { suffix: '-512', width: 512 },
  { suffix: '-256', width: 256 },
  { suffix: '-128', width: 128 },
];

async function convertSvgToPng(svgPath, outputPath, width = null) {
  try {
    const svgBuffer = await readFile(svgPath);

    let sharpInstance = sharp(svgBuffer, { density: 300 });

    if (width) {
      sharpInstance = sharpInstance.resize(width, null, { fit: 'contain' });
    }

    await sharpInstance.png().toFile(outputPath);
    console.log(`Created: ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${svgPath}:`, error.message);
  }
}

async function main() {
  console.log('Converting SVG files to PNG...\n');

  for (const svgFile of svgFiles) {
    const fullPath = join(projectRoot, svgFile);
    const dir = dirname(fullPath);
    const name = basename(svgFile, '.svg');

    for (const size of sizes) {
      const outputName = `${name}${size.suffix}.png`;
      const outputPath = join(dir, outputName);
      await convertSvgToPng(fullPath, outputPath, size.width);
    }
    console.log('');
  }

  console.log('Done!');
}

main().catch(console.error);
