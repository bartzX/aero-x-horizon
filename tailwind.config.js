/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#0071E3',
        'apple-blue-hover': '#0077ED',
        'apple-grey': '#F5F5F7',
        'apple-dark': '#1D1D1F',
        'apple-navy': '#1E3A8A',
        'apple-orange': '#C25E00',
        'apple-card': '#FFFFFF',
        'apple-sub': '#86868B',
      },
      fontFamily: {
        sans: ['"Inter"', '"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"SF Mono"', 'monospace'],
      },
      boxShadow: {
        'apple-card': '2px 8px 32px rgba(0, 0, 0, 0.08)',
        'apple-hover': '4px 12px 40px rgba(0, 0, 0, 0.14)',
      }
    },
  },
  plugins: [],
}
