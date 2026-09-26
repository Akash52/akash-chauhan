import generated from '~/data/articles.generated.json'

export interface Article {
  slug: string
  title: string
  publication: 'Simform Engineering' | 'Personal'
  /** ISO date, or null when the publication date is still unverified. */
  date: string | null
  /** Shown instead of `date` when only the year is known, e.g. "2023". */
  approxDate?: string
  url: string
  summary: string | null
  coverImage: string | null
  featured: boolean
}

/**
 * Articles come from data/articles.generated.json, which scripts/fetch-articles.mjs
 * builds from the curated list plus the live Medium feed. Nothing here is typed
 * by hand into a component, and the counts are derived rather than asserted.
 */
export function useArticles() {
  const articles = generated.articles as Article[]

  const featured = articles.filter((a) => a.featured)

  const byPublication = articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.publication] = (acc[a.publication] || 0) + 1
    return acc
  }, {})

  return {
    articles,
    featured,
    total: articles.length,
    byPublication,
    simformCount: byPublication['Simform Engineering'] || 0,
    fetchedAt: generated.fetchedAt,
  }
}

/** "12 November 2025", or the approximate year when that is all we can verify. */
export function formatArticleDate(article: Pick<Article, 'date' | 'approxDate'>): string {
  if (!article.date) return article.approxDate || ''
  return new Date(article.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
