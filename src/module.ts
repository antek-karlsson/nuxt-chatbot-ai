import {
  defineNuxtModule,
  createResolver,
  addServerHandler,
  addImports,
  addComponent
} from '@nuxt/kit'
import { defu } from 'defu'
import type { ChatbotModuleOptions } from './types/index'
import { getDefaultModel } from './runtime/server/utils/getDefaultModel'

export default defineNuxtModule<ChatbotModuleOptions>({
  meta: {
    name: 'nuxt-chatbot-ai',
    configKey: 'chatbot'
  },
  defaults: {
    provider: 'openrouter',
    model: getDefaultModel('openrouter'),
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
    systemPrompt: 'You are a helpful assistant.',
    routeBase: '/api/chatbot',
    timeoutMs: 60000,
    temperature: 0.7,
    maxTokens: 4096
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const mergedOptions = defu(
      options,
      nuxt.options.runtimeConfig.chatbot || {}
    )

    nuxt.options.runtimeConfig.chatbot = mergedOptions

    nuxt.options.runtimeConfig.public.chatbot = {
      routeBase: mergedOptions.routeBase
    }

    addServerHandler({
      route: mergedOptions.routeBase,
      handler: resolver.resolve('./runtime/server/api/chatbot.post')
    })

    addImports({
      name: 'useChatbot',
      from: resolver.resolve('./runtime/composables/useChatbot')
    })

    addComponent({
      name: 'NuxtChatbot',
      filePath: resolver.resolve('./runtime/components/NuxtChatbot.vue')
    })
  }
})
