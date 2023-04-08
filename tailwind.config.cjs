/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx, html}"],
  theme: {
    extend: {
      keyframes: {},
      animation: {},
      backgroundImage: {
        "gradient-ON": "linear-gradient(270deg, #228413 0%, #27B111 79.27%)",
        "gradient-OFF": "linear-gradient(270deg, #202020 0%, #404040 100%)",
        "gradient-switch":
          "linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);",
      },
    },
  },
  plugins: [],
};

//linear-gradient(90deg, #27B111, #228413)
