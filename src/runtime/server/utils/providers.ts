import { createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

import { getDefaultModel } from './getDefaultModel'

import type { LanguageModel } from 'ai'
import type { ProviderConfig, Provider } from '../../../types/index.ts'

export function createProvider(
  provider: Provider,
  config: ProviderConfig
): LanguageModel | Promise<LanguageModel> {
  const { apiKey, baseURL } = config

  const model = config.model ?? getDefaultModel(provider)

  if (!apiKey) {
    throw new Error(`API key is required for provider: ${provider}`)
  }

  switch (provider) {
    case 'openai':
      return createOpenAI({
        apiKey
      })(model)

    case 'perplexity':
      return createOpenAI({
        apiKey,
        baseURL: 'https://api.perplexity.ai'
      })(model)

    case 'openrouter':
      return createOpenAI({
        apiKey,
        baseURL: 'https://openrouter.ai/api/v1'
      })(model)

    case 'anthropic':
      return createAnthropic({
        apiKey
      })(model)

    case 'google':
      return createGoogleGenerativeAI({
        apiKey
      })(model)

    case 'vercel':
      return createOpenAI({ apiKey, baseURL })(model)

    default:
      return loadCustomProvider(provider, apiKey, model, baseURL)
  }
}

async function loadCustomProvider(
  provider: string,
  apiKey: string,
  model: string,
  baseURL?: string
): Promise<LanguageModel> {
  try {
    const providerPackage = `@ai-sdk/${provider}`
    const imported = await import(providerPackage)

    if (baseURL) {
      return imported.createOpenAI?.({ baseURL, apiKey }) || imported.default?.(apiKey)
    }

    return imported.default?.(apiKey)(model) || imported(apiKey)(model)
  } catch (error) {
    console.error(error)
    throw new Error(
      `Provider "${provider}" not found or not installed.
        To use custom providers:
        1. Install the provider: npm install @ai-sdk/${provider}
        2. Configure in nuxt.config.ts
        Built-in providers: openai, anthropic, google, openrouter, perplexity`
    )
  }
}
