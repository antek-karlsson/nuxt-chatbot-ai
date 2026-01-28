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
        const optimizeDeps = config.optimizeDeps || {}
        ;(config as { optimizeDeps: { exclude?: string[] } }).optimizeDeps = {
          ...optimizeDeps,
          exclude: [...(optimizeDeps.exclude || []), '@vercel/oidc']
        }

        const VIRTUAL_MODULE_ID = '\0virtual:vercel-oidc-stub'
        const stubCode = [
          '// Stub for @vercel/oidc on the client side',
          "// The real package is Node-only and doesn't export getContext in the browser build",
          'export function getContext() {',
          '  return undefined',
          '}',
          '',
          'export function getVercelOidcToken() {',
          '  return undefined',
          '}',
          '',
          'export default {}'
        ].join('\n')

        const stubPlugin = {
          name: 'nuxt-chatbot-ai:stub-vercel-oidc',
          enforce: 'pre' as const,
          resolveId(id: string) {
            if (id === '@vercel/oidc') {
              return VIRTUAL_MODULE_ID
            }
            return null
          },
          load(id: string) {
            if (id === VIRTUAL_MODULE_ID) {
              return stubCode
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
