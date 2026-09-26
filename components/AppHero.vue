<script setup lang="ts">
import { profile, experienceLabel } from '~/data/profile'

const { total: articleTotal } = useArticles()
const { featured } = useGithub()

const msal = featured.find((r) => r.name === 'msal-with-nuxt3')

/**
 * One line of proof, assembled from the data files. Every clause corresponds to
 * something further down this site that the reader can click and check.
 */
const proof = [
  `${experienceLabel()} at ${profile.company}`,
  `${articleTotal} technical articles`,
  msal ? `an MSAL + Nuxt 3 starter others use (${msal.stars}★)` : null,
].filter(Boolean)
</script>

<template>
  <section class="section-padding">
    <div class="container-content">
      <div class="max-w-3xl">
        <!--
          The availability badge renders only once profile.availability is
          confirmed. A stale "available from <month>" is worse than no badge.
        -->
        <div
          v-if="profile.availability"
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-signal-100 bg-signal-50 px-3.5 py-1.5"
        >
          <span class="h-2 w-2 rounded-full bg-signal-600" aria-hidden="true" />
          <span class="text-caption font-medium text-signal-600">
            Available {{ profile.availability.hoursPerWeek }} hrs/week from
            {{ profile.availability.startingFrom }}
          </span>
        </div>

        <h1 class="font-serif text-display text-balance text-ink-950">
          {{ profile.valueProp }}
        </h1>

        <p class="mt-6 text-lg leading-relaxed text-ink-600">
          {{ proof.join(' · ') }}
        </p>

        <div class="mt-9 flex flex-wrap gap-3">
          <NuxtLink
            to="/work"
            class="rounded-lg bg-ink-900 px-6 py-3 text-body font-medium text-ink-0 transition-colors hover:bg-ink-800"
          >
            See case studies
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="rounded-lg border border-ink-200 px-6 py-3 text-body font-medium text-ink-700 transition-colors hover:border-ink-300 hover:bg-ink-50"
          >
            Hire me for a project
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
