<script setup lang="ts">
import { profile, site } from '~/data/profile'
import { services } from '~/data/services'

useSeo({
  title: site.title,
  description: site.description(),
  path: '/',
})

// Case studies from content/work/ markdown
const { data: featuredWork } = await useAsyncData('featured-work', () =>
  queryContent('work').where({ featured: true }).sort({ order: 1 }).limit(3).find(),
)

const { featured: featuredArticles, total: articleTotal } = useArticles()
const { featured: featuredRepos, starsEarned, updatedLabel, profileUrl } = useGithub()
</script>

<template>
  <div>
    <AppHero />

    <!-- Case studies -->
    <section class="section-padding border-t border-ink-100">
      <div class="container-content">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-prose">
            <h2 class="font-serif text-display-sm text-ink-900">Case studies</h2>
            <p class="mt-2 text-body text-ink-500">
              What the problem was, what I did about it, and what shipped.
            </p>
          </div>
          <NuxtLink
            to="/work"
            class="inline-flex min-h-[44px] items-center gap-1 text-small font-medium text-accent-600 transition-colors hover:text-accent-700"
          >
            All case studies
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <CaseStudyCard
            v-for="project in featuredWork"
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

    <!-- Services -->
    <section class="section-padding border-t border-ink-100 bg-ink-50/40">
      <div class="container-content">
        <div class="max-w-prose">
          <h2 class="font-serif text-display-sm text-ink-900">How I can help</h2>
          <p class="mt-2 text-body text-ink-500">
            Three things I am hired to do. Each one links to work you can check.
          </p>
        </div>

        <div class="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
          <div v-for="service in services" :key="service.slug">
            <h3 class="font-serif text-heading text-ink-900">{{ service.title }}</h3>
            <p class="mt-2 text-small text-ink-600">{{ service.forWhom }}</p>
          </div>
        </div>

        <NuxtLink
          to="/services"
          class="mt-6 inline-flex min-h-[44px] items-center gap-1 text-small font-medium text-accent-600 transition-colors hover:text-accent-700"
        >
          What each one involves
          <span aria-hidden="true">&rarr;</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Open source -->
    <section class="section-padding border-t border-ink-100">
      <div class="container-content">
        <div class="max-w-prose">
          <h2 class="font-serif text-display-sm text-ink-900">Open source</h2>
          <p class="mt-2 text-body text-ink-500">
            {{ starsEarned }} stars across my public repositories. Everything here is readable
            before you hire me.
          </p>
        </div>

        <div class="mt-8 divide-y divide-ink-100 border-y border-ink-100">
          <RepoCard v-for="repo in featuredRepos" :key="repo.name" :repo="repo" />
        </div>

        <p class="mt-6 text-caption text-ink-400">
          Source: GitHub API, updated {{ updatedLabel }}.
          <a
            :href="profileUrl"
            target="_blank"
            rel="noopener"
            class="link-inline"
          >
            {{ profile.links.github.replace('https://', '') }}
          </a>
        </p>
      </div>
    </section>

    <!-- Writing -->
    <section class="section-padding border-t border-ink-100 bg-ink-50/40">
      <div class="container-content">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="max-w-prose">
            <h2 class="font-serif text-display-sm text-ink-900">Writing</h2>
            <p class="mt-2 text-body text-ink-500">
              Migrations, architecture and the parts that went wrong.
            </p>
          </div>
          <NuxtLink
            to="/writing"
            class="inline-flex min-h-[44px] items-center gap-1 text-small font-medium text-accent-600 transition-colors hover:text-accent-700"
          >
            All {{ articleTotal }} articles
            <span aria-hidden="true">&rarr;</span>
          </NuxtLink>
        </div>

        <div class="mt-10 grid gap-5 md:grid-cols-3">
          <ArticleCard
            v-for="article in featuredArticles"
            :key="article.slug"
            :article="article"
          />
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
