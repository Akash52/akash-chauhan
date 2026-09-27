<script setup lang="ts">
useSeo({
  title: 'Case studies — Akash Chauhan',
  description:
    'Frontend work on a Nuxt 2 to 3 migration, a subscription platform, a legacy senior-care application and an Angular analytics dashboard.',
  path: '/work',
})

// Build-time index; the detail page still queries content for the body.
const { studies: projects } = useCaseStudies()
</script>

<template>
  <div>
    <section class="section-padding">
      <div class="container-content">
        <div class="max-w-prose">
          <h1 class="font-serif text-display text-ink-950">Case studies</h1>
          <p class="mt-4 text-lg text-ink-600">
            What the problem was, what I did about it, and what shipped. Where I do not have
            permission to name a client, the work is described and the client is not.
          </p>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-2">
          <CaseStudyCard
            v-for="project in projects"
            :key="project.slug"
            :title="project.title"
            :description="project.description"
            :slug="project.slug"
            :tags="project.tags"
            :role="project.role"
            :client="project.client"
          />
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
