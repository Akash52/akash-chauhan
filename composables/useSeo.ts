import { site } from '~/data/profile'

interface SeoOptions {
  title: string
  description: string
  /** Route path, e.g. '/work'. Joined onto site.url for canonical and og:url. */
  path?: string
  /** Absolute or root-relative image. Defaults to the generated OG card. */
  image?: string
  type?: 'website' | 'article'
  publishedAt?: string
}

/**
 * Canonical and og:url must be absolute and must match the deployed URL, or
 * link previews resolve to nothing. The previous value was akashchauhan.dev,
 * a domain that does not exist, with an og:image pointing at a file that was
 * never committed — so every share of this site rendered blank.
 */
export function useSeo(options: SeoOptions) {
  const path = options.path && options.path !== '/' ? options.path : ''
  const url = `${site.url}${path}`

  const image = options.image
    ? options.image.startsWith('http')
      ? options.image
      : `${site.url}${options.image}`
    : `${site.url}/og.png`

  useHead({
    title: options.title,
    meta: [
      { name: 'description', content: options.description },
      { property: 'og:site_name', content: site.title },
      { property: 'og:title', content: options.title },
      { property: 'og:description', content: options.description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:type', content: options.type || 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
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
