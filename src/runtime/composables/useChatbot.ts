import { Chat } from '@ai-sdk/vue'
import { DefaultChatTransport } from 'ai'
import { useRuntimeConfig } from '#imports'

export interface UseChatbotOptions {
  api?: string
  [key: string]: unknown
}

export function useChatbot(options: UseChatbotOptions = {}) {
  const { chatbot } = useRuntimeConfig().public

  return new Chat({
    messages: [],
    transport: new DefaultChatTransport({
      api: options.api ?? chatbot.routeBase
    }),
    ...options
  })
}
