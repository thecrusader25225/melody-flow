/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
      colors: {
        customblue: {
          light: "",
          DEFAULT: "#2a2a47",
          dark: "",
          darker: "",
        },
      },
    },
  },
  plugins: [],
};
