<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Working on something that needs a frontend engineer?',
  description:
    'Tell me what you are building and what is in the way. If I am not the right person for it, I will say so.',
})
</script>

<template>
  <!--
    bg-ink-950 with text-ink-0 inverts correctly in dark mode, because the ink
    ramp flips: this stays a high-contrast block in both themes.
    Left-aligned, like the rest of the site.
  -->
  <section class="section-padding bg-ink-950">
    <div class="container-content">
      <div class="max-w-prose">
        <h2 class="font-serif text-display-sm text-balance text-ink-0">
          {{ title }}
        </h2>
        <!--
          ink-300, not ink-400: against the inverted bg-ink-950 panel this is
          7.9:1 in light and 7.0:1 in dark, where ink-400 falls to ~3.5:1.
        -->
        <p class="mt-4 text-lg leading-relaxed text-ink-300">
          {{ description }}
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <NuxtLink
            to="/contact"
            class="rounded-lg bg-ink-0 px-6 py-3 text-body font-medium text-ink-900 transition-colors hover:bg-ink-100"
          >
            Get in touch
          </NuxtLink>
          <NuxtLink
            to="/services"
            class="rounded-lg border border-ink-700 px-6 py-3 text-body font-medium text-ink-300 transition-colors hover:border-ink-500 hover:text-ink-0"
          >
            What I do
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
