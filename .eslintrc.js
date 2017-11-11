'use strict';
// http://survivejs.com/webpack/developing-with-webpack/linting/
// rules: http://eslint.org/docs/rules/
/*0 - The rule has been disabled.
1 - The rule will emit a warning.
2 - The rule will emit an error.*/

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  globals: {
    Modernizr: true,
    ActiveXObject: true,
    Android: true
  },
  /* extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 6
  }, */
  extends: ['standard', 'standard-preact'],
  rules: {
    // indent: ['error', 2],
    indent: ['error', 2, {
      'SwitchCase': 1
    }],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['warn'],
    'no-control-regex': 0,
    'no-console': 0,

    'padded-blocks': 0,
    'react/jsx-boolean-value': 1
  }
};
