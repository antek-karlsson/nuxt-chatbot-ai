// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import prettierPlugin from 'eslint-plugin-prettier'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: false
  },
  dirs: {
    src: ['./playground']
  }
})
  .append({
    files: ['**/*.{js,ts,vue}'],
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': 'error'
    }
  })
  .append({
    files: ['**/*.{js,ts,vue}'],
    rules: {
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/quotes': 'off',
      '@typescript-eslint/semi': 'off'
    }
  })
