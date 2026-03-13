/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      klein: ['Klein', 'sans-serif'],
      afacad: ['Afacad', 'sans-serif'],
    },
  },
  plugins: []
};

