<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryContent(route.path).findOne(),
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

useSeo({
  title: `${post.value.title} — Akash Chauhan`,
  description: post.value.description,
  path: route.path,
  type: 'article',
  publishedAt: post.value.date,
})

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
</script>

<template>
  <div v-if="post">
    <article class="section-padding">
      <div class="container-content">
        <div class="mx-auto max-w-prose">
          <!-- Back link -->
          <NuxtLink
            to="/blog"
            class="mb-6 inline-flex items-center gap-1 text-small text-ink-400 transition-colors hover:text-ink-600"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
            All articles
          </NuxtLink>

          <!-- Title -->
          <h1 class="text-display-sm text-balance text-ink-950">{{ post.title }}</h1>

          <!-- Meta -->
          <div class="mt-4 flex items-center gap-4 text-small text-ink-400">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span v-if="post.readingTime">&middot; {{ post.readingTime }}</span>
          </div>

          <!-- Tags -->
          <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <span v-for="tag in post.tags" :key="tag" class="tag tag-default">
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Body -->
        <div class="prose-content mt-12">
          <ContentRenderer
            :value="post"
            class="prose prose-ink max-w-none prose-headings:font-semibold prose-headings:text-ink-900 prose-p:text-ink-600 prose-a:text-accent-600 prose-a:no-underline hover:prose-a:underline prose-code:rounded prose-code:bg-ink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-ink-700 prose-code:before:content-none prose-code:after:content-none"
          />
        </div>
      </div>
    </article>

    <CtaSection
      title="Found this useful?"
      description="I write about frontend architecture, production migrations, and patterns I've learned shipping real software. Let's connect."
    />
  </div>
</template>
