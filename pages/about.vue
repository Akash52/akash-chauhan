<script setup lang="ts">
import { profile, experienceLabel } from '~/data/profile'

const { total: articleTotal, simformCount } = useArticles()

useSeo({
  title: 'About — Akash Chauhan',
  description: `Frontend engineer with ${experienceLabel()} at Simform Solutions, working across Vue, React and Angular. Based in ${profile.location}.`,
  path: '/about',
})

/**
 * Grouped by where the work happened rather than rated out of five. A bar
 * claiming "Vue 90%" measures nothing a client can check; the case study it
 * links to does.
 */
const toolsByContext = [
  {
    context: 'Vue and Nuxt',
    where: { label: 'Baserow case study', to: '/work/baserow' },
    tools: ['Vue 3', 'Nuxt 3', 'Pinia', 'Vuex', 'TypeScript', 'Vite'],
  },
  {
    context: 'Angular',
    where: { label: 'Analytics dashboard case study', to: '/work/analytics-dashboard' },
    tools: ['Angular', 'RxJS', 'NgRx', 'NG-Zorro', 'SignalR', 'Apache ECharts'],
  },
  {
    context: 'React',
    where: null,
    tools: ['React', 'TanStack Query', 'Redux Toolkit'],
  },
  {
    context: 'Styling and UI',
    where: null,
    tools: ['Tailwind CSS', 'Ant Design Vue', 'Vuetify', 'Material-UI'],
  },
  {
    context: 'Backend and data',
    where: null,
    tools: ['Node.js', 'Express', 'REST', 'GraphQL', 'MongoDB', 'MySQL'],
  },
  {
    context: 'Testing and tooling',
    where: null,
    tools: ['Jest', 'Vue Test Utils', 'Turborepo', 'Git', 'PWA'],
  },
]
</script>

<template>
  <div>
    <section class="section-padding">
      <div class="container-content">
        <div class="grid gap-12 md:grid-cols-5">
          <div class="md:col-span-3">
            <h1 class="font-serif text-display text-ink-950">About</h1>

            <div class="mt-6 space-y-4 text-body leading-relaxed text-ink-600">
              <p>
                I am a frontend engineer in {{ profile.location }}. For the past
                {{ experienceLabel() }} I have been at
                <strong class="font-medium text-ink-900">{{ profile.company }}</strong>, working
                across Vue, React and Angular on
                {{ profile.productionProjects }} production applications.
              </p>
              <p>
                Most of that work has been in codebases I did not write. I have joined projects
                mid-flight, read my way into unfamiliar architectures, and shipped inside someone
                else's conventions. The part I am best at is finding the actual cause of a bug
                rather than the place it surfaces.
              </p>
              <p>
                I am taking on freelance work now because I would rather choose the problems. The
                ones I want are migrations, and older codebases that people have stopped wanting to
                open.
              </p>
              <p>
                I also write — {{ articleTotal }} articles so far, {{ simformCount }} of them in
                Simform Engineering. Writing something up is how I find out whether I actually
                understood it.
              </p>
            </div>
          </div>

          <div class="md:col-span-2">
            <div class="rounded-card border border-ink-100 bg-ink-50/50 p-6">
              <h2 class="text-subheading text-ink-900">Quick facts</h2>
              <dl class="mt-4 space-y-3">
                <div>
                  <dt class="text-caption font-medium text-ink-400">Based in</dt>
                  <dd class="text-small text-ink-700">{{ profile.location }}</dd>
                </div>
                <div>
                  <dt class="text-caption font-medium text-ink-400">Timezone</dt>
                  <dd class="text-small text-ink-700">{{ profile.timezone }}</dd>
                </div>
                <div>
                  <dt class="text-caption font-medium text-ink-400">Experience</dt>
                  <dd class="text-small text-ink-700">
                    {{ experienceLabel() }}, since {{ profile.traineeFrom }}
                  </dd>
                </div>
                <div>
                  <dt class="text-caption font-medium text-ink-400">Current role</dt>
                  <dd class="text-small text-ink-700">
                    {{ profile.role }}, {{ profile.company }}
                  </dd>
                </div>
                <div>
                  <dt class="text-caption font-medium text-ink-400">Languages</dt>
                  <dd class="text-small text-ink-700">English, Hindi, Gujarati</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tools -->
    <section class="section-padding border-t border-ink-100 bg-ink-50/40">
      <div class="container-content">
        <h2 class="font-serif text-display-sm text-ink-900">
          Tools I have shipped production code with
        </h2>
        <p class="mt-2 max-w-prose text-body text-ink-500">
          Grouped by where I used them, not rated out of five.
        </p>

        <div class="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="group in toolsByContext" :key="group.context">
            <h3 class="text-subheading text-ink-900">{{ group.context }}</h3>
            <NuxtLink
              v-if="group.where"
              :to="group.where.to"
              class="inline-flex min-h-[44px] items-center gap-1 text-caption text-accent-600 hover:underline"
            >
              {{ group.where.label }}
              <span aria-hidden="true">&rarr;</span>
            </NuxtLink>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="tool in group.tools" :key="tool" class="tag tag-default">
                {{ tool }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mentoring -->
    <section class="section-padding border-t border-ink-100">
      <div class="container-content max-w-prose">
        <h2 class="font-serif text-display-sm text-ink-900">Sharing what I learn</h2>
        <div class="mt-4 space-y-3 text-body text-ink-600">
          <p>
            I ran a SignalR training session for my department after building a real-time
            notification layer with it, because the next team to touch it should not have to work it
            out from scratch.
          </p>
          <p>
            I also maintain an internal prompt library used by the Vue.js team at
            {{ profile.company }}.
          </p>
        </div>

        <!-- Compact, at the bottom, where it belongs. -->
        <h3 class="mt-10 text-caption font-medium uppercase tracking-wider text-ink-400">
          Education
        </h3>
        <ul class="mt-3 space-y-1.5">
          <li
            v-for="entry in profile.education"
            :key="entry.qualification"
            class="text-small text-ink-500"
          >
            {{ entry.qualification }}, {{ entry.institution }}, {{ entry.location }}
            ({{ entry.from }}–{{ entry.to }}, CGPA {{ entry.cgpa }})
          </li>
        </ul>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
