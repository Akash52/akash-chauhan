import type { Config } from 'tailwindcss'

/**
 * Colours resolve through CSS custom properties defined in assets/css/main.css,
 * which is what makes dark mode work without a single dark: variant in the
 * components. The <alpha-value> placeholder keeps opacity modifiers working
 * (bg-ink-50/30, border-ink-100/60, …).
 */
const ink = (shade: string) => `rgb(var(--ink-${shade}) / <alpha-value>)`
const accent = (shade: string) => `rgb(var(--accent-${shade}) / <alpha-value>)`
const signal = (shade: string) => `rgb(var(--signal-${shade}) / <alpha-value>)`

export default {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.ts',
    './content/**/*.md',
    './data/**/*.ts',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          0: ink('0'),
          50: ink('50'),
          100: ink('100'),
          200: ink('200'),
          300: ink('300'),
          400: ink('400'),
          500: ink('500'),
          600: ink('600'),
          700: ink('700'),
          800: ink('800'),
          900: ink('900'),
          950: ink('950'),
        },
        accent: {
          50: accent('50'),
          100: accent('100'),
          400: accent('400'),
          500: accent('500'),
          600: accent('600'),
          700: accent('700'),
        },
        signal: {
          50: signal('50'),
          100: signal('100'),
          600: signal('600'),
        },
      },
      maxWidth: {
        content: '1120px',
        prose: '720px',
      },
      spacing: {
        section: '6rem',
        'section-sm': '3.5rem',
      },
      fontSize: {
        display: [
          '3rem',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        'display-sm': [
          '2.25rem',
          { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' },
        ],
        heading: ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        subheading: ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.7' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 1px 3px rgb(0 0 0 / 0.04), 0 1px 2px rgb(0 0 0 / 0.02)',
        'card-hover': '0 4px 12px rgb(0 0 0 / 0.06), 0 1px 3px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [],
} satisfies Config
