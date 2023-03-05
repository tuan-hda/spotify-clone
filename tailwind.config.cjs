/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "s-black": {
          1: "#191414",
        },
        "s-green": {
          1: "#1ED760",
          2: "#1ED760",
          3: "#169C46",
        },
        "s-gray": {
          1: "#b2b2b2",
          2: "#282828",
        },
      },
    },
  },
  plugins: [],
}
