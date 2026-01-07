export type Provider = 'openai' | 'anthropic' | 'google' | 'openrouter' | 'perplexity' | 'vercel'

export interface ProviderConfig {
  apiKey?: string
  baseURL?: string
  model: string
}

export interface ChatbotModuleOptions {
  provider: Provider
  model: string
  systemPrompt?: string
  routeBase?: string // default: '/api/chatbot'
  timeoutMs?: number // default: 60000
  providers?: {
    [key in Provider]?: ProviderConfig
  }
}
