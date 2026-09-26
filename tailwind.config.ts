import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.ts',
    './content/**/*.md',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Warm neutral base — not cold gray, not warm cream
        ink: {
          950: '#0f0f0e',
          900: '#1a1a18',
          800: '#2c2c28',
          700: '#3d3d38',
          600: '#52514b',
          500: '#6b6a63',
          400: '#8a8880',
          300: '#a9a79f',
          200: '#d0cec6',
          100: '#e8e6df',
          50: '#f5f4f0',
        },
        // Indigo accent — enough to stand out, not so much it screams
        accent: {
          700: '#3730a3',
          600: '#4f46e5',
          500: '#6366f1',
          400: '#818cf8',
          100: '#e0e7ff',
          50: '#eef2ff',
        },
        // Subtle success/warning for case study tags
        emerald: {
          600: '#059669',
          100: '#d1fae5',
          50: '#ecfdf5',
        },
        amber: {
          600: '#d97706',
          100: '#fef3c7',
          50: '#fffbeb',
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
        // Tighter type scale — not too many sizes
        display: ['3rem', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-sm': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        heading: ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.015em', fontWeight: '600' }],
        subheading: ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.7' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
} satisfies Config
