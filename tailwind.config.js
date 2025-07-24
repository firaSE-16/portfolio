/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        slideUp: 'slideUp 8s linear infinite',
      },
      keyframes: {
        slideUp: {
          '0%, 20%': { transform: 'translateY(0)' },
          '25%, 45%': { transform: 'translateY(-1.5rem)' },
          '50%, 70%': { transform: 'translateY(-3rem)' },
          '75%, 95%': { transform: 'translateY(-4.5rem)' },
          '100%': { transform: 'translateY(-6rem)' },
        },
      },
    },
  },
  plugins: [],
}