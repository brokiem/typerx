/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffffff',
        'secondary': '#e5e7eb',
        'tertiary': '#d1d5db',
        'dark-primary': '#111111',
        'dark-secondary': '#1e1e1e',
        'dark-tertiary': '#2e2e2e',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
