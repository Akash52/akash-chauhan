<script setup lang="ts">
import { profile } from '~/data/profile'
import { services } from '~/data/services'

useSeo({
  title: 'Services — Akash Chauhan',
  description:
    'Vue and Nuxt migrations, features and bug fixing in existing Vue, React and Angular apps, and MSAL or OAuth integration.',
  path: '/services',
})
</script>

<template>
  <div>
    <section class="section-padding">
      <div class="container-content">
        <h1 class="font-serif text-display text-ink-950">Services</h1>
        <p class="mt-4 max-w-prose text-lg text-ink-600">
          Three things teams hire me for. Each one links to work you can read before deciding.
        </p>
      </div>
    </section>

    <!--
      Laid out as numbered document sections rather than three identical
      icon-in-a-circle cards, which is the format that made the old page read
      like a template.
    -->
    <section class="border-t border-ink-100">
      <div class="container-content">
        <article
          v-for="(service, index) in services"
          :key="service.slug"
          :id="service.slug"
          class="grid gap-x-10 gap-y-6 border-b border-ink-100 py-14 md:grid-cols-3"
        >
          <div class="md:col-span-1">
            <span class="font-mono text-caption text-ink-400">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <h2 class="mt-2 font-serif text-heading text-ink-900">{{ service.title }}</h2>
          </div>

          <div class="md:col-span-2">
            <p class="text-body font-medium text-ink-800">{{ service.forWhom }}</p>

            <div class="mt-4 space-y-3">
              <p v-for="para in service.body" :key="para" class="max-w-prose text-body text-ink-600">
                {{ para }}
              </p>
            </div>

            <h3 class="mt-7 text-caption font-medium uppercase tracking-wider text-ink-400">
              What you get
            </h3>
            <ul class="mt-3 space-y-2">
              <li
                v-for="item in service.deliverables"
                :key="item"
                class="flex gap-2.5 text-small text-ink-600"
              >
                <span class="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-ink-300" aria-hidden="true" />
                {{ item }}
              </li>
            </ul>

            <h3 class="mt-7 text-caption font-medium uppercase tracking-wider text-ink-400">
              Evidence
            </h3>
            <ul class="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              <li v-for="link in service.evidence" :key="link.href">
                <component
                  :is="link.external ? 'a' : resolveComponent('NuxtLink')"
                  v-bind="
                    link.external
                      ? { href: link.href, target: '_blank', rel: 'noopener' }
                      : { to: link.href }
                  "
                  class="inline-flex min-h-[44px] items-center gap-1 text-small font-medium text-accent-600 hover:underline"
                >
                  {{ link.label }}
                  <span aria-hidden="true">&rarr;</span>
                </component>
              </li>
            </ul>
          </div>
        </article>
      </div>
    </section>

    <!-- How I work -->
    <section class="section-padding bg-ink-50/40">
      <div class="container-content">
        <h2 class="font-serif text-display-sm text-ink-900">How I work</h2>

        <div class="mt-8 grid max-w-4xl gap-x-10 gap-y-7 md:grid-cols-2">
          <div>
            <h3 class="text-subheading text-ink-900">Where I am</h3>
            <p class="mt-1.5 text-small text-ink-600">
              {{ profile.location }}, {{ profile.timezone }}.
            </p>
          </div>

          <div>
            <h3 class="text-subheading text-ink-900">Estimates</h3>
            <p class="mt-1.5 text-small text-ink-600">
              I read the codebase first, then send scope and milestones in writing. If I am not the
              right person for the job, I will say so on the first call.
            </p>
          </div>

          <div>
            <h3 class="text-subheading text-ink-900">While the work runs</h3>
            <p class="mt-1.5 text-small text-ink-600">
              Work lands in small reviewable pieces rather than one large drop at the end, so you
              can change direction without losing a month.
            </p>
          </div>

          <div>
            <h3 class="text-subheading text-ink-900">When it ends</h3>
            <p class="mt-1.5 text-small text-ink-600">
              Handover notes covering how things work and where the awkward parts are. Written for
              whoever maintains it next.
            </p>
          </div>
        </div>
      </div>
    </section>

    <CtaSection />
  </div>
</template>
