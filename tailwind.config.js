/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:      'var(--c-bg)',
        bg2:     'var(--c-bg2)',
        surf:    'var(--c-surf)',
        text:    'var(--c-text)',
        text2:   'var(--c-text2)',
        text3:   'var(--c-text3)',
        accent:  'var(--c-accent)',
        'accent-h': 'var(--c-accent-h)',
        blue:    'var(--c-blue)',
        'blue-sub': 'var(--c-blue-sub)',
        border:  'var(--c-border)',
        border2: 'var(--c-border2)',
      },
      fontFamily: {
        display: ['Bricolage Grotesque', 'system-ui', 'sans-serif'],
        body:    ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        sm: '3px',
        md: '6px',
        lg: '10px',
      },
    },
  },
  plugins: [],
}
