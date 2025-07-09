import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/node_modules",
      "**/public",
      "**/bin",
      "**/build",
      "**/dist",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/openapi-ts.mjs",
      "src/modules/annotation-detail",
      "src/api/generated/core",
      "src/api/**/*",
      "**/submodules",
    ],
  },
  ...compat.extends(
    "next",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),
  {
    plugins: {
      "unused-imports": unusedImports,
      "check-file": checkFile,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
        NodeJS: true,
      },
      ecmaVersion: 5,
      sourceType: "commonjs",
    },
    rules: {
      "check-file/folder-match-with-fex": [
        "error",
        {
          "*.test.{js,ts}": "**/__tests__/",
        },
      ],
      "check-file/filename-naming-convention": [
        "error",
        {
          "{src/!(app|api|pages),src/api/!(core),public}/**/*": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "react/jsx-boolean-value": "warn",
      "react/button-has-type": "error",
      "react/jsx-curly-brace-presence": "warn",
      "react-hooks/rules-of-hooks": "warn",
      "react-hooks/exhaustive-deps": "off",
      "dot-notation": "warn",
      "guard-for-in": "error",
      "no-process-env": "error",
      "no-bitwise": "warn",
      "no-caller": "warn",
      "no-constant-binary-expression": "warn",
      "no-console": [
        "warn",
        {
          allow: ["warn", "error", "debug"],
        },
      ],
      "no-duplicate-imports": "warn",
      "no-else-return": "warn",
      "no-eval": "warn",
      "no-extra-bind": "warn",
      "no-use-before-define": "off",
      "no-implicit-coercion": "warn",
      "no-negated-in-lhs": "warn",
      "no-new-func": "warn",
      "no-new-wrappers": "warn",
      "no-param-reassign": "warn",
      "no-return-await": "warn",
      "no-sequences": "warn",
      "no-template-curly-in-string": "warn",
      "no-throw-literal": "warn",
      "no-undef-init": "warn",
      "no-undef": "off",
      "no-unneeded-ternary": "warn",
      "no-var": "warn",
      "one-var": ["warn", "never"],
      "prefer-const": "warn",
      "prefer-object-spread": "warn",
      "no-unused-vars": "off",
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportDeclaration[source.value='@/api/types/models']",
          message:
            "Please, use types and services from @/api/types.gen or @/api/services.gen",
        },
      ],
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["src/api/core/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);
