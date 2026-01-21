import type {
  ButtonProps,
  CardProps,
  ChatPromptProps,
  ChatMessagesProps,
  ChatPromptSubmitProps
} from '@nuxt/ui'

export type Provider =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'openrouter'
  | 'perplexity'
  | 'vercel'

export interface ChatbotModuleOptions {
  provider: Provider
  model: string
  apiKey?: string
  baseURL?: string
  systemPrompt?: string
  routeBase?: string // default: '/api/chatbot'
  timeoutMs?: number // default: 60000
  temperature?: number // default: 0.7
  maxTokens?: number // default: 1000
}

interface TriggerProps extends ButtonProps {
  triggerIcon?: string
  closeIcon?: string
}

interface PopupProps extends CardProps {
  width?: number
  height?: number
}

export interface ChatbotProps {
  title?: string
  titleTag?: string
  popup?: PopupProps
  user?: ChatMessagesProps['user']
  assistant?: ChatMessagesProps['assistant']
  position?: 'bottom-right' | 'bottom-left'
  trigger?: TriggerProps
  prompt?: ChatPromptProps
  promptSubmit?: ChatPromptSubmitProps
}
