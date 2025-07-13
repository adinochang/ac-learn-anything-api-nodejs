import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from "globals";
import { globalIgnores } from "eslint/config";

export default [
  globalIgnores(["dist/**"]), // This will ignore the entire 'dist' folder for ALL linting

  // Apply recommended JavaScript rules
  js.configs.recommended,

  // Apply recommended TypeScript rules
  ...tseslint.configs.recommended,

  // Configurations for TypeScript files
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": "off", // Turn off the base JS rule
      "@typescript-eslint/no-unused-vars": [
        "warn", // Or "error"
        {
          argsIgnorePattern: "^_", // Ignore parameters starting with an underscore
          varsIgnorePattern: "^_", // Ignore variables starting with an underscore
          caughtErrorsIgnorePattern: "^_", // Ignore caught errors starting with an underscore
        },
      ],
    },
  },
];
