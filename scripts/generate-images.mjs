/**
 * Build-time image derivatives → public/img/
 *
 * The source lives in assets/images/ and is never shipped as-is.
 *
 * Generated here with sharp rather than left to @nuxt/image at request time:
 * the site is static, so every derivative has to exist as a file anyway, and
 * pre-generating means the exact pixel dimensions are known when the markup is
 * written. That is what keeps explicit width/height on the img and the layout
 * from shifting while the photo loads.
 */

import { mkdir, readdir, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const sharp = require('sharp')

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, 'assets/images/akash-chauhan.jpg')
const OUT = resolve(ROOT, 'public/img')

/** Rendered sizes, doubled for 2× displays. Keep in sync with the markup. */
const WIDTHS = [176, 352, 240, 480]

if (!existsSync(SRC)) {
  console.warn(`[images] No source at ${SRC} — skipping.`)
  process.exit(0)
}

await mkdir(OUT, { recursive: true })

const input = sharp(SRC)
const meta = await input.metadata()

for (const width of WIDTHS) {
  if (width > meta.width) {
    console.warn(`[images] Skipping ${width}px — source is only ${meta.width}px wide.`)
    continue
  }
  const base = `akash-chauhan-${width}`
  await sharp(SRC).resize(width, width, { fit: 'cover', position: 'attention' })
    .avif({ quality: 62 }).toFile(join(OUT, `${base}.avif`))
  await sharp(SRC).resize(width, width, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78 }).toFile(join(OUT, `${base}.webp`))
  await sharp(SRC).resize(width, width, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true }).toFile(join(OUT, `${base}.jpg`))
}

const files = await readdir(OUT)
const sizes = await Promise.all(
  files.sort().map(async (f) => `${f} ${Math.round((await stat(join(OUT, f))).size / 1024)}KB`),
)
console.log(`[images] ${files.length} derivatives from ${meta.width}×${meta.height}: ${sizes.join(', ')}`)
