/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfaf4',
          100: '#faf3e0',
          200: '#f5e6c0',
          DEFAULT: '#faf3e0',
        },
        indigo: {
          DEFAULT: '#2e0f6e',
          deep: '#1a0840',
          mid: '#4b1fa8',
          light: '#7c4dcc',
        },
        terracotta: {
          DEFAULT: '#c2714f',
          dark: '#a0563a',
          light: '#d98b6b',
        },
        gold: {
          DEFAULT: '#c9a84c',
          light: '#dfc27d',
          dark: '#a07830',
        },
        ink: {
          DEFAULT: '#1a1a2e',
          light: '#2d2d44',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
