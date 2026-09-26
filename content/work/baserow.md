---
title: 'Baserow: Nuxt 2 to Nuxt 3 migration'
description: 'Migrated an open-source no-code database platform from Nuxt 2 to Nuxt 3, traced a long-standing search race condition, and worked through a backlog of production Sentry errors.'
tags: ['Vue', 'Nuxt 3', 'Vuex', 'TypeScript', 'Sentry']
role: 'Frontend engineer'
duration: '6+ months'
client: 'Baserow'
# Open-source project, publicly developed — no NDA, so it can be named.
client_named: true
permission: true
featured: true
order: 1
links:
  - label: 'baserow/baserow on GitHub'
    href: 'https://github.com/baserow/baserow'
---

## Context

[Baserow](https://github.com/baserow/baserow) is an open-source no-code database platform — a
self-hostable alternative to Airtable. The frontend is a large Nuxt application with a long history
and a real installed base of self-hosted users.

I worked on moving that frontend from Nuxt 2 to Nuxt 3.

## The hard problem

A framework migration on a codebase this size is rarely about the framework. Nuxt 2 to Nuxt 3
changes the module system, the composition API surface and the store layer all at once, and the
application had years of workarounds built against the old behaviour.

The constraint that shaped everything: people self-host Baserow. A migration that breaks on someone
else's server is not something you can hotfix for them.

## What I did

**Read before changing.** I spent my first weeks mapping which parts of the codebase were stable and
which were fragile, rather than starting on the migration immediately. The migration order came out
of that map.

**Migrated incrementally.** The work shipped in pieces that could each be reviewed and reverted,
rather than as one large branch that would be impossible to review honestly.

**Traced a race condition in `ViewSearchContext`.** Users hit intermittent search failures that only
appeared under fast typing, and it had resisted reproduction. The cause was debounce cleanup not
running when the component remounted, so overlapping async calls resolved out of order. The fix was
in the cleanup path, not in the debounce interval — adding a longer debounce would have hidden it
rather than fixed it.

**Worked through the Sentry backlog.** I triaged production errors by impact and fixed them in
groups. Several shared a root cause, so single fixes cleared multiple reported errors.

**Built notification UI over WebSockets**, and integrated Zoho Analytics for usage tracking.

**Wrote handover documentation** — issue workflows, debugging guides and log analysis notes for
whoever picked the work up next.

## Outcome

The migration shipped incrementally rather than as a single release. The search race condition was
fixed at its cause. The Sentry backlog came down.

I am deliberately not putting numbers on this page. Baserow develops in the open, so anything I
claimed here would be checkable against the repository — and I would rather describe the work
accurately than quantify it loosely.

## Stack

Vue, Nuxt 3, Vuex, TypeScript, WebSockets, Sentry, Zoho Analytics.
