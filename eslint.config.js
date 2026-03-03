import js from "@eslint/js";
import turboPlugin from "eslint-plugin-turbo";

const config = [
  {
    ignores: ["node_modules/**", ".next/**", "dist/**", "build/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...turboPlugin.configs.recommended.rules,
    },
  },
];

export default config;
