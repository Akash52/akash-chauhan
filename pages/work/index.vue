<script setup lang="ts">
useSeo({
  title: 'Work — Akash Chauhan',
  description:
    'Production projects I\'ve architected and shipped — from creator platforms to enterprise dashboards to legacy migrations.',
  path: '/work',
})

const { data: projects } = await useAsyncData('all-work', () =>
  queryContent('work').sort({ order: 1 }).find(),
)
</script>

<template>
  <div>
    <section class="section-padding">
      <div class="container-content">
        <div class="max-w-xl">
          <h1 class="text-display text-ink-950">Selected work</h1>
          <p class="mt-4 text-lg text-ink-500">
            Each project below is a real production application I architected and shipped.
            Details are anonymized where required by NDA, but the technical depth is real.
          </p>
        </div>

        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <CaseStudyCard
            v-for="project in projects"
            :key="project._path"
            :title="project.title"
            :description="project.description"
            :slug="project._path?.replace('/work/', '') || ''"
            :tags="project.tags"
            :role="project.role"
          />
        </div>
      </div>
    </section>

    <CtaSection
      title="Want to see more?"
      description="I'm happy to walk through any of these projects in detail on a call. Let's talk about what you're building."
    />
  </div>
</template>
