/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        foreground: 'var(--color-text)',
        surface: 'var(--color-surface)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        /* Massive, condensed font for P5/Streetwear headers */
        display: ['"Anton"', '"Impact"', 'sans-serif'], 
        /* Clean utility font for readability */
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        /* Harsh, non-blurred shadows for the graphic/editorial feel */
        'brutal': '6px 6px 0px 0px rgba(9, 9, 11, 1)',
        'brutal-hover': '2px 2px 0px 0px rgba(9, 9, 11, 1)',
      }
    },
  },
  plugins: [],
}