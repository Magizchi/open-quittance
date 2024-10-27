import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import svelteParser from "svelte-eslint-parser";
import eslintPluginSvelte from 'eslint-plugin-svelte';
import tsParser from "@typescript-eslint/parser";
import svelteConfig from "./svelte.config.js";

export default [
  {files: ["**/*.{svelte,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs['flat/prettier'],
  {
    ignores: [".husky/*", "docs/*", ".svelte-kit/*", "node-modules/*","migrations/*"],
  },
  {
    files: ["**/*.svelte", "*.svelte"],
    languageOptions: {
      globals: {
        $$Generic: 'readonly'
      },
      parser: svelteParser,
      parserOptions: {
        svelteConfig: svelteConfig,
        parser:  tsParser,
      },
    },
  },
];