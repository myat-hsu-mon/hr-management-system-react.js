module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        secondary: {
          100: "#ffffff", //text color
          200: "#D1D5DA", //placeholder color
          300: "#374251", //form-input background color
          // 400: "#9CA3AF",
          400: "#1F2937", //form container color
          500: "#111827", //whole background-color
        },
      },
      fontFamily: {
        sans: ["Lato"],
        serif: ["serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
