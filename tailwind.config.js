const windmill = require("@windmill/react-ui/config")
const colors = require("tailwindcss/colors")

module.exports = windmill({
  purge: [
    "./components/**/*.{js, ts, jsx, tsx}",
    "./pages/**/*.{js,ts,jsx,tsx",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "accent-1": "#7D3C98",
        transparent: "transparent",
        blue: colors.sky,
        yellow: colors.yellow,
        teal: colors.teal,
        purple: colors.purple,
        pink: colors.pink,
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
    scrollbar: ["rounded"],
  },
  plugins: [require("tailwind-scrollbar")],
})
