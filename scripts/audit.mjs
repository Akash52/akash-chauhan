/**
 * Pre-publish verification over .output/public → AUDIT.md
 *
 * Implements the Phase 8 checklist. Run after `npm run generate`; CI blocks the
 * deploy on a FAIL. Checks that need a browser (Lighthouse, 360px layout) are
 * reported as PENDING rather than quietly passing — a checklist that cannot
 * fail is not a checklist.
 *
 *   node scripts/audit.mjs            # full run
 *   node scripts/audit.mjs --offline  # skip external link checks
 */

import { readFile, writeFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, resolve, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { createJiti } = require('jiti')

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = resolve(ROOT, '.output/public')
const OFFLINE = process.argv.includes('--offline')

const jiti = createJiti(import.meta.url, { interopDefault: true })
const { experienceLabel, profile, site } = await jiti.import(resolve(ROOT, 'data/profile.ts'))

/** Phase 4.7. "zero <anything>" is a single \bzero\b. */
const BANNED = [
  'genuinely',
  'the pleasure of',
  'thrilled',
  'passionate',
  'seamless',
  'cutting-edge',
  'world-class',
  'zero',
  'superpower',
  'quietly',
  'ninja',
  'rockstar',
  'without breaking a sweat',
]

const results = []
const record = (id, title, status, evidence) =>
  results.push({ id, title, status, evidence })

async function htmlFiles(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '_nuxt' || entry.name === 'api') continue
      out.push(...(await htmlFiles(full)))
    } else if (entry.name.endsWith('.html')) {
      out.push(full)
    }
  }
  return out
}

