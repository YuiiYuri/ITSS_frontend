/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "ct-sidebar-bg": "#fbf8f6",
        "ct-red": "#dc4c3e",
        "ct-button-hover": "#fee6e3",
      },
    },
  },
  plugins: [],
};
