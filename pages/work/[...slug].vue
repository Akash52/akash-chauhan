<script setup lang="ts">
const route = useRoute()

/**
 * Strip any trailing slash before querying.
 *
 * The prerenderer emits both /work/<slug> and /work/<slug>/, and the browser
 * resolves the directory URL to the trailing-slash form. Content _path values
 * never carry one, so queryContent('/work/<slug>/') matches nothing: the page
 * rendered correctly in the static HTML and then went blank on hydration.
 * Normalising here keeps the useAsyncData key stable across both forms too.
 */
const contentPath = computed(() => route.path.replace(/\/+$/, '') || '/')

const { data: project } = await useAsyncData(`work-${contentPath.value}`, () =>
  queryContent(contentPath.value).findOne(),
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

/** Role, duration and client, as a definition list rather than icon chips. */
const meta = computed(() => {
  const p = project.value!
  return [
    { term: 'Role', value: p.role },
    { term: 'Duration', value: p.duration },
    { term: 'Client', value: p.client },
    // team_size is deliberately absent: the figures in the old data
    // contradicted each other and none of them are verified.
  ].filter((m) => m.value)
})
</script>

<template>
  <div v-if="project">
    <!--
      Laid out as a document: one column, meta as a definition list, no hero
      image and no card chrome. A case study should look like something written
      down, not something advertised.
    -->
    <article class="section-padding">
      <div class="container-content">
        <div class="mx-auto max-w-prose">
          <NuxtLink
            to="/work"
            class="inline-flex min-h-[44px] items-center gap-1 text-small text-ink-400 transition-colors hover:text-ink-600"
          >
            <span aria-hidden="true">&larr;</span>
            All case studies
          </NuxtLink>

          <h1 class="mt-6 font-serif text-display-sm text-balance text-ink-950">
            {{ project.title }}
          </h1>

          <dl class="mt-6 grid gap-x-8 gap-y-2 border-y border-ink-100 py-4 sm:grid-cols-3">
            <div v-for="item in meta" :key="item.term">
              <dt class="text-caption font-medium uppercase tracking-wider text-ink-400">
                {{ item.term }}
              </dt>
              <dd class="mt-0.5 text-small text-ink-700">{{ item.value }}</dd>
            </div>
          </dl>

          <!-- Stated plainly rather than hidden; saying so is the point. -->
          <p v-if="project.client_named === false" class="mt-4 text-small text-ink-500">
            Client and product details are anonymised — I do not have written permission to name
            them.
          </p>
        </div>

        <div class="prose-content mt-10">
          <ContentRenderer :value="project" class="prose-doc" />

          <div v-if="project.links?.length" class="mx-auto mt-10 max-w-prose border-t border-ink-100 pt-6">
            <h2 class="text-caption font-medium uppercase tracking-wider text-ink-400">Links</h2>
            <ul class="mt-3 space-y-1.5">
              <li v-for="link in project.links" :key="link.href">
                <a
                  :href="link.href"
                  target="_blank"
                  rel="noopener"
                  class="text-small font-medium text-accent-600 hover:underline"
                >
                  {{ link.label }}
                  <span aria-hidden="true">&rarr;</span>
                </a>
              </li>
            </ul>
          </div>

          <div v-if="project.tags?.length" class="mx-auto mt-8 max-w-prose">
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in project.tags" :key="tag" class="tag tag-default">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </article>

    <CtaSection />
  </div>
</template>
