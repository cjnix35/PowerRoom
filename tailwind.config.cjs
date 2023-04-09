/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx, html}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0px 4px 24px -1px rgba(0, 0, 0, 0.25)",
      },
      keyframes: {
        loading: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        bgAnimation: {
          "0%": {
            "background-position": "100% 100%",
            "background-size": "200% 200%",
          },
          "50%": {
            "background-position": "0% 0%",
            "background-size": "200% 200%",
          },
          "100%": {
            "background-position": "100% 100%",
            "background-size": "200% 200%",
          },
        },
      },
      animation: {
        loading: "loading 2s ease infinite",
        bgAnimation: "bgAnimation 2s ease infinite",
      },
      backgroundImage: {
        "gradient-ON": "linear-gradient(270deg, #228413 0%, #27B111 79.27%)",
        "gradient-OFF": "linear-gradient(270deg, #202020 0%, #404040 100%)",
        "gradient-switch":
          "linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.8) 100%);",

        "gradient-BG":
          "linear-gradient(107.51deg, #8BCCFB 6.77%, #C47EFC 50.71%, #A15AE8 92.99%)",
      },
    },
  },
  plugins: [],
};

//linear-gradient(90deg, #27B111, #228413)
