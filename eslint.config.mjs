/* eslint-disable */
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: {
        ...globals.browser, 
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        exports: "readonly",
        require: "readonly",
        process: "readonly",
        console: "readonly",
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },
    rules: {
      "quotes": ["error", "single"],  
      "semi": ["error", "always"],    
      "no-undef": "error", 
    },
    ignores: [
      "build/",
      "dist/",
      "out/",
      "*.min.js",
      "*.bundle.js",
      "*.map",
      ".eslintrc.js",
      "eslint.config.js",
      "**/backend/__tests__/",
      "commit-lint.config.js",
    ],
  },
  tseslint.configs.recommended,
]);
