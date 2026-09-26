<script setup lang="ts">
useSeo({
  title: 'Contact — Akash Chauhan',
  description:
    'Get in touch about your project. I typically respond within 24 hours.',
  path: '/contact',
})

const form = reactive({
  name: '',
  email: '',
  projectType: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

async function handleSubmit() {
  isSubmitting.value = true

  try {
    // Formspree endpoint — replace with your actual form ID
    await $fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: form,
      headers: { Accept: 'application/json' },
    })
    isSubmitted.value = true
  } catch {
    alert('Something went wrong. Please email me directly at ac8572611@gmail.com')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div>
    <section class="section-padding">
      <div class="container-content">
        <div class="grid gap-12 md:grid-cols-5">
          <!-- Form -->
          <div class="md:col-span-3">
            <h1 class="text-display text-ink-950">Let's talk</h1>
            <p class="mt-4 text-lg text-ink-500">
              Tell me a bit about your project. I'll get back to you within 24 hours.
            </p>

            <!-- Success state -->
            <div v-if="isSubmitted" class="mt-8 rounded-card border border-emerald-100 bg-emerald-50 p-8 text-center">
              <div class="text-3xl">✓</div>
              <h2 class="mt-3 text-heading text-ink-900">Message sent</h2>
              <p class="mt-2 text-body text-ink-500">
                Thanks for reaching out. I'll review your message and respond within 24 hours.
              </p>
            </div>

            <!-- Form -->
            <div v-else class="mt-8 space-y-5">
              <div>
                <label for="name" class="mb-1.5 block text-small font-medium text-ink-700">Name</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-body text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label for="email" class="mb-1.5 block text-small font-medium text-ink-700">Email</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-body text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label for="project-type" class="mb-1.5 block text-small font-medium text-ink-700">What do you need?</label>
                <select
                  id="project-type"
                  v-model="form.projectType"
                  class="w-full rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-body text-ink-900 outline-none transition-colors focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                >
                  <option value="" disabled>Select a service</option>
                  <option value="new-build">New app build</option>
                  <option value="rescue-migration">Codebase rescue & migration</option>
                  <option value="embedded">Embedded frontend developer</option>
                  <option value="other">Something else</option>
                </select>
              </div>

              <div>
                <label for="message" class="mb-1.5 block text-small font-medium text-ink-700">Tell me about your project</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full resize-y rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-body text-ink-900 outline-none transition-colors placeholder:text-ink-300 focus:border-accent-400 focus:ring-2 focus:ring-accent-100"
                  placeholder="What are you building? What's the timeline? Any tech stack preferences?"
                />
              </div>

              <button
                :disabled="isSubmitting"
                class="rounded-lg bg-ink-900 px-6 py-3 text-body font-medium text-white transition-all hover:bg-ink-800 disabled:opacity-50"
                @click="handleSubmit"
              >
                {{ isSubmitting ? 'Sending...' : 'Send message' }}
              </button>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="md:col-span-2">
            <div class="rounded-card border border-ink-100 bg-ink-50/50 p-6">
              <h2 class="text-subheading text-ink-900">Other ways to reach me</h2>

              <div class="mt-5 space-y-4">
                <div>
                  <div class="text-caption font-medium text-ink-400">Email</div>
                  <a href="mailto:ac8572611@gmail.com" class="text-small text-accent-600 hover:underline">
                    ac8572611@gmail.com
                  </a>
                </div>
                <div>
                  <div class="text-caption font-medium text-ink-400">LinkedIn</div>
                  <a href="https://linkedin.com/in/akash-chauhan" target="_blank" rel="noopener" class="text-small text-accent-600 hover:underline">
                    linkedin.com/in/akash-chauhan
                  </a>
                </div>
                <div>
                  <div class="text-caption font-medium text-ink-400">GitHub</div>
                  <a href="https://github.com/Akash52" target="_blank" rel="noopener" class="text-small text-accent-600 hover:underline">
                    github.com/Akash52
                  </a>
                </div>
              </div>
            </div>

            <div class="mt-5 rounded-card border border-emerald-100 bg-emerald-50 p-6">
              <div class="flex items-center gap-2">
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-600" aria-hidden="true" />
                <span class="text-small font-medium text-emerald-600">Currently available</span>
              </div>
              <p class="mt-2 text-small text-ink-500">
                Taking on new projects starting September 2026. Typical response time: under 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
