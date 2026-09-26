interface SeoOptions {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedAt?: string
}

export function useSeo(options: SeoOptions) {
  const baseUrl = 'https://akashchauhan.dev' // Update with your actual domain
  const url = `${baseUrl}${options.path || ''}`
  const image = options.image || `${baseUrl}/og-default.png`

  useHead({
    title: options.title,
    meta: [
      { name: 'description', content: options.description },
      { property: 'og:title', content: options.title },
      { property: 'og:description', content: options.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:type', content: options.type || 'website' },
      { name: 'twitter:title', content: options.title },
      { name: 'twitter:description', content: options.description },
      { name: 'twitter:image', content: image },
      ...(options.publishedAt
        ? [{ property: 'article:published_time', content: options.publishedAt }]
        : []),
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
