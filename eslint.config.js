import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    rules: {
      'semi': "never",
      '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    },
  },
);