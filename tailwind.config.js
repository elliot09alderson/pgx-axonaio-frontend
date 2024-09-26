/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      firstColor: "var(--primary-color)",
      secondColor: "var(--secondary-color)",
      third: "var(--ternary-color)",
      backgroundColor: "var(--background-color)",
      primary: " bg-stone-300",
      colors: {
        primary: " bg-stone-300",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
