import { defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import type { ChatbotModuleOptions } from './types/index'

export default defineNuxtModule<ChatbotModuleOptions>({
  meta: {
    name: 'nuxt-chatbot-ai',
    configKey: 'chatbot'
  },
  defaults: {
    provider: 'openrouter',
    model: 'google/gemini-2.5-flash',
    systemPrompt: 'You are a helpful assistant.',
    routeBase: '/api/chatbot',
    timeoutMs: 60000,
    providers: {
      openrouter: { apiKey: process.env.OPENAI_API_KEY, baseURL: 'https://openrouter.ai/api/v1' }
    }
  },
  setup(options, nuxt) {
    // const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.chatbot = defu(
      options,
      nuxt.options.runtimeConfig.chatbot as ChatbotModuleOptions
    )

    nuxt.options.runtimeConfig.public.chatbot = { routeBase: options.routeBase }

    // TODO: Component and composable registration
    // TODO: Server handler registration
  }
})
