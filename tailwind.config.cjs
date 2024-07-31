/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        Playwrite: ["'Playwrite ES Deco'"],
      },
    },
  },
  plugins: [require("daisyui")],
};
