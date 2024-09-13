import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      grid1364: "1364px",

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        syne: ["var(--syne)"], // Adds a new `font-syne` class
        dm_sans: ["var(--dm-sans)"],
      },
      colors: {
        siteGreen: "#004838",
        siteLemon: "#e2fb6c",
        siteHeadingDark: "#1A202C",
        siteBg: "#ebede8",
        siteTextDark: "#333f3c",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
