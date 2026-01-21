import { streamText, convertToModelMessages } from 'ai'
import { createProvider } from '../utils/providers'
import { defineEventHandler, readBody, createError } from 'h3'
import { useRuntimeConfig } from '#imports'
import type { ChatbotModuleOptions } from '../../../types/index.ts'

export default defineEventHandler(async event => {
  try {
    const { messages } = await readBody(event)
    const config = useRuntimeConfig().chatbot as ChatbotModuleOptions

    if (!Array.isArray(messages) || messages.length === 0) {
      throw createError({ statusCode: 400, message: 'Invalid messages' })
    }

    const model = createProvider(config)

    const modelMessages = await convertToModelMessages(messages)

    const result = streamText({
      model: await model,
      system: config.systemPrompt,
      messages: modelMessages,
      temperature: config.temperature,
      maxOutputTokens: config.maxTokens,
      abortSignal: AbortSignal.timeout(config.timeoutMs || 60000)
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chatbot API error:', error)
    throw createError({
      statusCode: 500,
      message: `Chatbot error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
})
