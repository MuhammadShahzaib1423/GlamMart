/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF7F2',
        charcoal: '#1C1917',
        sage: {
          50: '#F2F6F3',
          100: '#E7EFE9',
          200: '#D3E2D8',
          300: '#B3CBBB',
          600: '#4D7C5F',
          700: '#3A6148',
        },
        brand: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
        },
        amberish: '#B45309',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(28, 25, 23, 0.06)',
        lift: '0 16px 40px rgba(28, 25, 23, 0.10)',
      },
    },
  },
  plugins: [],
}
