/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      colors:{
        'dark-blue': '#0C85B0',
        'light-blue': '#59B2D1',
        'light-blue-2': '#64C8EC',
        'dark-blue-2': '#008EB3',
        'def-grey': '#2F2F2F',
      }
    },
    fontFamily: {
      mono: ['JetBrains Mono', 'monospace'],
    },
    scale: {
      '-1': '-1', 
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
