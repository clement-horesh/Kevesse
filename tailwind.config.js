/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsxx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '340px',
        's': '455px',
        'sm': '640px',  
        'md': '768px',  
        'lg': '1024px',  
        'xl': '1280px',  
        '2xl': '1536px',
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
    },
  },
  variants: {},

  plugins: [],
}
