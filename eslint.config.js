import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      semi: ["error", "always"],
      "no-unused-vars": "off",
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
