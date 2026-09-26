<script setup lang="ts">
useSeo({
  title: 'Blog — Akash Chauhan',
  description:
    'Technical deep-dives on frontend architecture, migration strategies, design patterns, and modern web development.',
  path: '/blog',
})

const { data: posts } = await useAsyncData('all-posts', () =>
  queryContent('blog').sort({ date: -1 }).find(),
)
</script>

<template>
  <div>
    <section class="section-padding">
      <div class="container-content">
        <div class="max-w-xl">
          <h1 class="text-display text-ink-950">Blog</h1>
          <p class="mt-4 text-lg text-ink-500">
            Technical writing on frontend architecture, production migrations, design patterns, and lessons from building real software.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <BlogCard
            v-for="post in posts"
            :key="post._path"
            :title="post.title"
            :description="post.description"
            :slug="post._path?.replace('/blog/', '') || ''"
            :date="post.date"
            :tags="post.tags"
            :reading-time="post.readingTime"
          />
        </div>
      </div>
    </section>
  </div>
</template>
