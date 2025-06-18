module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontSize: {
        xxs: "0.6rem",
      },
      colors: {
        "lt-light": "#eee",
        "lt-dark": "#222",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  // Personalizacion de colores del theme de daisyui https://daisyui.com/theme-generator/
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          // Personalizaciones sobre light theme, por ej:
          primary: "#0bdabb",
          secondary: "black",
          "lt-light": "#eee",
          // "accent": "blue",
        },
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          // Personalizaciones sobre dark theme, por ej:
          primary: "#67f9cf",
          secondary: "white",
          "lt-dark": "#222",
          // "accent": "blue",
        },
      },
    ],
  },
};
