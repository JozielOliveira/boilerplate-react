module.exports = {
  extends: ['plugin:react/recommended', 'prettier'],
  settings: {
    react: {
      version: '16.5.2',
    },
  },
  parser: 'babel-eslint',
  plugins: ['jest'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    'react/prop-types': 0,
    'react/no-string-refs': false,
  },
}
