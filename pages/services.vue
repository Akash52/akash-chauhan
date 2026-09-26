<script setup lang="ts">
useSeo({
  title: 'Services — Akash Chauhan',
  description:
    'New app builds, codebase rescue and migration, or embedded frontend development. Three ways to work together.',
  path: '/services',
})

const process = [
  {
    step: '01',
    title: 'Discovery call',
    description:
      'We talk through your project, timeline, and constraints. I ask questions. You get a sense of whether I\'m the right fit. No cost, no commitment — 30 minutes.',
  },
  {
    step: '02',
    title: 'Scope & proposal',
    description:
      'I send a written proposal with scope, timeline, milestones, and pricing within 48 hours. Clear deliverables, no ambiguity.',
  },
  {
    step: '03',
    title: 'Build sprints',
    description:
      'Work happens in weekly sprints with a demo at the end of each. You see progress every week, and can adjust direction without surprises.',
  },
  {
    step: '04',
    title: 'Handoff & docs',
    description:
      'Every engagement ends with documentation, knowledge transfer, and a structured handoff. Your team can maintain and extend everything I built.',
  },
]
</script>

<template>
  <div>
    <!-- Header -->
    <section class="section-padding border-b border-ink-100">
      <div class="container-content">
        <div class="max-w-xl">
          <h1 class="text-display text-ink-950">Services</h1>
          <p class="mt-4 text-lg text-ink-500">
            I work with product teams, startups, and agencies that need senior frontend expertise — without the overhead of a full-time hire.
          </p>
        </div>
      </div>
    </section>

    <!-- Service details -->
    <section class="section-padding">
      <div class="container-content">
        <!-- Service 1 -->
        <div class="grid gap-8 md:grid-cols-5">
          <div class="md:col-span-2">
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50">
              <svg class="h-5 w-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m0 0a14.926 14.926 0 01-5.96-5.96M9.63 8.41a6 6 0 107.38 5.84" />
              </svg>
            </div>
            <h2 class="mt-4 text-heading text-ink-900">New app build</h2>
            <p class="mt-1 text-caption text-ink-400">4–8 weeks · Fixed scope</p>
          </div>
          <div class="md:col-span-3">
            <p class="text-body text-ink-600">
              You have a product idea, a design, or a backend — and you need the frontend built right from day one. I set up the architecture, component library, auth flows, routing, state management, and CI/CD pipeline so your team inherits a codebase that scales.
            </p>
            <p class="mt-3 text-body text-ink-600">
              I've done this across Vue 3, React, and Angular, most recently architecting an entire creator-fan platform with Stripe payments, OAuth, real-time chat, and role-based access for three personas.
            </p>
          </div>
        </div>

        <hr class="my-12 border-ink-100" />

        <!-- Service 2 -->
        <div class="grid gap-8 md:grid-cols-5">
          <div class="md:col-span-2">
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <svg class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            <h2 class="mt-4 text-heading text-ink-900">Codebase rescue & migration</h2>
            <p class="mt-1 text-caption text-ink-400">2–6 weeks · Audit-first</p>
          </div>
          <div class="md:col-span-3">
            <p class="text-body text-ink-600">
              Your frontend is on an outdated stack, full of tech debt, or breaking in production. I audit the codebase, write a migration plan with clear milestones, and execute it incrementally — no big-bang rewrites, no data loss, no production downtime.
            </p>
            <p class="mt-3 text-body text-ink-600">
              This is what I do best. I've driven a 3-year-overdue Nuxt migration with zero data loss, fixed 17 production Sentry errors in a single engagement, and traced race conditions that other developers couldn't find. I also write the handover documentation so your team can maintain everything after I leave.
            </p>
          </div>
        </div>

        <hr class="my-12 border-ink-100" />

        <!-- Service 3 -->
        <div class="grid gap-8 md:grid-cols-5">
          <div class="md:col-span-2">
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <svg class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h2 class="mt-4 text-heading text-ink-900">Embedded frontend developer</h2>
            <p class="mt-1 text-caption text-ink-400">2–6 months · Part or full time</p>
          </div>
          <div class="md:col-span-3">
            <p class="text-body text-ink-600">
              You have a team and a product, but you need an extra senior developer who can ramp up fast and contribute from week one. I join your existing workflow — your standups, your repos, your Slack channels — and work as part of the team.
            </p>
            <p class="mt-3 text-body text-ink-600">
              I pick up new frameworks in under two weeks. I've transitioned between Angular, Vue, and React within six months while shipping production code in all three. I also mentor junior developers, do thorough code reviews, and leave your team stronger than I found it.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section-padding border-t border-ink-100 bg-ink-50/30">
      <div class="container-content">
        <h2 class="text-display-sm text-ink-900">How I work</h2>
        <p class="mt-2 text-body text-ink-500">
          Straightforward process. No surprises.
        </p>

        <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="item in process" :key="item.step" class="relative">
            <div class="text-3xl font-bold text-ink-200">{{ item.step }}</div>
            <h3 class="mt-2 text-subheading text-ink-900">{{ item.title }}</h3>
            <p class="mt-2 text-small text-ink-500">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
