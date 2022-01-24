module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  extends: ['standard', 'plugin:react/recommended'],
  plugins: ['react', 'jest'],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'space-before-function-paren': 0,
    'multiline-ternary': 'off'
  }
}
