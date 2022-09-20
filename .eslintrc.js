module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".ts", ".tsx"] }],
    "no-useless-rename": ["warn", {
      "ignoreDestructuring": true,
      "ignoreImport": true,
      "ignoreExport": true,
    }],
    'no-var': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/array-type': 2,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/explicit-member-accessibility': 1,
    '@typescript-eslint/no-empty-function': 1,
    '@typescript-eslint/no-empty-interface': 2,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-extra-non-null-assertion': 2,
    '@typescript-eslint/no-magic-numbers': 0,
    '@typescript-eslint/require-await': 2,
    '@typescript-eslint/no-require-imports': 'off',
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
      'react/jsx-no-bind': 'error',
      'react/no-multi-comp': 'warn',
      'react/no-access-state-in-setstate': 'error',
      'react/destructuring-assignment': ['enabled', 'always'],
    },
  },
}
