import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import jestPlugin from 'eslint-plugin-jest';
import perfectionist from 'eslint-plugin-perfectionist';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config({
  files: ['{src,apps,libs,test}/**/*.ts'],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
  ],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: 'latest',
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    'unused-imports': unusedImports,
    jest: jestPlugin,
    perfectionist: perfectionist,
    '@stylistic': stylistic,
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  rules: {
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    'no-return-await': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'perfectionist/sort-imports': 'error',
    '@stylistic/padding-line-between-statements': [
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
      { blankLine: 'always', prev: ['case', 'default', 'if'], next: '*' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: 'try', next: '*' },
      { blankLine: 'always', prev: '*', next: 'throw' },
    ],
  },
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/@generated/**',
    '**/*.config.mjs',
    '**/*.config.js',
    'package.json',
  ],
});
