// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this path according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "rgb(176,36,23)",
          dark: "#3a0a0a",
        },
      },
    },
  },
  plugins: [],
};
