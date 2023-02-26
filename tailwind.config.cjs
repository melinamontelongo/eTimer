/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 1.5s linear infinite',
      }
    },
    fontFamily:{
      pixel: ["Perfect-DOS", "monospace"],
      venice: ["Venice", "monospace"],
      senior: ["PC-Senior", "monospace"]
    }
  },
  plugins: [],
}
