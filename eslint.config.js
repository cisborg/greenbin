const react = require('eslint-plugin-react');
const reactNative = require('eslint-plugin-react-native');

module.exports = [
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Enable JSX
        },
      },
    },
    plugins: {
      react,
      'react-native': reactNative,
    },
    rules: {
      // React Rules
      ...react.configs.recommended.rules,

      // React Native Rules
      'react-native/no-unused-styles': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react-native/split-platform-components': 'warn',
      'react-native/no-inline-styles': 'off',
      'react-native/no-color-literals': 'off',
      'react-native/no-single-element-style-arrays': 'off',
      'react/prop-types': 'off',  // Disable the prop-types rule

      // General Rules
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
    settings: {
      react: {
        version: 'detect', // Auto-detect React version
      },
    },
  },
];
