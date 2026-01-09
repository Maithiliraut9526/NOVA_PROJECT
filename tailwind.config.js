module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#00e5ff",
        "primary-hover": "#66efff",
        "background-light": "#f5f8f8",
        "background-dark": "#0b1724",
        "surface-dark": "#162a44",
        "surface-darker": "#08101a",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        sans: ["Space Grotesk", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 229, 255, 0.15)",
        "glow-hover": "0 0 30px rgba(0, 229, 255, 0.3)",
      },
    },
  },
  plugins: [],
};
