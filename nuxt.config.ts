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
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  // Consumed by @nuxtjs/sitemap and @nuxtjs/robots. Absent before, so the
  // sitemap was emitting URLs that pointed nowhere.
  site: {
    url: site.url,
    name: site.title,
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
  },

  devtools: { enabled: process.env.NODE_ENV === 'development' },
})
