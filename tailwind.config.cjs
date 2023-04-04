/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "380px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1200px",
      // => @media (min-width: 1024px) { ... }

      xl: "1670px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "2000px",
      // => @media (min-width: 1536px) { ... }
    },

    fontFamily: {
      head: ["Archivo", "ui-sans-serif", "system-ui"],
      inter: ["Inter", "ui-sans-serif", "system-ui"],
      sans: ["Lato", "ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
    },
    extend: {
      colors: {
        primary: "#333333",
        secondary: "#D9D9D9",
        accent: "#ECECEC",
      },
      backgroundImage: {
        "head-image": "url('./assets/img/cover.jpg')",
      },
      spacing: {
        128: "42rem",
      },
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        normal: "0",
        wide: ".035em",
        wider: ".06em",
        widest: ".1em",
        widest: ".25em",
      },
    },
  },
  plugins: [],
};
