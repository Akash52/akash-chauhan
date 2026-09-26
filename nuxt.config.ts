import { site } from './data/profile'

export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // SSG — every section must exist in the static HTML. The previous site shipped
  // an empty shell that said "Loading…" to crawlers and link previews.
  ssr: true,

  app: {
    // GitHub Pages project site lives under /akash-chauhan/. Without this every
    // asset URL resolves to the domain root and 404s.
    baseURL: site.baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${site.baseURL}favicon.svg` }],
      meta: [
        { name: 'author', content: 'Akash Chauhan' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },

  nitro: {
    // Emits .nojekyll, without which GitHub Pages drops every _nuxt/ asset.
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: ['/', '/work', '/services', '/writing', '/about', '/contact', '/404.html'],
    },
  },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    // Generates metric-matched local fallbacks, so the swap from Georgia to
    // Source Serif 4 does not reflow the h1. That swap was the entire CLS.
    '@nuxtjs/fontaine',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  fontMetrics: {
    fonts: ['Inter', 'Source Serif 4'],
  },

  // Consumed by @nuxtjs/sitemap and @nuxtjs/robots. Absent before, so the
  // sitemap was emitting URLs that pointed nowhere. Origin only — the module
  // composes it with app.baseURL.
  site: {
    url: site.origin,
    name: site.title,
  },

  robots: {
    // A project site cannot own /robots.txt: crawlers only read it at the
    // domain root, which belongs to the akash52.github.io repo, not this one.
    // Per-page robots meta tags still apply.
    robotsTxt: false,
  },

  content: {
    highlight: {
      theme: { default: 'github-light', dark: 'github-dark' },
      langs: ['vue', 'typescript', 'javascript', 'bash', 'json', 'css', 'html'],
    },
    markdown: {
      anchorLinks: false,
    },
  },

  // Serif headings against an Inter body — reads like an engineering document
  // rather than a landing page.
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'Source Serif 4': [600, 700],
      'JetBrains Mono': [400],
    },
    display: 'swap',
    preload: true,
    download: true, // self-hosted: no third-party request, no CLS on first paint
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  image: {
    // The default IPX provider needs a running server. On static hosting it
    // must resolve at build time instead, or every <NuxtImg> 404s.
    provider: 'ipxStatic',
    quality: 80,
    format: ['avif', 'webp'],
  },

  sitemap: {
    strictNuxtContentPaths: true,
    // crawlLinks follows the baseURL-prefixed hrefs in the rendered HTML and
    // registers "/akash-chauhan" as a route, producing a doubled path that
    // resolves to no file. Exclusion matches the final URL path, so this has
    // to name the doubled form exactly — "/akash-chauhan/**" would match the
    // whole site and empty the sitemap.
    exclude: ['/akash-chauhan/akash-chauhan'],
  },

  devtools: { enabled: process.env.NODE_ENV === 'development' },
})
