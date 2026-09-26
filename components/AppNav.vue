<script setup lang="ts">
const route = useRoute()
const isOpen = ref(false)

const links = [
  { label: 'Work', to: '/work' },
  { label: 'Services', to: '/services' },
  { label: 'Writing', to: '/writing' },
  { label: 'About', to: '/about' },
]

function isActive(to: string) {
  return route.path === to || route.path.startsWith(to + '/')
}

// Close mobile menu on route change
watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-ink-100 bg-ink-0/90 backdrop-blur-sm">
    <nav class="container-content flex h-16 items-center justify-between">
      <!-- Logo / Name -->
      <NuxtLink to="/" class="text-subheading text-ink-900 transition-colors hover:text-accent-600">
        Akash Chauhan
      </NuxtLink>

      <!-- Desktop links -->
      <div class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-small transition-colors"
          :class="isActive(link.to) ? 'text-accent-600 font-medium' : 'text-ink-500 hover:text-ink-900'"
        >
          {{ link.label }}
        </NuxtLink>
        <NuxtLink
          to="/contact"
          class="rounded-lg bg-ink-900 px-4 py-2 text-small font-medium text-ink-0 transition-all hover:bg-ink-800"
        >
          Get in touch
        </NuxtLink>
      </div>

      <!-- Mobile hamburger -->
      <button
        class="flex h-10 w-10 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-ink-50 md:hidden"
        aria-label="Toggle menu"
        @click="isOpen = !isOpen"
      >
        <svg v-if="!isOpen" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isOpen" class="border-t border-ink-100 bg-ink-0 px-6 pb-6 pt-4 md:hidden">
        <div class="flex flex-col gap-1">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-3 py-2.5 text-body transition-colors"
            :class="isActive(link.to) ? 'bg-accent-50 text-accent-600 font-medium' : 'text-ink-600 hover:bg-ink-50'"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="mt-2 rounded-lg bg-ink-900 px-3 py-2.5 text-center text-body font-medium text-ink-0"
          >
            Get in touch
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
