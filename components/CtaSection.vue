<script setup lang="ts">
interface Props {
  title?: string
  description?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Have a project in mind?',
  description:
    "I'm currently available for freelance work. Whether you need a new frontend built from scratch, a legacy app rescued, or an extra senior developer on your team — let's talk.",
})
</script>

<template>
  <section class="section-padding bg-ink-950">
    <div class="container-content text-center">
      <h2 class="text-display-sm text-balance text-white">
        {{ title }}
      </h2>
      <p class="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-400">
        {{ description }}
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <NuxtLink
          to="/contact"
          class="rounded-lg bg-white px-6 py-3 text-body font-medium text-ink-900 transition-all hover:bg-ink-100"
        >
          Start a conversation
        </NuxtLink>
        <NuxtLink
          to="/services"
          class="rounded-lg border border-ink-700 px-6 py-3 text-body font-medium text-ink-300 transition-all hover:border-ink-500 hover:text-white"
        >
          View services
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
