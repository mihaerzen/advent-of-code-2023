module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['xo', 'xo-typescript', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
}
