/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        yellow: {
          DEFAULT: '#FFD700',
          dark:    '#e6b800',
          light:   '#fffbea',
        },
        night: {
          DEFAULT: '#0a0a0a',
          2:       '#111111',
          3:       '#1a1a1a',
          4:       '#222222',
        },
      },
    },
  },
  plugins: [],
}