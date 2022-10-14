module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'plugin:prettier/recommended',
    '@vue/prettier',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },
}
