/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff5a3c",
        secondary: "#f05438",
        light: "#f9edeb",
      },
    },
  },
  plugins: [],
};
