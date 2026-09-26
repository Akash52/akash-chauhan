---
title: 'Nuxt 2 to Nuxt 3 migration on an open-source platform'
description: 'Migrated a large open-source no-code database platform from Nuxt 2 to Nuxt 3, traced a long-standing search race condition, and worked through a backlog of production Sentry errors.'
tags: ['Vue', 'Nuxt 3', 'Vuex', 'TypeScript', 'Sentry']
role: 'Frontend engineer'
duration: '6+ months'
client: 'An open-source no-code database platform'
# Not named: no written permission, and the engagement is under NDA.
client_named: false
permission: false
featured: true
order: 1
---

## Context

A large open-source no-code database platform — a self-hostable alternative to the well-known
spreadsheet-database tools. The frontend is a substantial Nuxt application with a long history and a
real installed base of self-hosted users.

I worked on moving that frontend from Nuxt 2 to Nuxt 3.

Product and client details are withheld: the engagement is under NDA.

## The hard problem

A framework migration on a codebase this size is rarely about the framework. Nuxt 2 to Nuxt 3
changes the module system, the composition API surface and the store layer all at once, and the
application had years of workarounds built against the old behaviour.

The constraint that shaped everything: users self-host this product. A migration that breaks on
someone else's server is not something you can hotfix for them.

## What I did

**Read before changing.** I spent my first weeks mapping which parts of the codebase were stable and
which were fragile, rather than starting on the migration immediately. The migration order came out
of that map.

**Migrated incrementally.** The work shipped in pieces that could each be reviewed and reverted,
rather than as one large branch that would be impossible to review honestly.

**Traced a race condition in the view search context.** Users hit intermittent search failures that
only appeared under fast typing, and it had resisted reproduction. The cause was debounce cleanup
not running when the component remounted, so overlapping async calls resolved out of order. The fix
was in the cleanup path, not in the debounce interval — a longer debounce would have hidden it
rather than fixed it.

**Worked through the Sentry backlog.** I triaged production errors by impact and fixed them in
groups. Several shared a root cause, so single fixes cleared multiple reported errors.

**Built notification UI over WebSockets**, and integrated a third-party analytics product for usage
tracking.

**Wrote handover documentation** — issue workflows, debugging guides and log analysis notes for
whoever picked the work up next.

## Outcome

The migration shipped incrementally rather than as a single release. The search race condition was
fixed at its cause. The Sentry backlog came down.

I am deliberately not putting numbers on this page. I would rather describe the work accurately than
quantify it loosely.

## Stack

Vue, Nuxt 3, Vuex, TypeScript, WebSockets, Sentry.
