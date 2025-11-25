/** @type {import('tailwindcss').Config} */
export default {
    // This is the CRITICAL part. It tells Tailwind where to look for utility classes.
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Scan all files in the src folder
    ],
    theme: {
      extend: {
        // We set 'Inter' as the default font
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }