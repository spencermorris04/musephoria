/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    // Set to warn for `any` type usage
    "@typescript-eslint/no-explicit-any": "warn", // Warn when using any
    "@typescript-eslint/no-unsafe-assignment": "warn", // Warn on unsafe assignments
    "@typescript-eslint/no-unsafe-member-access": "warn", // Warn on unsafe member access
    "@typescript-eslint/no-unsafe-call": "warn", // Warn on unsafe calls
    "@typescript-eslint/prefer-nullish-coalescing": "warn", // Warn on using || instead of ??
    "@typescript-eslint/no-floating-promises": "warn", // Warn on floating promises
    "react/no-unescaped-entities": "warn", // Warn on unescaped entities
    "@typescript-eslint/no-empty-interface": "warn", // Warn on empty interfaces
  },
};

module.exports = config;
