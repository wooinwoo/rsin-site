import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
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
          300: "#FFA1A1",
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
          300: "#7CDFDC", // 중복된 값은 하나로 통일
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
    },
  },
  plugins: [],
} satisfies Config;
