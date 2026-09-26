/**
 * Browser checks over the static build → .data/browser-check.json
 *
 *   node scripts/check-browser.mjs        # after npm run generate
 *
 * Covers the two things that cannot be checked by reading HTML:
 *
 *  1. HYDRATION. A page can ship perfect static HTML and then go blank the
 *     moment Vue takes over. That happened here: the prerenderer emits both
 *     /work/<slug> and /work/<slug>/, queryContent() does not match a trailing
 *     slash, and every case study rendered correctly for crawlers while showing
 *     an empty page to actual visitors. Nothing that reads the built HTML can
 *     catch it, so it is checked in a real browser.
 *
 *  2. MOBILE at 360px — horizontal overflow and tap target size.
 *
 * Tap targets: WCAG 2.5.8 exempts links flowing inline in a block of text, so
 * links inside p/li/dd/.prose-doc are skipped. Standalone controls are not.
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { join, extname, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, '.output/public')
const OUT = resolve(ROOT, '.data/browser-check.json')
const BASE = '/akash-chauhan'
const PORT = 4179

const PAGES = [
  '/', '/work', '/work/baserow', '/work/creator-platform',
  '/work/senior-care-platform', '/work/analytics-dashboard',
  '/services', '/writing', '/about', '/contact',
]

if (!existsSync(DIST)) {
  console.error('No build found. Run "npm run generate" first.')
  process.exit(1)
}

let chromium
try {
  ({ chromium } = require('playwright'))
} catch {
  console.warn('[browser] playwright not installed — skipping. npm i -D playwright')
  process.exit(0)
}

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.woff2': 'font/woff2', '.xml': 'application/xml',
}

const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0])
  if (p.startsWith(BASE)) p = p.slice(BASE.length) || '/'
  let file = join(DIST, p)
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html')
  if (!existsSync(file)) { file = join(DIST, '404.html'); res.statusCode = 404 }
  res.setHeader('Content-Type', TYPES[extname(file)] || 'application/octet-stream')
  createReadStream(file).pipe(res)
})
await new Promise((r) => server.listen(PORT, '127.0.0.1', r))

const launch = { executablePath: process.env.CHROME_PATH || undefined }
const browser = await chromium.launch(launch).catch(() =>
  chromium.launch({ executablePath: '/usr/bin/google-chrome' }),
)

const results = { hydration: [], mobile: [], checkedAt: new Date().toISOString() }

// 1. Hydration — text before and after Vue takes over.
{
  const page = await (await browser.newContext()).newPage()
  for (const path of PAGES) {
    await page.goto(`http://127.0.0.1:${PORT}${BASE}${path}`, { waitUntil: 'domcontentloaded' })
    const before = await page.evaluate(() => document.body.innerText.trim().length)
    await page.waitForLoadState('networkidle')
    const after = await page.evaluate(() => document.body.innerText.trim().length)
    // Anything over a 20% drop means hydration replaced real content with nothing.
    results.hydration.push({ path, before, after, ok: after >= before * 0.8 })
  }
}

// 2. Mobile at 360px, in both colour schemes.
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, colorScheme: scheme })
  const page = await ctx.newPage()
  for (const path of PAGES) {
    await page.goto(`http://127.0.0.1:${PORT}${BASE}${path}`, { waitUntil: 'networkidle' })
    const r = await page.evaluate(() => {
      const de = document.documentElement
      const small = []
      for (const el of document.querySelectorAll('a, button')) {
        const b = el.getBoundingClientRect()
        if (!b.width || !b.height) continue
        if (el.closest('p, li, dd, .prose-doc')) continue
        if (b.height < 44) small.push(`${el.tagName.toLowerCase()}("${(el.textContent || '').trim().slice(0, 24)}") ${Math.round(b.width)}x${Math.round(b.height)}`)
      }
      return { overflow: de.scrollWidth - de.clientWidth, small }
    })
    results.mobile.push({ path, scheme, ...r, ok: r.overflow <= 0 && r.small.length === 0 })
  }
  await ctx.close()
}

await browser.close()
server.close()

await mkdir(dirname(OUT), { recursive: true })
await writeFile(OUT, `${JSON.stringify(results, null, 2)}\n`, 'utf8')

const hydrationFails = results.hydration.filter((r) => !r.ok)
const mobileFails = results.mobile.filter((r) => !r.ok)

for (const r of hydrationFails) console.error(`[hydration] ${r.path}: ${r.before} → ${r.after} chars`)
for (const r of mobileFails) {
  console.error(`[mobile ${r.scheme}] ${r.path}: overflow ${r.overflow}px${r.small.length ? `, ${r.small.length} small target(s): ${r.small.join(', ')}` : ''}`)
}

console.log(
  `[browser] hydration ${results.hydration.length - hydrationFails.length}/${results.hydration.length} · ` +
    `mobile ${results.mobile.length - mobileFails.length}/${results.mobile.length} · → .data/browser-check.json`,
)
process.exit(hydrationFails.length + mobileFails.length ? 1 : 0)
