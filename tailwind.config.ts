import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      colors: {
        bg: {
          DEFAULT: "#05070F",
          soft: "#0A0E1C",
          card: "#0E1426",
        },
        // BotMate brand blue (matches the official logo)
        brand: {
          50: "#EEF1FF",
          100: "#DCE3FF",
          200: "#B6C3FE",
          300: "#8A9DFC",
          400: "#5B73FB",
          500: "#3D5AFE", // official BotMate blue
          600: "#2C42E6",
          700: "#2335B8",
          800: "#1B2992",
          900: "#16236F",
          950: "#0E174D",
        },
        accent: {
          DEFAULT: "#3D5AFE", // alias to brand-500 for backward compatibility
          violet: "#7C8DFD",
          pink: "#EC4899",
          glow: "#2C42E6",
        },
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(61,90,254,0.22), transparent 60%), radial-gradient(circle at 80% 60%, rgba(236,72,153,0.10), transparent 50%)",
        "hero-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shine: "shine 6s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
