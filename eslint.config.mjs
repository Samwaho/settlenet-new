import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable the rule for unescaped entities like apostrophes and quotes
      "react/no-unescaped-entities": "off",
      // Change unused variables from error to warning
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
];

export default eslintConfig;

