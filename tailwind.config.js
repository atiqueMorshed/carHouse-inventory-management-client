module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primaryBlue: {
          100: '#dff8fe',
          200: '#c0f0fd',
          300: '#a0e9fd',
          400: '#81e1fc',
          500: '#61dafb',
          600: '#4eaec9',
          700: '#3a8397',
          800: '#275764',
          900: '#132c32',
        },
        darkGray: {
          100: '#d2d3d4',
          200: '#a6a7aa',
          300: '#797b7f',
          400: '#4d4f55',
          500: '#20232a',
          600: '#1a1c22',
          700: '#131519',
          800: '#0d0e11',
          900: '#060708',
        },
      },
    },
  },
  plugins: [],
};
