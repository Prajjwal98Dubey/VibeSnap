/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderRadius:{
        '4xl':'26px',
        'bottom-sheet':'63px'
      }
    },
  },
  plugins: [],
}

