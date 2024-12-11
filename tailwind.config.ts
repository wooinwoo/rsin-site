import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
        // 빨간 계열
        red: {
          300: "#F8D9D9",
          400: "#FD9595",
          500: "#FF8C8C",
        },
        // 파란 계열
        blue: {
          300: "#DDE5FE",
          400: "#8EA9FB",
          500: "#7396FF",
        },
        // 청록 계열
        teal: {
          300: "#d8f5f5",
          400: "#7CDFDC",
          500: "#1FCEC8",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
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
      },
      animation: {
        "fade-in": "fade-in 150ms ease-out",
        "scale-in": "scale-in 150ms ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
