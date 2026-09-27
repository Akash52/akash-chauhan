import generated from '~/data/case-studies.json'

export interface CaseStudy {
  slug: string
  path: string
  title: string
  description: string
  tags: string[]
  role: string | null
  client: string | null
  /** False where there is no written permission to name the client. */
  clientNamed: boolean
  featured: boolean
  order: number
}

/**
 * Card data for the home page and /work, read from a build-time index rather
 * than queried at runtime. The detail page still uses queryContent, because it
 * renders the markdown body — this composable only carries frontmatter.
 */
export function useCaseStudies() {
  const studies = generated.studies as CaseStudy[]
  return {
    studies,
    featured: studies.filter((s) => s.featured),
    total: studies.length,
  }
}
