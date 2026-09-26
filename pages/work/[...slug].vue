<script setup lang="ts">
const route = useRoute()

const { data: project } = await useAsyncData(`work-${route.path}`, () =>
  queryContent(route.path).findOne(),
)

if (!project.value) {
  throw createError({ statusCode: 404, message: 'Project not found' })
}

useSeo({
  title: `${project.value.title} — Akash Chauhan`,
  description: project.value.description,
  path: route.path,
  type: 'article',
})
</script>

<template>
  <div v-if="project">
    <article class="section-padding">
      <div class="container-content">
        <!-- Header -->
        <div class="mx-auto max-w-prose">
          <NuxtLink
            to="/work"
            class="mb-6 inline-flex items-center gap-1 text-small text-ink-400 transition-colors hover:text-ink-600"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            All work
          </NuxtLink>

          <h1 class="text-display-sm text-ink-950">{{ project.title }}</h1>

          <!-- Meta -->
          <div class="mt-4 flex flex-wrap gap-4 text-small text-ink-400">
            <span v-if="project.role" class="flex items-center gap-1.5">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
              </svg>
              {{ project.role }}
            </span>
            <span v-if="project.duration" class="flex items-center gap-1.5">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ project.duration }}
            </span>
            <span v-if="project.team_size" class="flex items-center gap-1.5">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197" />
              </svg>
              {{ project.team_size }}
            </span>
          </div>

          <!-- Tags -->
          <div v-if="project.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <span v-for="tag in project.tags" :key="tag" class="tag tag-accent">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Body — rendered from markdown -->
        <div class="prose-content mt-12">
          <ContentRenderer
            :value="project"
            class="prose prose-ink max-w-none prose-headings:font-semibold prose-headings:text-ink-900 prose-p:text-ink-600 prose-a:text-accent-600 prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-ink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-ink-700 prose-code:before:content-none prose-code:after:content-none"
          />
        </div>
      </div>
    </article>

    <CtaSection />
  </div>
</template>
