<script setup lang="ts">
import { profile } from '~/data/profile'

const { articles, total, simformCount, fetchedAt } = useArticles()

useSeo({
  title: 'Writing — Akash Chauhan',
  description: `${total} technical articles on frontend architecture, migrations and design systems. ${simformCount} published in Simform Engineering.`,
  path: '/writing',
})

const updated = new Date(fetchedAt).toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
</script>

<template>
  <div>
    <section class="section-padding">
      <div class="container-content">
        <h1 class="font-serif text-display text-ink-950">Writing</h1>
        <!-- The list is the claim. No "10+" rounding — every item links out. -->
        <p class="mt-4 max-w-prose text-body text-ink-500">
          {{ total }} articles, {{ simformCount }} of them in Simform Engineering. Every one links
          to the original on Medium.
        </p>

        <ul class="mt-12 divide-y divide-ink-100 border-t border-ink-100">
          <li v-for="article in articles" :key="article.slug">
            <a
              :href="article.url"
              target="_blank"
              rel="noopener"
              class="group flex gap-6 py-6 transition-colors hover:bg-ink-50/60"
            >
              <img
                v-if="article.coverImage"
                :src="article.coverImage"
                alt=""
                width="128"
                height="96"
                loading="lazy"
                class="hidden h-24 w-32 flex-shrink-0 rounded object-cover sm:block"
              >

              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    class="tag"
                    :class="
                      article.publication === 'Simform Engineering'
                        ? 'tag-accent'
                        : 'tag-default'
                    "
                  >
                    {{ article.publication }}
                  </span>
                  <span class="text-caption text-ink-400">
                    {{ formatArticleDate(article) }}
                  </span>
                </div>

                <h2
                  class="mt-2 font-serif text-heading text-ink-900 transition-colors group-hover:text-accent-600"
                >
                  {{ article.title }}
                </h2>

                <p v-if="article.summary" class="mt-2 max-w-prose text-small text-ink-500">
                  {{ article.summary }}
                </p>
              </div>
            </a>
          </li>
        </ul>

        <!-- The date is what makes the numbers believable. -->
        <p class="mt-8 text-caption text-ink-400">
          Source: Medium RSS, updated {{ updated }}.
          <a
            :href="profile.links.medium"
            target="_blank"
            rel="noopener"
            class="link-inline"
          >
            All articles on Medium
          </a>
        </p>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
