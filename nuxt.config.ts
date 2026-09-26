export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  // SSG mode — prerender everything at build time
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/work', '/services', '/blog', '/about', '/contact'],
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

  // Content module — powers blog + case studies from markdown
  content: {
    highlight: {
      theme: 'github-dark',
      langs: ['vue', 'typescript', 'javascript', 'bash', 'json', 'css', 'html'],
    },
    markdown: {
      anchorLinks: false,
    },
  },

  // Typography
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
      'JetBrains Mono': [400],
    },
    display: 'swap',
    preload: true,
  },

  // Tailwind
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  // SEO defaults
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Akash Chauhan — Senior Frontend Developer',
      meta: [
        {
          name: 'description',
          content:
            'I help product teams ship frontend faster — building new apps, rescuing legacy codebases, and migrating to modern stacks. Vue, React, Angular.',
        },
        { name: 'author', content: 'Akash Chauhan' },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Akash Chauhan — Senior Frontend Developer',
        },
        {
          property: 'og:description',
          content:
            'I help product teams ship frontend faster — building new apps, rescuing legacy codebases, and migrating to modern stacks.',
        },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },

  // Sitemap
  sitemap: {
    strictNuxtContentPaths: true,
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'avif'],
  },

  // Dev tools off in production
  devtools: { enabled: true },
})
