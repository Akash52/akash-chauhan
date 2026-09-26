---
title: 'How I moved my app from Nuxt 3 to Nuxt 4'
description: 'A practical guide to migrating a production Nuxt 3 application to Nuxt 4 — covering breaking changes, compatibility mode, and lessons from doing it on a real codebase.'
date: '2025-08-15'
tags: ['Nuxt', 'Vue', 'Migration']
readingTime: '8 min read'
---

When Nuxt 4 was announced, I was in the middle of maintaining a production application built on Nuxt 3. The migration wasn't optional — we needed the performance improvements and the new features. But we also couldn't afford downtime or regressions.

This is a practical walkthrough of how I approached the migration, what broke, and what I'd do differently next time.

## Why migrate?

Nuxt 4 brought meaningful improvements that justified the effort: a new default directory structure, improved compatibility with the broader Vue ecosystem, better TypeScript support, and performance gains from the updated Nitro engine. For our app — a data-heavy dashboard with complex routing — the performance improvements alone were worth it.

## The approach: compatibility mode first

Rather than attempting a big-bang migration, I used Nuxt's built-in compatibility mode. This let me run the app in a Nuxt 4 environment while keeping the Nuxt 3 conventions, then migrate features incrementally.

```typescript
// nuxt.config.ts — start with compat mode
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  // ... rest of config
})
```

This immediately surfaced which parts of our codebase relied on deprecated patterns without breaking the app.

## What actually broke

**Directory structure changes.** Nuxt 4's new `app/` directory convention meant our existing `pages/`, `components/`, and `composables/` directories needed to move. This was the most tedious part — not technically complex, just time-consuming with a large codebase.

**Module compatibility.** Several third-party modules hadn't been updated for Nuxt 4. I had to audit each one, check for alternatives, or temporarily pin to compatible versions.

**Typing changes.** Some internal type definitions changed, which caused build errors in our TypeScript-heavy codebase. The fix was mostly updating import paths and type annotations.

## Lessons learned

1. **Run the compatibility check before planning your timeline.** I underestimated the module compatibility work by about 40%.
2. **Migrate tests alongside code.** Don't let tests drift — update them in the same PR as the feature migration.
3. **Keep a changelog.** Document every breaking change you encounter. Your future self (or the team inheriting the codebase) will thank you.

The full migration took about two weeks of focused work. Post-migration, we saw measurable improvement in build times and initial page load. Worth it — but plan for more time than you think.

---

*Originally published on [Simform Engineering](https://www.simform.com/blog/). Cross-posted here with permission.*
