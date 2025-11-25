/** @type {import('tailwindcss').Config} */
module.exports = {
    // Tells Tailwind where to scan for class names to generate CSS.
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    // Define custom themes, colors, spacing, etc.
    theme: {
      extend: {},
    },
    plugins: [],
  }