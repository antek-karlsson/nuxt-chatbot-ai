import type { Provider } from '../../../types/index.ts'

export function getDefaultModel(provider: Provider): string {
  switch (provider) {
    case 'openai':
      return 'gpt-4o-mini'
    case 'anthropic':
      return 'claude-3-5-sonnet-latest'
    case 'google':
      return 'gemini-2.5-flash'
    case 'openrouter':
      return 'openai/gpt-4o-mini'
    case 'perplexity':
      return 'llama-3.1-sonar-small-128k-online'
    case 'vercel':
      return 'gpt-4o-mini'
    default:
      return 'gpt-4o-mini'
  }
}
