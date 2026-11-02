import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./Src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        festival: {
          wine: {
            950: "#120205",
            900: "#1A0408",
            850: "#22050B",
            800: "#2D0810",
            700: "#3D0B16",
          },
          gold: {
            300: "#FDE68A",
            400: "#FACC15",
            500: "#F5B842",
            600: "#D9941E",
            700: "#B45309",
          },
          crimson: {
            500: "#C2272D",
            600: "#A51D24",
            700: "#8B0000",
            800: "#6B0000",
          },
          surface: {
            DEFAULT: "#120205",
            card: "#18080C",
            elevated: "#230C12",
            border: "rgba(245, 184, 66, 0.2)",
          },
          cream: {
            50: "#FFFDF9",
            100: "#FFF8EE",
            200: "#F5EBD9",
            300: "#E5D7C0",
          },
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
        display: ["Cinzel Decorative", "Cinzel", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "ticker": "ticker 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
