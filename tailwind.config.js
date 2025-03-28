/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        moveSlow: 'moveSlow 30s linear infinite',
      },
      keyframes: {
        moveSlow: {
          '0%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-25%, -25%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
    },
  },
  plugins: [],
}