/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [],
  future: {
      hoverOnlyWhenSupported: true, // Removes hover styles on touch devices
  },
};