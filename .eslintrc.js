module.exports = {
  extends: ['./node_modules/gts/'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'node/no-extraneous-import': 'off',
    'object-curly-spacing': ['error', 'never'],
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
  },
};
