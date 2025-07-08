import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

const MAX_CYCLOMATIC_COMPLEXITY = 5;
const MAX_DEPTH = 3;

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-debugger': 'error',
      eqeqeq: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-magic-numbers': ['error', { ignore: [0, 1, -1], enforceConst: true }],
      'object-shorthand': ['error', 'always'],
      'arrow-parens': ['error', 'always'],
      'arrow-body-style': ['error', 'as-needed'],
      'max-len': [
        'error',
        {
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        { blankLine: 'always', prev: 'directive', next: '*' },
        { blankLine: 'any', prev: 'directive', next: 'directive' },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'always', prev: '*', next: 'block-like' },
        { blankLine: 'always', prev: 'block', next: 'block' },
      ],
      'no-trailing-spaces': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-console': 'off',
      'no-implicit-coercion': 'error',
      'complexity': ['error', MAX_CYCLOMATIC_COMPLEXITY],
      'no-shadow': 'error',
      'max-depth': ['error', MAX_DEPTH],
      'max-lines-per-function': [
        'error',
        { max: 100, skipBlankLines: true, skipComments: true },
      ],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-empty-function': 'error',
      'no-use-before-define': [
        'error',
        { functions: false, classes: true, variables: true },
      ],
      'require-await': 'error',
      'no-return-await': 'error',
      'prefer-template': 'error',
      yoda: ['error', 'never'],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.node },
  },
]);
