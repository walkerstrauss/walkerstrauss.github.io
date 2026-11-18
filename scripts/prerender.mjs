// After `vite build`: write each page's rendered text into its own HTML file,
// with its own title, description and link-preview tags, so crawlers, link
// previews and screening tools that don't run JavaScript can read the site,
// and every case URL answers 200 instead of falling through to 404.html.
// The snapshot stays hidden until the app takes over, so readers never see it.
import { spawn } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE = 'https://walkerstrauss.com';
const ROUTES = ['/', '/work/support-agents', '/work/policy-agents', '/projects/aicap', '/projects/mahsjong', '/projects/weather-clock', '/research/fmri-study'];
const PREVIEW = 5298;
const DEBUG = 9398;
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const template = readFileSync('dist/index.html', 'utf8');
writeFileSync('dist/404.html', template);

const preview = spawn('npx', ['vite', 'preview', '--port', String(PREVIEW), '--strictPort', '--host', '127.0.0.1'], { stdio: 'ignore' });
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${DEBUG}`, `--user-data-dir=/tmp/prerender-${DEBUG}`, 'about:blank'], { stdio: 'ignore' });
const stop = () => { chrome.kill(); preview.kill(); };

try {
  let tabs;
  for (let i = 0; i < 60 && !tabs; i++) { try { tabs = await (await fetch(`http://127.0.0.1:${DEBUG}/json`)).json(); } catch { await sleep(250); } }
  for (let i = 0; i < 60; i++) { try { await fetch(`http://127.0.0.1:${PREVIEW}/`); break; } catch { await sleep(250); } }
  const ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0; const pending = new Map();
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true })).result.value;
  await send('Page.enable');

  for (const route of ROUTES) {
    await send('Page.navigate', { url: `http://127.0.0.1:${PREVIEW}${route}` });
    await sleep(2500);
    const page = await ev(`({
      root: document.getElementById('root').innerHTML,
      h1: document.querySelector('h1')?.innerText.trim() || '',
      desc: (document.querySelector('.cs-subtitle') || document.querySelector('.fo-line'))?.innerText.trim().replace(/\\s+/g, ' ') || '',
    })`);
    if (!page.root || !page.desc) throw new Error(`nothing rendered at ${route}`);
    const title = route === '/' ? 'Walker Strauss' : `${page.h1} · Walker Strauss`;
    const url = SITE + (route === '/' ? '/' : `${route}/`);
    const head = [
      `<title>${esc(title)}</title>`,
      `<meta name="description" content="${esc(page.desc)}" />`,
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="Walker Strauss" />`,
      `<meta property="og:title" content="${esc(title)}" />`,
      `<meta property="og:description" content="${esc(page.desc)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta name="twitter:card" content="summary" />`,
      `<style>#root[data-prerendered]{visibility:hidden}</style>`,
    ].join('\n    ');
    const html = template
      .replace(/<title>[^<]*<\/title>/, head)
      .replace('<div id="root"></div>', `<div id="root" data-prerendered>${page.root}</div>`);
    const file = route === '/' ? 'dist/index.html' : join('dist', route, 'index.html');
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`prerendered ${route} → ${file} (${Math.round(html.length / 1024)} KB)`);
  }
  ws.close();
  writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
  writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.map((r) => `  <url><loc>${SITE}${r === '/' ? '/' : `${r}/`}</loc></url>`).join('\n')}\n</urlset>\n`);
} finally {
  stop();
}
process.exit(0);
