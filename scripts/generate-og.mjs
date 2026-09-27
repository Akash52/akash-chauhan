/**
 * Build-time OG card → public/og.png (1200×630)
 *
 * Generated rather than hand-made so the experience figure on the card can
 * never drift from the one in the meta tags, hero and About page — they all
 * read data/profile.ts. The audit checks that they match.
 *
 * Fonts are deliberately DejaVu: present both here and on ubuntu-latest, so
 * the card renders identically in CI. Webfonts are not reliably available to
 * librsvg, and a card that silently falls back to a default face is worse than
 * one that was designed for the face it gets.
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require('sharp')
const { createJiti } = require('jiti')

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'public/og.png')

const jiti = createJiti(import.meta.url, { interopDefault: true })
const { profile, experienceLabel } = await jiti.import(resolve(ROOT, 'data/profile.ts'))

const W = 1200
const H = 630

// Light-theme palette from assets/css/main.css.
const INK_950 = '#0f0f0e'
const INK_500 = '#6b6a63'
const INK_100 = '#e8e6df'
const SURFACE = '#f7f6f3'
const ACCENT = '#a8481f'

/** XML-escape, and render text we control — no user input reaches this. */
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Greedy wrap at a character budget tuned to the 56px serif at this width. */
function wrap(text, maxChars) {
  const lines = []
  let line = ''
  for (const word of text.split(' ')) {
    if (line && `${line} ${word}`.length > maxChars) {
      lines.push(line)
      line = word
    } else {
      line = line ? `${line} ${word}` : word
    }
  }
  if (line) lines.push(line)
  return lines
}

const headline = wrap(profile.valueProp, 30)
const proof = `${experienceLabel()} at ${profile.company} · Freelance frontend engineer`

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${SURFACE}"/>
  <rect x="0" y="0" width="${W}" height="8" fill="${ACCENT}"/>
  <rect x="80" y="${H - 148}" width="${W - 160}" height="1" fill="${INK_100}"/>

  <text x="80" y="118"
        font-family="DejaVu Sans, sans-serif" font-size="22" font-weight="600"
        letter-spacing="3.5" fill="${INK_500}">${esc(profile.name.toUpperCase())}</text>

  ${headline
    .map(
      (line, i) =>
        `<text x="80" y="${226 + i * 74}" font-family="DejaVu Serif, Georgia, serif" font-size="58" font-weight="700" fill="${INK_950}">${esc(line)}</text>`,
    )
    .join('\n  ')}

  <text x="80" y="${H - 96}"
        font-family="DejaVu Sans, sans-serif" font-size="26" fill="${INK_500}">${esc(proof)}</text>

  <text x="80" y="${H - 50}"
        font-family="DejaVu Sans Mono, monospace" font-size="22" fill="${ACCENT}">akash52.github.io/akash-chauhan</text>
</svg>`

await mkdir(dirname(OUT), { recursive: true })
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT)

console.log(`[og] public/og.png · ${W}×${H} · "${profile.valueProp.slice(0, 48)}…" · ${proof}`)
