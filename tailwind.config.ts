import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./ui/**/*.{ts,tsx}",
    "./core/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1",
          400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c",
          800: "#292524", 900: "#1c1917", 950: "#0c0a09",
        },
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(0, 0, 0, 0.04)",
        hover: "0 12px 32px -6px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
export default config;

