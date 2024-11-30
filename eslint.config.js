import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // 기본 파일 패턴 및 글로벌 설정
  {
    // 모든 JavaScript/TypeScript 파일에 적용
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      // 브라우저 환경의 전역 변수 설정 (window, document 등)
      globals: {
        ...globals.browser,
      },
      // 파서 옵션 설정
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // JSX 문법 지원
        },
        ecmaVersion: "latest", // 최신 JavaScript 문법 지원
        sourceType: "module", // ES modules 사용
      },
    },
  },

  // JavaScript 기본 린트 규칙
  pluginJs.configs.recommended,

  // TypeScript 린트 규칙
  ...tseslint.configs.recommended,

  // React 기본 설정
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: pluginReact, // React 플러그인 설정
    },
    settings: {
      react: {
        version: "detect", // React 버전 자동 감지
      },
    },
    rules: {
      // React 17+ 에서는 React import가 필요없음
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },

  // React 추천 설정 확장
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ...pluginReact.configs.recommended,
    rules: {
      ...pluginReact.configs.recommended.rules,
      // React 17+ 새로운 JSX Transform 지원을 위한 규칙 비활성화
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
];
