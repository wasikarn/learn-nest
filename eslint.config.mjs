import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import unusedImports from 'eslint-plugin-unused-imports';
import jestPlugin from 'eslint-plugin-jest';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config({
  files: ['{src,apps,libs,test}/**/*.ts'],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylistic,
    perfectionist.configs['recommended-natural'],
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
    '@typescript-eslint/consistent-type-definitions': 'off',
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
  },
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/coverage/**',
    '**/*.config.mjs',
    '**/*.config.js',
    'package.json',
  ],
});
