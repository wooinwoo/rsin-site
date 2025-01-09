import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
      },
      screens: {
        "2xs": "360px", // 작은 모바일 (iPhone SE 등)
        xs: "475px", // 일반 모바일
        sm: "640px", // 기본 태블릿
        md: "768px", // 큰 태블릿
        lg: "1024px", // 작은 데스크탑
        xl: "1280px", // 일반 데스크탑
        "2xl": "1536px", // 큰 데스크탑
      },
      colors: {
        gray: {
          950: "#111111",
          900: "#333333",
          800: "#545454",
          700: "#636363",
          600: "#878787",
          500: "#AFAFAF",
          400: "#C2C2C2",
          300: "#E6E6E6",
          200: "#F4F4F4",
          100: "#F9F9F9",
        },
        white: "#FFFFFF",
        red: {
          200: "#FBE7E7",
          300: "#F8D9D9",
          400: "#FD9595",
          500: "#FF8C8C",
          600: "#FF7070",
          700: "#CC4242",
          800: "#991B1B",
        },
        blue: {
          200: "#EEF2FF",
          300: "#DDE5FE",
          400: "#8EA9FB",
          500: "#7396FF",
          600: "#5C7EFF",
          700: "#3B5BDB",
          800: "#1E3A8A",
        },
        teal: {
          200: "#E8F9F9",
          300: "#d8f5f5",
          400: "#7CDFDC",
          500: "#1FCEC8",
          600: "#19B5B0",
          700: "#0D9488",
          800: "#115E59",
        },
      },

      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "translate(-50%, -50%) scale(0.95)" },
          "100%": { transform: "translate(-50%, -50%) scale(1)" },
        },
        "toast-in": {
          "0%": { transform: "translate(-50%, 100%)", opacity: "0" },
          "100%": { transform: "translate(-50%, 0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 150ms ease-out",
        "scale-in": "scale-in 150ms ease-out",
        "toast-in": "toast-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
