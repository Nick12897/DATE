import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFDF9",
        foreground: "#3D2B2E",
        romantic: {
          50: "#FFF5F5",
          100: "#FEEDEC",
          200: "#FCD6D4",
          300: "#F7B3B0",
          400: "#EE8582",
          500: "#E05A47", // Coral red
          600: "#C94232",
          700: "#A83125",
        },
        dusty: {
          50: "#FAF6F5",
          100: "#F4ECE9",
          200: "#E7D6D1",
          300: "#D6B8B0",
          400: "#C2968C", // Hồng đất
          500: "#B07A6F",
          600: "#966157",
        },
        cream: {
          50: "#FFFEFA",
          100: "#FFFDF9",
          200: "#FAF5ED",
          300: "#F3ECE0",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "sans-serif",
        ],
      },
      animation: {
        "heart-beat": "heartBeat 1.8s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        heartBeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.18)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.12)" },
          "70%": { transform: "scale(1)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      boxShadow: {
        romantic: "0 10px 30px -5px rgba(224, 90, 71, 0.12), 0 4px 12px -2px rgba(176, 122, 111, 0.08)",
        "romantic-hover": "0 14px 36px -4px rgba(224, 90, 71, 0.2), 0 6px 16px -2px rgba(176, 122, 111, 0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
