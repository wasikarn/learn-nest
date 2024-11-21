import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['{src,apps,libs,test}/**/*.ts'],
  extends: [eslint.configs.recommended, tseslint.configs.recommended],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: 'latest',
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    '@typescript-eslint/array-type': 'error',
  },
});
