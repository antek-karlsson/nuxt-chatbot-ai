import type { ChatbotModuleOptions } from './types'

declare module '@nuxt/schema' {
  interface NuxtConfig {
    chatbot?: ChatbotModuleOptions
  }
}

declare module 'nuxt/schema' {
  interface NuxtConfig {
    chatbot?: ChatbotModuleOptions
  }
}

declare module '@nuxt/schema' {
  interface RuntimeConfig {
    chatbot: ChatbotModuleOptions
  }
  interface PublicRuntimeConfig {
    chatbot: {
      routeBase?: string
    }
  }
}
