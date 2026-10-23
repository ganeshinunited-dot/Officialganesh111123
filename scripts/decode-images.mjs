#!/usr/bin/env node
/**
 * Decode build-time images.
 *
 * The GitHub push path for this repo is text-only, so the watercolour
 * illustrations are stored in the repo as base64 part files under
 * image-sources/<name>/<file>.jpg.partNN.b64. Before Vite runs, this
 * script concatenates each image's parts in order, base64-decodes them
 * and writes the result to public/images/<file>.jpg, where Vite picks
 * them up as static assets.
 *
 * Idempotent: safe to run repeatedly. Silently skips when the sources
 * directory (or an image's parts) are missing.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourcesDir = join(root, 'image-sources');
const outDir = join(root, 'public', 'images');

if (!existsSync(sourcesDir)) {
  process.exit(0);
}

const partPattern = /^(.+\.jpg)\.part\d+\.b64$/;

for (const entry of readdirSync(sourcesDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = join(sourcesDir, entry.name);

  // Group part files by their target image filename.
  const groups = new Map();
  for (const file of readdirSync(dir)) {
    const match = file.match(partPattern);
    if (!match) continue;
    const target = match[1];
    if (!groups.has(target)) groups.set(target, []);
    groups.get(target).push(file);
  }

  for (const [target, parts] of groups) {
    parts.sort();
    const b64 = parts.map((part) => readFileSync(join(dir, part), 'utf8').trim()).join('');
    if (!b64) continue;
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, target), Buffer.from(b64, 'base64'));
    console.log(`[decode-images] public/images/${target} (${parts.length} parts)`);
  }
}
