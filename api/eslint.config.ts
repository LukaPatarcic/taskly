import js from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import vitest from 'eslint-plugin-vitest';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  eslintPluginPrettierRecommended,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  vitest.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        myCustomGlobal: 'readonly',
      },
    },
  },
];
