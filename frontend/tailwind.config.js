/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: '#4caf50',
          hover: '#388e3c',
        },
        secondary: {
          DEFAULT: '#ebffe8',
          hover: '#d0fdd3',
        },
      },
    },
  },
  plugins: [],
}
