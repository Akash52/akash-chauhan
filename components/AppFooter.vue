<script setup lang="ts">
const currentYear = new Date().getFullYear()

const navLinks = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/Akash52', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/akash-chauhan', icon: 'linkedin' },
  { label: 'Medium', href: 'https://medium.com/@19it197.akashbhai.chauhan', icon: 'medium' },
]
</script>

<template>
  <footer class="border-t border-ink-100 bg-ink-50/50">
    <div class="container-content py-12">
      <div class="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <!-- Left — name + tagline -->
        <div class="max-w-xs">
          <NuxtLink to="/" class="text-subheading text-ink-900">Akash Chauhan</NuxtLink>
          <p class="mt-2 text-small text-ink-400">
            Senior frontend developer building fast, reliable web apps across Vue, React, and Angular.
          </p>
        </div>

        <!-- Center — nav links -->
        <nav class="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer navigation">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-small text-ink-500 transition-colors hover:text-ink-900"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Right — social -->
        <div class="flex gap-4">
          <a
            v-for="link in socialLinks"
            :key="link.href"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
            :aria-label="link.label"
          >
            <!-- GitHub -->
            <svg v-if="link.icon === 'github'" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <!-- LinkedIn -->
            <svg v-if="link.icon === 'linkedin'" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <!-- Medium -->
            <svg v-if="link.icon === 'medium'" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-10 border-t border-ink-200 pt-6 text-caption text-ink-400">
        &copy; {{ currentYear }} Akash Chauhan. Built with Nuxt 3.
      </div>
    </div>
  </footer>
</template>
