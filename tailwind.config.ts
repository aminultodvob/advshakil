import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        gold: "rgb(var(--color-gold) / <alpha-value>)",
        mist: "rgb(var(--color-mist) / <alpha-value>)",
        stone: "rgb(var(--color-stone) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"]
      },
      boxShadow: {
        card: "0 24px 60px rgba(11, 28, 44, 0.08)",
        gold: "0 16px 40px rgba(201, 161, 74, 0.18)"
      },
      backgroundImage: {
        "mesh-gold":
          "radial-gradient(circle at top left, rgba(201, 161, 74, 0.16), transparent 35%), radial-gradient(circle at bottom right, rgba(11, 28, 44, 0.12), transparent 32%)"
      }
    }
  },
  plugins: []
};

export default config;
