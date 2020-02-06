module.exports = {
  parserOptions: {
      parser: 'babel-eslint'
  },
  extends: [
      // ↓これで出なくなる
      'plugin:vue/base',
      'plugin:prettier/recommended',
      'prettier',
      'prettier/vue'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  // consoleはこれででなくなる
  rules: {
    "no-console": "off"
  },
}
