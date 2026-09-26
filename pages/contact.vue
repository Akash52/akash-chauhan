<script setup lang="ts">
import { profile } from '~/data/profile'

useSeo({
  title: 'Contact — Akash Chauhan',
  description: 'Get in touch about frontend work — Vue and Nuxt migrations, features and fixes in existing apps, or auth integration.',
  path: '/contact',
})

/**
 * No form here on purpose.
 *
 * The previous page posted to https://formspree.io/f/YOUR_FORM_ID — the
 * placeholder was never replaced, so every submission failed and the visitor
 * got a browser alert() telling them to email instead. A mailto link that works
 * beats a form that does not. Wire a real endpoint in and this can come back.
 */
const subject = encodeURIComponent('Project enquiry')
const body = encodeURIComponent(
  [
    'Hi Akash,',
    '',
    'What we are building:',
    'What we need help with:',
    'Rough timeline:',
    '',
  ].join('\n'),
)

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}?subject=${subject}&body=${body}`,
    note: 'The most reliable way to reach me.',
    external: false,
  },
  profile.links.linkedin
    ? {
        label: 'LinkedIn',
        value: profile.links.linkedin.replace('https://', ''),
        href: profile.links.linkedin,
        note: 'Also fine for a first message.',
        external: true,
      }
    : null,
  {
    label: 'GitHub',
    value: profile.links.github.replace('https://', ''),
    href: profile.links.github,
    note: 'The code, including the source of this site.',
    external: true,
  },
  {
    label: 'Medium',
    value: 'medium.com/@19it197.akashbhai.chauhan',
    href: profile.links.medium,
    note: 'Everything I have written.',
    external: true,
  },
].filter(Boolean) as {
  label: string
  value: string
  href: string
  note: string
  external: boolean
}[]
</script>

<template>
  <div>
    <section class="section-padding">
      <div class="container-content">
        <div class="max-w-prose">
          <h1 class="font-serif text-display text-ink-950">Contact</h1>
          <p class="mt-4 text-lg text-ink-600">
            Tell me what you are building and what is in the way. If I am not the right person for
            it, I will say so and point you somewhere better.
          </p>
          <p v-if="profile.responseTime" class="mt-3 text-body text-ink-500">
            {{ profile.responseTime }}
          </p>
        </div>

        <dl class="mt-12 max-w-2xl divide-y divide-ink-100 border-y border-ink-100">
          <div
            v-for="channel in channels"
            :key="channel.label"
            class="grid gap-1 py-5 sm:grid-cols-4 sm:gap-4"
          >
            <dt class="text-caption font-medium uppercase tracking-wider text-ink-400">
              {{ channel.label }}
            </dt>
            <dd class="sm:col-span-3">
              <a
                :href="channel.href"
                :target="channel.external ? '_blank' : undefined"
                :rel="channel.external ? 'noopener' : undefined"
                class="text-body font-medium text-accent-600 hover:underline"
              >
                {{ channel.value }}
              </a>
              <p class="mt-0.5 text-small text-ink-500">{{ channel.note }}</p>
            </dd>
          </div>
        </dl>

        <div v-if="profile.availability" class="mt-10 max-w-2xl rounded-card border border-signal-100 bg-signal-50 p-5">
          <p class="text-small font-medium text-signal-600">
            Taking on work: {{ profile.availability.hoursPerWeek }} hours a week from
            {{ profile.availability.startingFrom }}, overlapping
            {{ profile.availability.overlap }}.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
