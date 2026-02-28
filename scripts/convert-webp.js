#!/usr/bin/env node

/**
 * Convert JPG/JPEG/PNG images to WebP format.
 *
 * Uses cwebp (must be installed: brew install webp / apt-get install webp).
 * Creates .webp files next to originals. Skips SVG, favicon.ico, and
 * files that already have an up-to-date .webp counterpart.
 *
 * Usage: node scripts/convert-webp.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const IMAGES_DIR = path.join(ROOT, 'images');
const QUALITY = 80;

const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const SKIP_FILES = new Set(['favicon.ico']);

let converted = 0;
let skipped = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (!EXTENSIONS.has(ext)) continue;
    if (SKIP_FILES.has(entry.name)) continue;

    const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

    // Skip if .webp exists and is newer than source
    if (fs.existsSync(webpPath)) {
      const srcStat = fs.statSync(fullPath);
      const webpStat = fs.statSync(webpPath);
      if (webpStat.mtimeMs >= srcStat.mtimeMs) {
        skipped++;
        continue;
      }
    }

    try {
      execSync(`cwebp -q ${QUALITY} "${fullPath}" -o "${webpPath}"`, {
        stdio: 'pipe',
      });
      const rel = path.relative(ROOT, webpPath);
      console.log(`  Converted: ${rel}`);
      converted++;
    } catch (err) {
      console.error(`  Error converting ${path.relative(ROOT, fullPath)}: ${err.message}`);
    }
  }
}

console.log('Converting images to WebP...\n');
walk(IMAGES_DIR);
console.log(`\nDone! Converted: ${converted}, Skipped (up-to-date): ${skipped}`);
