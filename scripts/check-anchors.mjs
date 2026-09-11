#!/usr/bin/env node
// Verify every href="#foo" in index.html points to a real id="foo" on the page.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, '..', 'index.html'), 'utf8');

const ids = new Set();
for (const m of html.matchAll(/\sid=["']([^"']+)["']/g)) ids.add(m[1]);

const hrefs = [];
for (const m of html.matchAll(/\shref=["']#([^"']+)["']/g)) hrefs.push(m[1]);

const missing = hrefs.filter(h => !ids.has(h));
if (missing.length) {
  console.error(`✖ ${missing.length} anchor link(s) point to missing ids:`);
  for (const h of missing) console.error(`  href="#${h}"`);
  process.exit(1);
}

console.log(`✔ all ${hrefs.length} internal anchor(s) resolve (${ids.size} ids on page)`);
