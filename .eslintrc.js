module.exports = {
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'always'],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-undef': 'off',
    'eol-last': [1, 'always'],
    'no-mixed-spaces-and-tabs': 2,
    'prettier/prettier': [
      'error',
      { singleQuote: true, vueIndentScriptAndStyle: false, semi: true },
    ],
    'vue/no-multiple-template-root': 0, // template 唯一跟节点校验
    'vue/multi-word-component-names': 0,
  },
};
