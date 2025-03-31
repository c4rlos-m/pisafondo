/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          'apple-gray': '#1C2526',
          'apple-light': '#F5F5F7',
          'apple-dark': '#0A0A0A',
          'apple-accent': '#0071E3',
        },
        fontFamily: {
          sans: ['SF Pro Display', 'Helvetica', 'Arial', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };