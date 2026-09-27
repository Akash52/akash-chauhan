/**
 * Single source of truth for every fact on this site.
 *
 * Rules:
 *  - No component hard-codes a number. It comes from here, data/github.json,
 *    or data/articles.json.
 *  - Anything not yet verified is `null`. Components must skip null fields
 *    rather than render a placeholder — the audit greps the built HTML for
 *    "[CONFIRM" and fails the build if one leaks.
 */

/** Career start: joined Simform as a trainee in Jan 2022. */
export const CAREER_START = new Date('2022-01-01T00:00:00Z')

/**
 * Whole years since CAREER_START. Floored, never rounded up — "4+ years" is
 * only ever an understatement. Recomputed at build time, so it ages on its own.
 */
export function yearsOfExperience(now: Date = new Date()): number {
  let years = now.getUTCFullYear() - CAREER_START.getUTCFullYear()
  const monthDelta = now.getUTCMonth() - CAREER_START.getUTCMonth()
  if (monthDelta < 0 || (monthDelta === 0 && now.getUTCDate() < CAREER_START.getUTCDate())) {
    years--
  }
  return Math.max(0, years)
}

/** The one phrasing used in meta tags, hero, About and the OG image alike. */
export function experienceLabel(now: Date = new Date()): string {
  return `${yearsOfExperience(now)}+ years`
}

export interface EducationEntry {
  qualification: string
  institution: string
  location: string
  from: number
  to: number
  cgpa: string
}

export const profile = {
  name: 'Akash Chauhan',
  role: 'Senior Software Engineer',
  company: 'Simform Solutions',
  /** Trainee Jan–Apr 2022, Senior Software Engineer since Apr 2022. */
  companySince: '2022-04',
  traineeFrom: '2022-01',
  location: 'Gujarat, India',
  timezone: 'IST (UTC+5:30)',
  email: 'ac8572611@gmail.com',

  /**
   * The one sentence a client reads first. Used by the hero and the OG image
   * from this single definition, so the two can never disagree.
   * Wording taken from the brief — confirm before launch.
   */
  valueProp:
    'I build and fix Vue, Nuxt, React and Angular frontends, including the messy legacy ones.',

  /** Confirmed 2026-09-26. Old data disagreed (5 vs 8); this is the real count. */
  productionProjects: 5,

  /** Unconfirmed — 3 or 4. Null until verified; nothing renders it meanwhile. */
  pocs: null as number | null,

  /** Unconfirmed — phrase as "me + 2 developers" once verified. */
  cvPortalTeam: null as string | null,

  /**
   * Confirmed 2026-09-27. `overlap` and `startingFrom` stay null until Akash
   * commits to them; components render only the fields that are set, so a
   * half-known availability is still publishable.
   */
  availability: {
    hoursPerWeek: '15–25',
    overlap: null,
    startingFrom: null,
  } as {
    hoursPerWeek: string
    overlap: string | null
    startingFrom: string | null
  } | null,

  /** Confirmed 2026-09-27. Deliberately under-promised: beating it is the point. */
  responseTime: 'I reply to project enquiries within two working days.' as string | null,

  /**
   * Contract Angular work taken through an agency, subcontracted onto projects
   * delivered to US enterprise teams.
   *
   * Confirmed 2026-09-27: started April 2022, and there is NO written
   * permission to name any end client. So the sectors are listed and the names
   * are not — which is also the stronger position commercially. "Under NDA"
   * ends a client's follow-up question; a logo invites "on what, and who was
   * your contact?", which is the question that cannot be answered.
   *
   * scripts/audit.mjs fails the build if any of those client names reaches the
   * source or the rendered output.
   */
  agencyWork: {
    since: 'April 2022',
    summary:
      'Contract Angular work through an agency, subcontracted onto projects for US enterprise teams. Mostly moving ageing AngularJS and jQuery front ends onto modern Angular, plus component architecture, RxJS and NgRx state, and performance work.',
    confidentiality:
      'These engagements are under NDA, so I can describe the work but not name the clients.',
    sectors: [
      'Finance',
      'Healthcare',
      'Logistics and transport',
      'Aviation',
      'Technology',
      'Professional services',
      'Government',
    ],
    focus: [
      'Angular migration',
      'Legacy modernisation',
      'Component architecture',
      'RxJS & NgRx',
      'Performance optimisation',
      'Enterprise UI systems',
    ],
    /** Flip to true only with written permission, per named client. */
    namedClientsPermitted: false,
  } as {
    since: string
    summary: string
    confidentiality: string
    sectors: string[]
    focus: string[]
    namedClientsPermitted: boolean
  } | null,

  education: [
    {
      qualification: 'B.E. Information Technology',
      institution: 'VVP Engineering College',
      location: 'Rajkot',
      from: 2019,
      to: 2022,
      cgpa: '8.64',
    },
    {
      qualification: 'Diploma, Information Technology',
      institution: 'Lukhdhirji Engineering College',
      location: 'Morbi',
      from: 2016,
      to: 2019,
      cgpa: '8.10',
    },
  ] satisfies EducationEntry[],

  links: {
    github: 'https://github.com/Akash52',
    medium: 'https://medium.com/@19it197.akashbhai.chauhan',
    /** Taken from Akash's own GitHub profile README, so this one is real. */
    linkedin: 'https://www.linkedin.com/in/akash-chauhan-3616321a4/' as string | null,
    /** Set once the portfolio source repo is pushed. */
    sourceRepo: 'https://github.com/Akash52/akash-chauhan',
  },
} as const

/** Deployment target: GitHub Pages project site. */
export const site = {
  /**
   * Origin only. nuxt-site-config rejects a URL containing a path, and the
   * sitemap composes this with app.baseURL itself.
   */
  origin: 'https://akash52.github.io',
  /** Where the site actually lives — used for canonical, og:url and the OG card. */
  url: 'https://akash52.github.io/akash-chauhan',
  baseURL: '/akash-chauhan/',
  title: 'Akash Chauhan — Frontend Engineer',
  /** Experience figure is injected at build time so it can never drift. */
  description: (now: Date = new Date()) =>
    `Frontend engineer with ${experienceLabel(now)} building and fixing Vue, Nuxt, React and Angular applications. Available for freelance work.`,
} as const
