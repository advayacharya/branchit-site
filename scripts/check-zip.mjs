#!/usr/bin/env node
// Verify branchit.zip exists at the site root and has manifest.json AT THE TOP LEVEL.
//
// manifest.json MUST live at the root of the archive (not nested under a wrapper
// folder). Windows "Extract All" and macOS auto-extract both create a folder
// NAMED AFTER THE ZIP and drop the archive's entries directly inside it. So if
// the archive already has its own wrapper folder, extraction produces a
// double-nested layout (Downloads/branchit/branchit/manifest.json) and Chrome
// cannot find the manifest when the user points Load-unpacked at the outer
// folder — that is a real bug we shipped and reverted.
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import JSZip from 'jszip';

const here = dirname(fileURLToPath(import.meta.url));
const zipPath = join(here, '..', 'branchit.zip');

if (!existsSync(zipPath)) {
  console.error(`✖ branchit.zip missing at ${zipPath}`);
  console.error(`  Copy the packaged extension zip here before deploying.`);
  console.error(`  (In the sibling extension repo: \`npm run package\`, then move the release zip here as branchit.zip.)`);
  process.exit(1);
}

const buf = readFileSync(zipPath);

if (buf[0] !== 0x50 || buf[1] !== 0x4B || buf[2] !== 0x03 || buf[3] !== 0x04) {
  console.error(`✖ branchit.zip is not a valid zip file (bad magic bytes)`);
  process.exit(1);
}

const zip = await JSZip.loadAsync(buf);

if (!zip.files['manifest.json'] || zip.files['manifest.json'].dir) {
  console.error(`✖ branchit.zip has no manifest.json at its root`);
  console.error(`  Load-unpacked needs manifest.json directly in the folder the user picks.`);
  console.error(`  If manifest.json is nested (e.g. "branchit/manifest.json"), Windows/macOS`);
  console.error(`  will double-nest it during extraction — Chrome then can't find it.`);
  const nested = Object.keys(zip.files).find(k => k.endsWith('/manifest.json'));
  if (nested) console.error(`  Found instead: "${nested}" — flatten the archive.`);
  process.exit(1);
}

const fileCount = Object.values(zip.files).filter(f => !f.dir).length;
console.log(`✔ branchit.zip exists (${(buf.length / 1024).toFixed(1)} KB), ${fileCount} entries, manifest.json at root`);
