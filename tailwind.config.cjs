/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "3xl": ["2rem", "2rem"],
      },
      colors: {
        "s-black": {
          1: "#191414",
          2: "#0D1118",
          3: "#121212",
        },
        "s-green": {
          1: "#1ED760",
          2: "#1ED760",
          3: "#169C46",
        },
        "s-gray": {
          1: "#b2b2b2",
          2: "#282828",
          3: "#6A6A6A",
          4: "#323232",
        },
        "s-blue": {
          1: "#1A2334",
          2: "#2E3D5A",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  corePlugins: {
    // textOpacity: false,
    // backgroundOpacity: false,
    // borderOpacity: false,
    // divideOpacity: false,
    // placeholderOpacity: false,
    // ringOpacity: false,
  },
}
