<script setup lang="ts">
import type { FeaturedRepo } from '~/composables/useGithub'

defineProps<{ repo: FeaturedRepo }>()
</script>

<template>
  <!--
    A row rather than a card: the stats read as a line of facts, not badges.
    Stars, forks and the last-push date all come from the API, including when
    that date is old — a repo pretending to be current is worse than a quiet one.
  -->
  <a
    :href="repo.url"
    target="_blank"
    rel="noopener"
    class="group block py-6 transition-colors hover:bg-ink-50/60"
  >
    <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <h3 class="font-mono text-subheading text-ink-900 transition-colors group-hover:text-accent-600">
        {{ repo.name }}
      </h3>
      <span v-if="repo.language" class="text-caption text-ink-400">{{ repo.language }}</span>
    </div>

    <p class="mt-2 max-w-prose text-small text-ink-600">{{ repo.blurb }}</p>

    <dl class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-caption text-ink-400">
      <div class="flex gap-1.5">
        <dt>Stars</dt>
        <dd class="font-medium text-ink-600">{{ repo.stars }}</dd>
      </div>
      <div class="flex gap-1.5">
        <dt>Forks</dt>
        <dd class="font-medium text-ink-600">{{ repo.forks }}</dd>
      </div>
      <div class="flex gap-1.5">
        <dt>Last push</dt>
        <dd class="font-medium text-ink-600">{{ formatRepoDate(repo.updatedAt) }}</dd>
      </div>
    </dl>
  </a>
</template>
