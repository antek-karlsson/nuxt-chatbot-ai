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

    nuxt.hook('vite:extendConfig', (config, { isClient, isServer }) => {
      if (isClient) {
        const stubPlugin = {
          name: 'nuxt-chatbot-ai:stub-vercel-oidc',
          resolveId(id: string) {
            if (id === '@vercel/oidc') return '\0virtual:vercel-oidc-stub'
            return null
          },
          load(id: string) {
            if (id === '\0virtual:vercel-oidc-stub') {
              return 'export function getContext() { return undefined; }\nexport default {};'
            }
            return null
          }
        }
        ;(config as { plugins: unknown[] }).plugins = [
          ...(config.plugins || []),
          stubPlugin
        ]
      }

      if (isServer) {
        const external = config.build?.rollupOptions?.external
        const externals = Array.isArray(external) ? [...external] : []
        if (!externals.includes('@vercel/oidc')) externals.push('@vercel/oidc')
        if (config.build) {
          config.build.rollupOptions = config.build.rollupOptions || {}
          config.build.rollupOptions.external = externals
        }
      }
    })

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
