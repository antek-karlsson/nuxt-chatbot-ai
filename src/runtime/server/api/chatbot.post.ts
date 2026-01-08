import { streamText } from 'ai'
import { createProvider } from '../utils/providers'
import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { ChatbotModuleOptions } from '../../../types/index.ts'

export default defineEventHandler(async event => {
  const { messages } = await readBody(event)
  const config = useRuntimeConfig().chatbot as ChatbotModuleOptions

  // Validate input
  if (!Array.isArray(messages) || messages.length === 0) {
    throw createError({ statusCode: 400, message: 'Invalid messages' })
  }

  // Get provider config
  const providerConfig = config.providers?.[config.provider]
  if (!providerConfig) {
    throw createError({ statusCode: 500, message: `Provider ${config.provider} not configured` })
  }

  const model = createProvider(config.provider, {
    ...providerConfig,
    model: config.model
  })

  const result = streamText({
    model: await model,
    system: config.systemPrompt,
    messages,
    abortSignal: AbortSignal.timeout(config.timeoutMs || 60000)
  })

  // Return streaming response compatible with @ai-sdk/vue useChat
  return result.toTextStreamResponse()
})
