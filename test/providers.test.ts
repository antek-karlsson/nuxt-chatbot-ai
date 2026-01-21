import { describe, it, expect } from 'vitest'
import { createProvider } from '../src/runtime/server/utils/providers'

describe('createProvider', () => {
  it('should create OpenAI provider', () => {
    const config = {
      provider: 'openai',
      apiKey: 'test-key',
      model: 'gpt-4o-mini'
    }
    const model = createProvider(config)

    expect(model).toBeDefined()
    expect(typeof model).toBe('object')
  })

  it('should throw error for missing API key', () => {
    expect(() => createProvider('openai', { model: 'gpt-4o-mini' })).toThrow(
      'API key is required'
    )
  })
})