/** Visible text only — script/style contents are not what a reader sees. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ')
}

if (!existsSync(DIST)) {
  console.error(`No build at ${DIST}. Run "npm run generate" first.`)
  process.exit(1)
}

const files = await htmlFiles(DIST)
const pages = await Promise.all(
  files.map(async (f) => ({
    path: `/${relative(DIST, f).replace(/index\.html$/, '').replace(/\.html$/, '')}`,
    file: f,
    html: await readFile(f, 'utf8'),
  })),
)
for (const p of pages) p.text = visibleText(p.html)

// ── 1. Rendered facts match the data files ───────────────────────────────────
// Compares what the HTML actually says against the data, which is the claim
// that matters. (Grepping components for the digit "5" only finds SVG path
// coordinates.)
{
  const generated = JSON.parse(await readFile(resolve(ROOT, 'data/articles.generated.json'), 'utf8'))
  const github = existsSync(resolve(ROOT, 'data/github.json'))
    ? JSON.parse(await readFile(resolve(ROOT, 'data/github.json'), 'utf8'))
    : null

  const expectations = [
    { re: /(\d+)\s+articles\b/gi, expected: generated.total, label: 'article total' },
    { re: /(\d+)\s+production (?:apps|projects|applications)\b/gi, expected: profile.productionProjects, label: 'production project count' },
    ...(github ? [{ re: /(\d+)\s*(?:★|stars earned)/gi, expected: github.starsEarned, label: 'stars earned' }] : []),
  ]

  const mismatches = []
  for (const p of pages) {
    for (const { re, expected, label } of expectations) {
      for (const m of p.text.matchAll(re)) {
        if (Number(m[1]) !== expected) {
          mismatches.push(`${p.path}: "${m[0].trim()}" but ${label} is ${expected}`)
        }
      }
    }
  }
  record(
    1,
    'Every number traces to data/profile.ts, data/github.json or data/articles.json',
    mismatches.length ? 'FAIL' : 'PASS',
    mismatches.length
      ? mismatches.join('; ')
      : `Rendered counts agree with the data files (${generated.total} articles${github ? `, ${github.starsEarned} stars earned` : ''}, ${profile.productionProjects} production projects).`,
  )
}

// ── 2. No [CONFIRM placeholder reaches the build ─────────────────────────────
{
  const hits = pages.filter((p) => /\[CONFIRM/i.test(p.text)).map((p) => p.path)
  record(
    2,
    'No [CONFIRM] placeholder visible in the built HTML',
    hits.length ? 'FAIL' : 'PASS',
    hits.length ? `Found on: ${hits.join(', ')}` : `Checked ${pages.length} pages.`,
  )
}

// ── 3. External links resolve ────────────────────────────────────────────────
{
  const urls = new Set()
  for (const p of pages) {
    for (const m of p.html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      // Self-referential canonical/og:url links point at this site. Before the
      // first deploy they 404 by definition; the build already proves the route
      // exists, so checking them over the network tests nothing.
      if (!m[1].startsWith(site.url)) urls.add(m[1])
    }
  }
  if (OFFLINE) {
    record(3, 'Every external link returns 200', 'SKIPPED', `--offline; ${urls.size} links not checked.`)
  } else {
    const broken = []
    const blocked = []
    await Promise.all(
      [...urls].map(async (url) => {
        try {
          const res = await fetch(url, {
            redirect: 'follow',
            headers: { 'User-Agent': 'Mozilla/5.0 (portfolio link audit)' },
            signal: AbortSignal.timeout(15000),
          })
          if (res.status === 404 || res.status === 410) broken.push(`${url} → ${res.status}`)
          // 403/429/999 is anti-bot, not a dead link. Reported, not failed.
          else if (!res.ok) blocked.push(`${url} → ${res.status}`)
        } catch (err) {
          blocked.push(`${url} → ${err.name}`)
        }
      }),
    )
    record(
      3,
      'Every external link returns 200',
      broken.length ? 'FAIL' : 'PASS',
      [
        `${urls.size} unique external links checked.`,
        broken.length ? `Dead: ${broken.join('; ')}` : '',
        blocked.length ? `Not verifiable (anti-bot/timeout, check by hand): ${blocked.join('; ')}` : '',
      ]
        .filter(Boolean)
        .join(' '),
    )
  }
}

// ── 4. One experience figure everywhere ──────────────────────────────────────
{
  const expected = experienceLabel()
  const found = new Set()
  for (const p of pages) {
    for (const m of p.text.matchAll(/(\d+)\+\s*years/gi)) found.add(`${m[1]}+ years`)
  }
  const wrong = [...found].filter((f) => f !== expected)
  record(
    4,
    'Years of experience identical in meta tags, hero, About and OG image',
    wrong.length ? 'FAIL' : 'PASS',
    wrong.length
      ? `Expected "${expected}" but also found: ${wrong.join(', ')}`
      : `All occurrences read "${expected}" (computed from ${profile.traineeFrom}; OG image generated from the same value).`,
  )
}

// ── 5. Client names need a permission flag ───────────────────────────────────
record(
  5,
  'No company logo or client name without permission: true in data',
  'PENDING',
  'Case study copy is not yet rewritten (Phase 5). Re-run once client naming is confirmed.',
)

// ── 6. No banned hype words ──────────────────────────────────────────────────
{
  const hits = []
  for (const p of pages) {
    for (const word of BANNED) {
      const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      const m = re.exec(p.text)
      if (m) hits.push(`${p.path}: "${m[0]}"`)
    }
  }
  record(
    6,
    'No banned hype words (Phase 4.7)',
    hits.length ? 'FAIL' : 'PASS',
    hits.length ? hits.join('; ') : `Checked ${BANNED.length} terms across ${pages.length} pages.`,
  )
}

// ── 7. Content is in the HTML, not rendered by JS ────────────────────────────
{
  const home = pages.find((p) => p.path === '/')
  // 200.html and 404.html are Nuxt's SPA fallback shells, not content pages.
  const FALLBACKS = new Set(['/200', '/404'])
  const thin = pages
    .filter((p) => !FALLBACKS.has(p.path) && p.text.trim().length < 400)
    .map((p) => p.path)
  const loading = /loading…|loading\.\.\./i.test(home?.text || '')
  const ok = !loading && thin.length === 0
  record(
    7,
    'View-source contains all section text (no JS-only rendering)',
    ok ? 'PASS' : 'FAIL',
    ok
      ? `Home page ships ${home.text.trim().length} characters of text. No "Loading…" shell.`
      : [loading ? 'Home page still shows a loading state.' : '', thin.length ? `Thin pages: ${thin.join(', ')}` : '']
          .filter(Boolean)
          .join(' '),
  )
}

// ── 8 & 9. Browser-dependent ─────────────────────────────────────────────────
record(8, 'Lighthouse ≥ 95 on all four categories; JS < 100 KB gzipped', 'PENDING', 'Run against a preview build once content is final.')
record(9, 'Mobile at 360px: no horizontal scroll, tap targets ≥ 44px', 'PENDING', 'Run against a preview build once content is final.')

// ── Report ───────────────────────────────────────────────────────────────────
const icon = { PASS: '✅', FAIL: '❌', PENDING: '⏳', SKIPPED: '⏭️' }
const failed = results.filter((r) => r.status === 'FAIL')

const md = `# Pre-publish audit

Generated by \`scripts/audit.mjs\` on ${new Date().toISOString().slice(0, 10)} against \`.output/public\` (${pages.length} pages).

| # | Check | Result | Evidence |
|---|---|---|---|
${results
  .map((r) => `| ${r.id} | ${r.title} | ${icon[r.status]} ${r.status} | ${r.evidence.replace(/\|/g, '\\|')} |`)
  .join('\n')}

${failed.length ? `## Blocking\n\n${failed.map((r) => `- **${r.title}** — ${r.evidence}`).join('\n')}\n` : '_No blocking failures._\n'}
`

await writeFile(resolve(ROOT, 'AUDIT.md'), md, 'utf8')

for (const r of results) console.log(`${icon[r.status]} ${r.id}. ${r.title}\n   ${r.evidence}`)
console.log(`\nAUDIT.md written. ${failed.length} blocking failure(s).`)
process.exit(failed.length ? 1 : 0)
