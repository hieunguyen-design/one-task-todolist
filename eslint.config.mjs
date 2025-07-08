import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: {
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        ...globals.browser, // or ...globals.node
        ...globals.es2021,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },

    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["webpack.config.js"],
    languageOptions: {
      sourceType: "script", // for CommonJS
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // tseslint.configs.recommended,
]);
