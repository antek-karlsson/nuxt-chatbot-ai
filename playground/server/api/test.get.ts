import { createProvider } from '../../../src/runtime/server/utils/providers'
import type { Provider, ProviderConfig } from '../../../src/types/index.ts'

export default defineEventHandler(async () => {
  try {
    const runtimeConfig = useRuntimeConfig()
    const config = runtimeConfig.chatbot

    console.log('Chatbot config:', config)
    console.log('Google API key from runtime:', runtimeConfig.GOOGLE_API_KEY)

    const providerConfig = config.providers?.[config.provider as keyof typeof config.providers]

    if (!providerConfig?.apiKey) {
      return {
        success: false,
        error: 'API key not found',
        debug: {
          provider: config.provider,
          hasProviders: !!config.providers,
          runtimeApiKey: runtimeConfig.GOOGLE_API_KEY
        }
      }
    }

    const model = await createProvider(
      config.provider as Provider,
      providerConfig as ProviderConfig
    )

    return { success: true, provider: config.provider, modelType: typeof model, model }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'Unknown error' }
  }
})
