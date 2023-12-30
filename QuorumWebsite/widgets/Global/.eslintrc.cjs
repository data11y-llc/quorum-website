module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  //add @typescript-eslint/no-inferrable-types to rules to disable
  rules: {
    '@typescript-eslint/no-inferrable-types': 'off',
  },
};
