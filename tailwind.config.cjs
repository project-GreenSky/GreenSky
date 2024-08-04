/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", "[data-theme='dark-forest']"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        Playwrite: ["'Playwrite ES Deco'"],
      },
      width: {
        84: "21rem",
        88: "22rem",
        92: "23rem",
        100: "25rem",
        112: "28rem",
        120: "30rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "bounce-in": {
          "0%": {
            transform: "translateY(-25%)",
            opacity: 0,
          },
          "50%": {
            transform: "translateY(15%)",
            opacity: 1,
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-in": "bounce-in 0.5s ease-in-out forwards",
      },
    },
  },
  safelist: [
    {
      pattern: /^(bg|border|text)-(green|yellow|orange|red|purple|maroon)-.00$/,
    },
  ],
  daisyui: {
    themes: [
      {
        "dark-forest": {
          primary: "#2e7d32",
          secondary: "#1B4242",
          accent: "#1A3636",
          neutral: "#777",
          "base-100": "#0f0f0f",
          "base-200": "#151515",
          "base-300": "#000",
        },
      },
    ],
  },
  plugins: [require("daisyui"), require("tailwindcss-animate")],
};
