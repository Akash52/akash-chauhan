<script setup lang="ts">
interface Props {
  title: string
  description: string
  icon: 'rocket' | 'arrows' | 'code'
  features: string[]
}

defineProps<Props>()

const iconPaths: Record<string, string> = {
  rocket: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.84 2.58m0 0a14.926 14.926 0 01-5.96-5.96M9.63 8.41a6 6 0 107.38 5.84',
  arrows: 'M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
  code: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
}
</script>

<template>
  <div class="flex flex-col rounded-card border border-ink-100 bg-ink-0 p-6 shadow-card">
    <!-- Icon -->
    <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50">
      <svg class="h-5 w-5 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
        <path stroke-linecap="round" stroke-linejoin="round" :d="iconPaths[icon]" />
      </svg>
    </div>

    <h3 class="text-subheading text-ink-900">{{ title }}</h3>
    <p class="mt-2 flex-1 text-body text-ink-500">{{ description }}</p>

    <!-- Feature list -->
    <ul class="mt-5 space-y-2">
      <li
        v-for="feature in features"
        :key="feature"
        class="flex items-start gap-2 text-small text-ink-600"
      >
        <svg class="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {{ feature }}
      </li>
    </ul>
  </div>
</template>
