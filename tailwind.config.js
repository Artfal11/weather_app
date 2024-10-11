/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
      container: {
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1580px',
        },
      },
    },
  },
  plugins: [],
}
