<script setup lang="ts">
const stats = [
  { value: '4+', label: 'Years shipping production code' },
  { value: '6', label: 'Production apps delivered' },
  { value: '3', label: 'Frameworks in production' },
  { value: '10+', label: 'Technical articles published' },
]
</script>

<template>
  <section class="border-b border-ink-100 bg-ink-50/50 py-10">
    <div class="container-content">
      <div class="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        <div v-for="stat in stats" :key="stat.label" class="text-center md:text-left">
          <div class="text-3xl font-bold tracking-tight text-ink-900">
            {{ stat.value }}
          </div>
          <div class="mt-1 text-small text-ink-400">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
