module.exports = {
  parser: `@typescript-eslint/parser`,
  parserOptions: {
    project: `./tsconfig.json`,
  },
  extends: [
    '@react-native-community',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  plugins: ['unicorn'],
  rules: {
    'max-len': ['error', { code: 120 }],
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'import/order': ['error', { 'newlines-between': 'always' }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false,
        variables: false,
        typedefs: false,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'react/jsx-sort-props': ['error', { shorthandFirst: true }],
    'react-hooks/exhaustive-deps': 'off',
    'no-console': 'warn',
  },
}
