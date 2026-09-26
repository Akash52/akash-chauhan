<script setup lang="ts">
interface Props {
  title: string
  description: string
  slug: string
  tags?: string[]
  role?: string
  featured?: boolean
}

defineProps<Props>()
</script>

<template>
  <NuxtLink
    :to="`/work/${slug}`"
    class="group block rounded-card border border-ink-100 bg-white p-6 shadow-card transition-all hover:border-ink-200 hover:shadow-card-hover"
  >
    <!-- Tags -->
    <div v-if="tags?.length" class="mb-4 flex flex-wrap gap-2">
      <span
        v-for="tag in tags.slice(0, 4)"
        :key="tag"
        class="tag tag-default"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Title -->
    <h3 class="text-heading text-ink-900 transition-colors group-hover:text-accent-600">
      {{ title }}
    </h3>

    <!-- Role -->
    <p v-if="role" class="mt-1.5 text-caption font-medium text-ink-400">
      {{ role }}
    </p>

    <!-- Description -->
    <p class="mt-3 text-body text-ink-500 line-clamp-3">
      {{ description }}
    </p>

    <!-- Read more -->
    <div class="mt-5 flex items-center gap-1.5 text-small font-medium text-accent-600">
      Read case study
      <svg
        class="h-4 w-4 transition-transform group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </div>
  </NuxtLink>
</template>
