/* eslint-disable */
import eslint  from '@eslint/js'

export default [
  eslint.configs.recommended,
  {
    ignores: [
        'build/',
        'dist/',
        'out/',
        '*.min.js',
        '*.bundle.js',
        '*.map',
        '.eslintrc.js',
        'eslint.config.js',
        '**/backend/__tests__/',
        'commit-lint.config.js'
      ],
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    },
    env: {
        node: true,  
      },
      globals: {
        describe: 'readonly',  
        it: 'readonly',        
        expect: 'readonly',    
        exports: 'readonly',
        require: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
  }
]
