/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          'dark-blue-gray': '#1e293b',
          'light-gray': '#e2e8f0',
          'card-bg': '#334155',
          'header-footer': '#0f172a',
        },
        animation: {
          'fade-in': 'fadeIn 1s ease-in-out',
          'fade-in-down': 'fadeInDown 1s ease-in-out',
          'subtle': 'subtlePulse 2s infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          fadeInDown: {
            '0%': { opacity: '0', transform: 'translateY(-20px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          subtlePulse: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
          },
        },
      },
    },
    plugins: [],
  };