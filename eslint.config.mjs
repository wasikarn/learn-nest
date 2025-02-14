import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import jestPlugin from 'eslint-plugin-jest';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
  {
    files: ['{src,test}/**/*.{ts,tsx}'],
    ignores: ['**/build/**', '**/dist/**', '**/node_modules/**'],
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  perfectionist.configs['recommended-natural'],
  prettierConfig,
  {
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
      'eslint-plugin-prettier': prettierPlugin,
      'eslint-plugin-perfectionist': perfectionist,
      jest: jestPlugin,
    },
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'lines-between-class-members': [
        'error',
        {
          enforce: [
            { blankLine: 'never', next: 'field', prev: 'field' },
            { blankLine: 'always', next: 'method', prev: 'field' },
            { blankLine: 'always', next: 'method', prev: 'method' },
          ],
        },
      ],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
        { blankLine: 'always', next: '*', prev: 'directive' },
        { blankLine: 'any', next: 'directive', prev: 'directive' },
        { blankLine: 'always', next: '*', prev: ['case', 'default', 'if'] },
        { blankLine: 'always', next: 'try', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'try' },
        { blankLine: 'always', next: 'throw', prev: '*' },
      ],
      'perfectionist/sort-classes': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          vars: 'all',
          varsIgnorePattern: '^_',
        },
      ],
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
  },
  {
    extends: [jestPlugin.configs['flat/recommended']],
    files: ['test/**'],
    rules: {
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'jest/expect-expect': 'off',
    },
  },
);
