/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#6B1E2E',
          dark: '#4A1420',
          light: '#8B2E42',
        },
        cream: {
          DEFAULT: '#F9F4EC',
          dark: '#EDE4D6',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E8D48B',
        },
        blush: '#F3E8E4',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        script: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(107, 30, 46, 0.08)',
      },
    },
  },
  plugins: [],
};
