/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0b0f19', // Premium dark blue-gray
        darkCard: '#151c2c', // Sleek cards
        accent: {
          light: '#4ade80', // emerald-400
          DEFAULT: '#10b981', // emerald-500
          dark: '#059669', // emerald-600
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
