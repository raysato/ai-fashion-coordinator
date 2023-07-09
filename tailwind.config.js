/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js,jsx,ts,tsx}",
    "./pages/**/*.{vue,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light",],
  },
}
