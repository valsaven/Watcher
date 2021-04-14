module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    },
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  rules: {
    'class-methods-use-this': 'off',
  },
};
