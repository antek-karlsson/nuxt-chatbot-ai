// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true
  },
  dirs: {
    src: ['./playground']
  }
}).append(
  // Prettier integration - disable conflicting rules
  {
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/quotes': 'off',
      '@typescript-eslint/semi': 'off'
    }
  }
)
