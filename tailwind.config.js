/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fefdf8',
          100: '#fdf9ed',
          200: '#faf0d2',
          300: '#f6e2a7',
          400: '#f0cb6a',
          500: '#eab537',
          600: '#d99d1c',
          700: '#b57f18',
          800: '#92651a',
          900: '#78541a',
          950: '#442c0a',
        },
        secondary: {
          50: '#f8f6f3',
          100: '#efeae1',
          200: '#ddd2c2',
          300: '#c7b69e',
          400: '#b19a7a',
          500: '#a18862',
          600: '#947856',
          700: '#7b6248',
          800: '#655140',
          900: '#524335',
          950: '#2b221b',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};