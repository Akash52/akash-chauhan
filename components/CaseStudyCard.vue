<script setup lang="ts">
interface Props {
  title: string
  description: string
  slug: string
  tags?: string[]
  role?: string
  client?: string
}

defineProps<Props>()
</script>

<template>
  <!--
    Flat and bordered rather than raised and animated. The shadow-and-lift
    treatment is what made these read as marketing tiles.
  -->
  <NuxtLink
    :to="`/work/${slug}`"
    class="group flex flex-col border border-ink-100 p-6 transition-colors hover:border-ink-300 hover:bg-ink-50/50"
  >
    <h3 class="font-serif text-heading text-balance text-ink-900 transition-colors group-hover:text-accent-600">
      {{ title }}
    </h3>

    <p v-if="client" class="mt-1.5 text-caption text-ink-400">{{ client }}</p>

    <p class="mt-3 flex-1 text-small leading-relaxed text-ink-600">
      {{ description }}
    </p>

    <div v-if="tags?.length" class="mt-4 flex flex-wrap gap-1.5">
      <span v-for="tag in tags.slice(0, 4)" :key="tag" class="tag tag-default">
        {{ tag }}
      </span>
    </div>

    <span class="mt-4 text-small font-medium text-accent-600">
      Read case study
      <span aria-hidden="true">&rarr;</span>
    </span>
  </NuxtLink>
</template>
