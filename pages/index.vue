<script setup lang="ts">
useSeo({
  title: 'Akash Chauhan — Senior Frontend Developer',
  description:
    'I help product teams ship frontend faster — building new apps, rescuing legacy codebases, and migrating to modern stacks. Vue, React, Angular.',
  path: '/',
})

// Featured case studies — pulled from content/work/ markdown files
const { data: featuredWork } = await useAsyncData('featured-work', () =>
  queryContent('work')
    .where({ featured: true })
    .sort({ order: 1 })
    .limit(3)
    .find(),
)

// Latest blog posts
const { data: latestPosts } = await useAsyncData('latest-posts', () =>
  queryContent('blog')
    .sort({ date: -1 })
    .limit(3)
    .find(),
)

// Services data
const services = [
  {
    title: 'New app build',
    icon: 'rocket' as const,
    description:
      'Architecture, component library, auth, routing, state management, CI/CD — from blank repo to production-ready app.',
    features: [
      'Full project setup and architecture',
      'Component library foundation',
      'Auth, routing, and state management',
      'CI pipeline and deployment',
      'Handoff documentation',
    ],
  },
  {
    title: 'Codebase rescue & migration',
    icon: 'arrows' as const,
    description:
      'Audit your existing frontend, plan the migration path, and execute it without breaking production or losing data.',
    features: [
      'Codebase audit and migration plan',
      'Incremental migration strategy',
      'Zero-downtime execution',
      'Production error resolution',
      'Team knowledge transfer',
    ],
  },
  {
    title: 'Embedded frontend developer',
    icon: 'code' as const,
    description:
      'Join your team for 2–6 months. Feature development, code reviews, mentoring, and architecture decisions across any stack.',
    features: [
      'Ramp up in under 2 weeks',
      'Vue, React, or Angular',
      'Code reviews and mentoring',
      'Architecture decisions',
      'Structured handoff at end',
    ],
  },
]

// Testimonials — anonymized from real performance reviews
const testimonials = [
  {
    quote:
      'Excellent troubleshooting skills and no interference was required. This shows maturity and ownership quality that is rare at this experience level.',
    author: 'Engineering Manager',
    role: 'Direct Manager, 2024 Review',
  },
  {
    quote:
      'Quickly understood the domain and delivered from the first week. Hands-on ownership has elevated significantly — works independently on complex problems.',
    author: 'Department Head',
    role: 'Skip-level Review, 2025',
  },
  {
    quote:
      'Transitioned across three major frameworks within six months while keeping code quality consistent. Very quickly understood requirements and delivered without much guidance.',
    author: 'Technical Lead',
    role: 'Peer Review, 2024',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <AppHero />

    <!-- Trust bar -->
    <TrustBar />

    <!-- Featured work -->
    <section class="section-padding">
      <div class="container-content">
        <div class="flex items-end justify-between">
          <div>
            <h2 class="text-display-sm text-ink-900">Selected work</h2>
            <p class="mt-2 text-body text-ink-500">
              Production projects I've architected, built, and shipped.
            </p>
          </div>
          <NuxtLink
            to="/work"
            class="hidden text-small font-medium text-accent-600 transition-colors hover:text-accent-700 md:block"
          >
            View all work →
          </NuxtLink>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

        <div class="mt-6 text-center md:hidden">
          <NuxtLink to="/work" class="text-small font-medium text-accent-600">
            View all work →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section class="section-padding border-t border-ink-100 bg-ink-50/30">
      <div class="container-content">
        <div class="max-w-xl">
          <h2 class="text-display-sm text-ink-900">How I can help</h2>
          <p class="mt-2 text-body text-ink-500">
            Three ways to work together, depending on what your team needs right now.
          </p>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-3">
          <ServiceCard
            v-for="service in services"
            :key="service.title"
            :title="service.title"
            :description="service.description"
            :icon="service.icon"
            :features="service.features"
          />
        </div>

        <div class="mt-8 text-center">
          <NuxtLink
            to="/services"
            class="text-small font-medium text-accent-600 transition-colors hover:text-accent-700"
          >
            Learn more about working together →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section-padding border-t border-ink-100">
      <div class="container-content">
        <h2 class="text-display-sm text-ink-900">What people say</h2>
        <p class="mt-2 text-body text-ink-500">
          From performance reviews and team feedback over 4+ years.
        </p>

        <div class="mt-8 grid gap-5 md:grid-cols-3">
          <TestimonialCard
            v-for="testimonial in testimonials"
            :key="testimonial.quote"
            :quote="testimonial.quote"
            :author="testimonial.author"
            :role="testimonial.role"
          />
        </div>
      </div>
    </section>

    <!-- Latest articles -->
    <section class="section-padding border-t border-ink-100 bg-ink-50/30">
      <div class="container-content">
        <div class="flex items-end justify-between">
          <div>
            <h2 class="text-display-sm text-ink-900">Latest articles</h2>
            <p class="mt-2 text-body text-ink-500">
              Technical deep-dives, migration guides, and architecture patterns.
            </p>
          </div>
          <NuxtLink
            to="/blog"
            class="hidden text-small font-medium text-accent-600 transition-colors hover:text-accent-700 md:block"
          >
            Read the blog →
          </NuxtLink>
        </div>

        <div class="mt-8 grid gap-5 md:grid-cols-3">
          <BlogCard
            v-for="post in latestPosts"
            :key="post._path"
            :title="post.title"
            :description="post.description"
            :slug="post._path?.replace('/blog/', '') || ''"
            :date="post.date"
            :tags="post.tags"
            :reading-time="post.readingTime"
          />
        </div>

        <div class="mt-6 text-center md:hidden">
          <NuxtLink to="/blog" class="text-small font-medium text-accent-600">
            Read the blog →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <CtaSection />
  </div>
</template>
