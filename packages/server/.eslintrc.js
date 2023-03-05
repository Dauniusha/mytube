module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
    'airbnb-base',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'node_modules/**', 'src/prisma/generated/**'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/extensions': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'indent': 'off', // dublicate  of @typescript-eslint/indent rule
    '@typescript-eslint/no-shadow': 'off', // dublicate of no-shadow rule
    'no-case-declarations': 'off',
    'no-shadow': 'off',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-relative-packages': 'off',
    'semi': 'off',
    'no-undef': 'warn',
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/indent': ['warn', 4],
    '@typescript-eslint/no-explicit-any': 'warn',
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 2 }],
    'max-len': ['error', 120],
    'no-use-before-define': ["off", {
      "classes": true,
    }],
    'func-call-spacing': 'warn',
    'no-spaced-func': 'warn',

    'linebreak-style': ['warn', 'windows'],
  },
};
