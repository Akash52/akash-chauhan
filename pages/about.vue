<script setup lang="ts">
useSeo({
  title: 'About — Akash Chauhan',
  description:
    'Senior frontend developer with 4+ years shipping production apps across Vue, React, and Angular. Based in Ahmedabad, India.',
  path: '/about',
})

const techStack = [
  {
    category: 'Core',
    items: ['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3'],
  },
  {
    category: 'Frameworks',
    items: ['Vue 3', 'Nuxt 3', 'React', 'Angular'],
  },
  {
    category: 'State & data',
    items: ['Pinia', 'TanStack Query', 'Redux Toolkit', 'NgRx', 'RxJS', 'Vuex'],
  },
  {
    category: 'UI & styling',
    items: ['Tailwind CSS', 'Ant Design Vue', 'Vuetify', 'NG-Zorro', 'Material-UI'],
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'SignalR', 'MongoDB', 'MySQL'],
  },
  {
    category: 'Tooling',
    items: ['Git', 'Vite', 'Turborepo', 'Jest', 'Vue Test Utils', 'PWA'],
  },
]

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
]
</script>

<template>
  <div>
    <!-- Story -->
    <section class="section-padding">
      <div class="container-content">
        <div class="grid gap-12 md:grid-cols-5">
          <div class="md:col-span-3">
            <h1 class="text-display text-ink-950">About me</h1>

            <div class="mt-6 space-y-4 text-body leading-relaxed text-ink-600">
              <p>
                I'm a senior frontend developer based in Ahmedabad, India. For the past 4+ years I've been building production software at
                <strong class="text-ink-800">Simform Solutions</strong> — shipping 6 applications
                across Vue, React, and Angular, mentoring junior engineers, and writing technical
                content that's been adopted across the engineering department.
              </p>
              <p>
                I started coding during my diploma, built 30+ JavaScript projects on GitHub before
                landing my first job, and haven't stopped since. I'm the kind of developer who
                traces a race condition to its root cause instead of patching the symptom, writes
                handover documentation that the next team actually uses, and picks up a new framework
                in two weeks because I understand the patterns underneath.
              </p>
              <p>
                Now I'm transitioning to freelance because I want to pick the problems I solve.
                I'm especially drawn to codebase migrations, greenfield architecture, and teams that
                need a senior developer who can ship independently from day one.
              </p>
              <p>
                When I'm not coding, I write technical articles — on everything from design patterns
                to production migration guides — and maintain an open-source AI prompt library
                that's used by developers across my department.
              </p>
            </div>
          </div>

          <!-- Quick facts sidebar -->
          <div class="md:col-span-2">
            <div class="rounded-card border border-ink-100 bg-ink-50/50 p-6">
              <h2 class="text-subheading text-ink-900">Quick facts</h2>
              <dl class="mt-4 space-y-3">
                <div>
                  <dt class="text-caption font-medium text-ink-400">Location</dt>
                  <dd class="text-small text-ink-700">Ahmedabad, Gujarat, India</dd>
                </div>
                <div>
                  <dt class="text-caption font-medium text-ink-400">Timezone</dt>
                  <dd class="text-small text-ink-700">IST (UTC+5:30)</dd>
                </div>
                <div>
                  <dt class="text-caption font-medium text-ink-400">Experience</dt>
                  <dd class="text-small text-ink-700">4+ years in production</dd>
                </div>
                <div>
                  <dt class="text-caption font-medium text-ink-400">Education</dt>
                  <dd class="text-small text-ink-700">B.E. Information Technology (CGPA 8.64)</dd>
                </div>
                <div>
                  <dt class="text-caption font-medium text-ink-400">Languages</dt>
                  <dd class="text-small text-ink-700">English, Hindi, Gujarati</dd>
                </div>
                <div>
                  <dt class="text-caption font-medium text-ink-400">Availability</dt>
                  <dd class="text-small font-medium text-emerald-600">Open for projects</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech stack -->
    <section class="section-padding border-t border-ink-100 bg-ink-50/30">
      <div class="container-content">
        <h2 class="text-display-sm text-ink-900">Tech stack</h2>
        <p class="mt-2 text-body text-ink-500">
          Technologies I've used in production — not just tutorials.
        </p>

        <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="group in techStack" :key="group.category">
            <h3 class="text-caption font-medium uppercase tracking-wider text-ink-400">
              {{ group.category }}
            </h3>
            <div class="mt-3 flex flex-wrap gap-2">
              <span v-for="item in group.items" :key="item" class="tag tag-default">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section-padding border-t border-ink-100">
      <div class="container-content">
        <h2 class="text-display-sm text-ink-900">What colleagues say</h2>
        <div class="mt-8 grid gap-5 md:grid-cols-2">
          <TestimonialCard
            v-for="t in testimonials"
            :key="t.quote"
            :quote="t.quote"
            :author="t.author"
            :role="t.role"
          />
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
