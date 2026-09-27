<script setup lang="ts">
import type { Article } from '~/composables/useArticles'

defineProps<{ article: Article }>()
</script>

<template>
  <!--
    Links straight to Medium rather than re-hosting the text. The previous site
    kept local rewrites of these articles, which drifted from the originals and
    carried the wrong publication dates.
  -->
  <a
    :href="article.url"
    target="_blank"
    rel="noopener"
    class="group flex flex-col rounded-card border border-ink-100 bg-ink-0 shadow-card transition-all hover:border-ink-200 hover:shadow-card-hover"
  >
    <img
      v-if="article.coverImage"
      :src="article.coverImage"
      alt=""
      width="400"
      height="200"
      loading="lazy"
      class="h-40 w-full rounded-t-card object-cover"
    >

    <div class="flex flex-1 flex-col p-5">
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          class="tag"
          :class="article.publication === 'Simform Engineering' ? 'tag-accent' : 'tag-default'"
        >
          {{ article.publication }}
        </span>
        <span class="text-caption text-ink-400">{{ formatArticleDate(article) }}</span>
      </div>

      <h3
        class="mt-3 font-serif text-subheading text-ink-900 transition-colors group-hover:text-accent-600"
      >
        {{ article.title }}
      </h3>

      <p v-if="article.summary" class="mt-2 text-small text-ink-500">
        {{ article.summary }}
      </p>

      <span class="mt-4 text-caption font-medium text-accent-600">
        Read on Medium
        <span aria-hidden="true">&rarr;</span>
      </span>
    </div>
  </a>
</template>
