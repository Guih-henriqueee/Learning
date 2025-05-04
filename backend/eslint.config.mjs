import { eslint } from '@eslint/js'

export default [
  eslint.configs.recommended,
  {
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    }
  }
]
