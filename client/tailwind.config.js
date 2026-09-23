/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f7f5',
          100: '#e1ede8',
          200: '#c5dcd3',
          300: '#9ec3b7',
          400: '#72a396',
          500: '#52877a',
          600: '#3e6c61',
          700: '#33564f',
          800: '#1b3b33',
          900: '#14342b',
          950: '#0a1d18',
        },
        gold: {
          50: '#faf8f5',
          100: '#f4efe8',
          200: '#e8dcce',
          300: '#d7c2aa',
          400: '#c5a880',
          500: '#b89264',
          600: '#a67d53',
          700: '#876143',
          800: '#6e4f3a',
          900: '#5c4233',
        },
        cream: {
          50: '#ffffff',
          100: '#fbfbf9',
          200: '#f7f7f4',
          300: '#f2f1ec',
          400: '#e5e4dc',
          500: '#d5d3c8',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(20, 52, 43, 0.08)',
        'luxury-hover': '0 20px 40px -15px rgba(20, 52, 43, 0.16)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
