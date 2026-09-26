<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  availability?: string
}

withDefaults(defineProps<Props>(), {
  title: 'I build frontend that ships.',
  subtitle:
    'Senior frontend developer helping product teams launch new apps, rescue legacy codebases, and migrate to modern stacks — across Vue, React, and Angular.',
  availability: 'Available for new projects — September 2026',
})
</script>

<template>
  <section class="section-padding border-b border-ink-100">
    <div class="container-content">
      <div class="max-w-3xl">
        <!-- Availability badge -->
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5">
          <span class="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
          <span class="text-caption font-medium text-emerald-600">{{ availability }}</span>
        </div>

        <h1 class="text-display text-balance text-ink-950">
          {{ title }}
        </h1>

        <p class="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
          {{ subtitle }}
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink
            to="/work"
            class="rounded-lg bg-ink-900 px-6 py-3 text-body font-medium text-white transition-all hover:bg-ink-800 hover:shadow-card-hover"
          >
            See my work
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="rounded-lg border border-ink-200 bg-white px-6 py-3 text-body font-medium text-ink-700 transition-all hover:border-ink-300 hover:bg-ink-50"
          >
            Let's talk
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
