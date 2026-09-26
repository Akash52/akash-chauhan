/**
 * Three services, each tied to something a client can click and check.
 *
 * The rule: if a service cannot point at a repo, a case study or a published
 * article, it does not belong here. Generic offerings ("new app build",
 * "embedded developer") were removed because nothing backed them.
 */

export interface Service {
  slug: string
  title: string
  /** Who this is for — written as the situation, not a persona. */
  forWhom: string
  body: string[]
  /** What the client ends up with. Concrete deliverables, not adjectives. */
  deliverables: string[]
  evidence: { label: string; href: string; external?: boolean }[]
}

export const services: Service[] = [
  {
    slug: 'migrations',
    title: 'Vue and Nuxt migrations',
    forWhom:
      'Your app is on Vue 2, Nuxt 2, or a Nuxt 3 version you have stopped upgrading, and the longer it sits the more it costs.',
    body: [
      'I audit what you have, write the migration path with milestones, and run it incrementally so the app keeps shipping while it moves. No big-bang rewrite.',
      'I have done this on an open-source codebase with a large installed base, and written up a Nuxt 3 to Nuxt 4 migration of a production app in detail.',
    ],
    deliverables: [
      'A written audit of the current codebase and its risk areas',
      'A staged migration plan with milestones you can schedule around',
      'The migration itself, shipped incrementally',
      'Handover notes your team can work from afterwards',
    ],
    evidence: [
      { label: 'Open-source Nuxt 2 → 3 migration', href: '/work/open-source-migration' },
      {
        label: 'Nuxt 3 → 4 migration, written up',
        href: 'https://medium.com/simform-engineering/how-i-successfully-migrated-my-production-app-from-nuxt-3-to-nuxt-4-0b7379d0743d',
        external: true,
      },
    ],
  },
  {
    slug: 'features-and-fixes',
    title: 'Features and bug fixing in existing apps',
    forWhom:
      'You have a working Vue, React or Angular app — possibly with jQuery still in it — and you need someone who can work in it without a three-month ramp-up.',
    body: [
      'I read the codebase before changing it, find the cause rather than the symptom, and leave the fix documented. Most of my work has been in codebases I did not write.',
      'This includes the awkward ones: intermittent bugs that only appear under real usage, and legacy code nobody wants to open.',
    ],
    deliverables: [
      'Features built to match the conventions already in your codebase',
      'Root-cause fixes, with the reasoning written down',
      'Code review and notes for the team that maintains it next',
    ],
    evidence: [{ label: 'Open-source Nuxt 2 → 3 migration', href: '/work/open-source-migration' }],
  },
  {
    slug: 'auth',
    title: 'Auth integration',
    forWhom:
      'You need Microsoft Entra ID (Azure AD), MSAL or OAuth working properly in a Vue or Nuxt app, including the parts the official docs skip.',
    body: [
      'Token refresh, route guards and SSR are where these integrations usually break. I have a public Nuxt 3 starter covering exactly that, which other people have picked up and used.',
    ],
    deliverables: [
      'A working sign-in flow wired into your existing routing',
      'Token refresh and route guards that behave on reload and in SSR',
      'A written explanation of how the flow works, so it is maintainable',
    ],
    evidence: [
      { label: 'msal-with-nuxt3 on GitHub', href: 'https://github.com/Akash52/msal-with-nuxt3', external: true },
    ],
  },
]
