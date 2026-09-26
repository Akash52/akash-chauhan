<script setup lang="ts">
interface Props {
  title: string
  description: string
  slug: string
  date: string
  tags?: string[]
  readingTime?: string
}

defineProps<Props>()

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <NuxtLink
    :to="`/blog/${slug}`"
    class="group block rounded-card border border-ink-100 bg-white p-5 shadow-card transition-all hover:border-ink-200 hover:shadow-card-hover"
  >
    <!-- Meta row -->
    <div class="flex items-center gap-3 text-caption text-ink-400">
      <time :datetime="date">{{ formatDate(date) }}</time>
      <span v-if="readingTime" class="flex items-center gap-1">
        <span aria-hidden="true">&middot;</span>
        {{ readingTime }}
      </span>
    </div>

    <!-- Title -->
    <h3 class="mt-2.5 text-subheading text-ink-900 transition-colors group-hover:text-accent-600">
      {{ title }}
    </h3>

    <!-- Description -->
    <p class="mt-2 text-small text-ink-500 line-clamp-2">
      {{ description }}
    </p>

    <!-- Tags -->
    <div v-if="tags?.length" class="mt-4 flex flex-wrap gap-1.5">
      <span v-for="tag in tags.slice(0, 3)" :key="tag" class="tag tag-default text-xs">
        {{ tag }}
      </span>
    </div>
  </NuxtLink>
</template>
