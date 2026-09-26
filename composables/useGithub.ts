import github from '~/data/github.json'

export interface FeaturedRepo {
  name: string
  blurb: string
  language: string | null
  stars: number
  forks: number
  updatedAt: string
  url: string
}

/**
 * Live GitHub figures from data/github.json, written at build time by
 * scripts/fetch-github.mjs.
 *
 * `starsEarned` is stars other people gave non-fork repos. The 312 on the
 * GitHub profile page counts repos Akash starred; it is not an achievement and
 * is never fetched or shown.
 */
export function useGithub() {
  return {
    publicRepos: github.publicRepos,
    followers: github.followers,
    starsEarned: github.starsEarned,
    topLanguages: github.topLanguages,
    featured: github.featured as FeaturedRepo[],
    profileUrl: github.profileUrl,
    fetchedAt: github.fetchedAt,
    /** Shown alongside the numbers — the date is what makes them believable. */
    updatedLabel: new Date(github.fetchedAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  }
}

/** "November 2023" — repos are honest about when they were last touched. */
export function formatRepoDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}
