/**
 * Injects a static render of the app into dist/index.html.
 *
 * Why: the site is a client-rendered SPA, so the shipped HTML had no text at
 * all. Google executes JavaScript, but the AI crawlers that increasingly drive
 * discovery (GPTBot, ClaudeBot, PerplexityBot) largely do not - they were
 * seeing an empty page. This gives every crawler the real content.
 *
 * The client still calls createRoot(), which replaces this markup on mount, so
 * there is no hydration contract to keep and no mismatch risk.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const { render } = await import(resolve(root, 'dist-ssr/entry-server.js'));

let markup = render();

// Scroll-reveal animations render with opacity:0 inline. Strip that from the
// static copy so the no-JS view is readable rather than invisible text.
markup = markup
  .replace(/opacity:\s*0(?=[;"])/g, 'opacity:1')
  .replace(/transform:\s*translateY\([^)]*\)[^;"]*/g, 'transform:none');

const indexPath = resolve(root, 'dist/index.html');
const html = readFileSync(indexPath, 'utf8');
const marker = '<div id="root"></div>';

if (!html.includes(marker)) {
  throw new Error('prerender: could not find the #root mount point in dist/index.html');
}

writeFileSync(indexPath, html.replace(marker, `<div id="root">${markup}</div>`));

const text = markup.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
if (text.length < 500) {
  throw new Error(`prerender: only ${text.length} chars of text rendered - something is wrong`);
}
console.log(`prerender: injected ${markup.length} bytes of markup (${text.length} chars of text)`);
