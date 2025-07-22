/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' for automatic based on system preference
  theme: {
    extend: {
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
      // Extend your color palette, if needed
      colors: {
        "dark-bg": "#1f2937", // Example dark background color
        "dark-text": "#d1d5db", // Example light text color for dark mode
      },
    },
  },
  plugins: [],
};

