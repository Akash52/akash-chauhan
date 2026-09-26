---
title: 'Open-source database platform migration'
description: 'Drove a 3-year-overdue Nuxt migration, fixed 17 production Sentry errors, and traced race conditions in a complex open-source codebase — with zero data loss.'
tags: ['Vue 3', 'Nuxt 3', 'Vuex', 'TypeScript', 'Sentry']
role: 'Senior Frontend Developer'
duration: '6+ months (ongoing)'
team_size: '4 developers'
featured: true
order: 2
---

## The challenge

I joined an open-source database platform (Baserow) that had been deferring a major Nuxt framework migration for over three years. The codebase had accumulated significant tech debt, production errors were piling up in Sentry, and the team needed someone who could navigate a large, unfamiliar codebase and start contributing fast.

The migration wasn't a clean "swap the framework" job — it involved untangling years of workarounds, updating deprecated APIs, and ensuring that thousands of existing users experienced zero disruption.

## My approach

Instead of diving into the migration immediately, I spent the first two weeks understanding the existing architecture: which parts were stable, which were fragile, and where the real risk lived. I mapped out the dependency chain and identified the migration path that would let us ship incrementally rather than as a big-bang release.

I also set up a post-merge audit process — every PR that touched migration-critical code got a structured review against a checklist I created, specifically to catch regressions before they hit production.

## Key technical work

**Traced a race condition in ViewSearchContext.** Users reported intermittent search failures that only appeared under rapid input. The existing team hadn't been able to reproduce it reliably. I traced it to a timing issue where search debounce cleanup wasn't happening correctly when the component re-mounted — a classic race condition that only appeared when users typed fast enough to trigger overlapping async calls.

**Resolved 17 production Sentry errors.** I triaged the entire Sentry backlog, categorized errors by impact, and systematically fixed them. Several were interconnected — fixing one root cause resolved 3-4 surface-level errors.

**Built notification workflow and analytics integration.** Implemented a notification system and integrated Zoho Analytics for usage tracking, plus an AI credit tracking system to monitor the platform's AI feature consumption.

**Created comprehensive handover documentation.** Issue workflows, debugging guides, and log analysis procedures for the team taking over after my engagement.

## Results

- Migration executed with zero data loss and zero downtime
- 17 Sentry errors resolved, reducing production error rate significantly
- Post-merge audit process adopted by the full team
- Handover documentation enabled smooth transition to the incoming team
