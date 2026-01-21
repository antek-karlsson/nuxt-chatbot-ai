# Nuxt Chatbot AI

A drop-in AI chatbot component for Nuxt applications. Built with [Nuxt UI](https://ui.nuxt.com) and [Vercel AI SDK](https://sdk.vercel.ai), it provides a simple chat widget with streaming responses and multi-provider support.

## ✨ Features

- 🎨 **Simple & Customizable UI** — Simple chat widget built with Nuxt UI components, customizable with its component API
- 🌊 **Streaming Enabled** — Real-time token streaming for responsive conversations
- 🔌 **Multiple Providers** — OpenAI, Anthropic, Google, OpenRouter, Perplexity, and Vercel AI Gateway
- 🔒 **Secure** — API keys stays server-side, never exposed to the client
- 📝 **Markdown Support** — Rich formatting with MDC for assistant responses
- 🎯 **Zero Config** — Works out of the box with sensible defaults

## 📦 Installation

```bash
# Using Nuxi
npx nuxi@latest module add nuxt-chatbot-ai

# Using pnpm
pnpm add nuxt-chatbot-ai

# Using npm
npm install nuxt-chatbot-ai

# Using yarn
yarn add nuxt-chatbot-ai
```

### Peer Dependencies

This module requires [Nuxt UI](https://ui.nuxt.com) and [@nuxtjs/mdc](https://github.com/nuxt-modules/mdc) for the chat interface and markdown rendering:

```bash
pnpm add @nuxt/ui @nuxtjs/mdc
# or
npm install @nuxt/ui @nuxtjs/mdc
# or
yarn add @nuxt/ui @nuxtjs/mdc
```

## 🚀 Quick Start

### 0. Add your provider's API key to your `.env` file

```env
OPENAI_API_KEY=sk-...
.
.
.
```

⚠️ **Never commit your `.env` file to version control**

### 1. Add the module and dependencies to your `nuxt.config.ts` file

```ts
export default defineNuxtConfig({
  modules: ['nuxt-chatbot-ai', '@nuxt/ui', '@nuxtjs/mdc'],

  chatbot: {
    provider: 'openai',
    apiKey: process.env.OPENAI_API_KEY
  }
})
```

### 2. Add the component to your app

```vue
<template>
  <div>
    <NuxtChatbot title="AI Assistant" />
  </div>
</template>
```

And that's it! You now have a fully functional AI chatbot in your Nuxt app.

## ⚙️ Configuration

### Module Options

Configure the module in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  chatbot: {
    // Required
    provider: 'openai', // AI provider to use
    apiKey: process.env.OPENAI_API_KEY,

    // Optional
    model: 'gpt-4o-mini', // Model to use (provider-specific)
    baseURL: undefined, // Custom API base URL (for OpenRouter, Perplexity, Vercel)
    systemPrompt: 'You are a helpful assistant.',
    routeBase: '/api/chatbot', // API endpoint path
    timeoutMs: 60000, // Request timeout in milliseconds
    temperature: 0.7, // Response temperature (0-2)
    maxTokens: 4096 // Maximum tokens in response
  }
})
```

### Supported Providers

| Provider     | Default Model                       |
| ------------ | ----------------------------------- |
| `openai`     | `gpt-4o-mini`                       |
| `anthropic`  | `claude-3-5-sonnet-latest`          |
| `google`     | `gemini-2.5-flash`                  |
| `openrouter` | `openai/gpt-4o-mini`                |
| `perplexity` | `llama-3.1-sonar-small-128k-online` |
| `vercel`     | `gpt-4o-mini`                       |

### Provider Examples

#### OpenAI

```ts
chatbot: {
  provider: 'openai',
  apiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4o'
}
```

#### Anthropic (Claude)

```ts
chatbot: {
  provider: 'anthropic',
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-3-5-sonnet-latest'
}
```

#### Google (Gemini)

```ts
chatbot: {
  provider: 'google',
  apiKey: process.env.GOOGLE_API_KEY,
  model: 'gemini-2.5-flash'
}
```

#### OpenRouter

Access 100+ models through a unified API:

```ts
chatbot: {
  provider: 'openrouter',
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
  model: 'anthropic/claude-3.5-sonnet'
}
```

#### Perplexity

```ts
chatbot: {
  provider: 'perplexity',
  apiKey: process.env.PERPLEXITY_API_KEY,
  baseURL: 'https://api.perplexity.ai',
  model: 'llama-3.1-sonar-large-128k-online'
}
```

## 🎨 Component Props

The `<NuxtChatbot />` component accepts the following props:

| Prop           | Type                              | Default                       | Description                                              |
| -------------- | --------------------------------- | ----------------------------- | -------------------------------------------------------- |
| `title`        | `string`                          | `undefined`                   | Title displayed in the chat header                       |
| `titleTag`     | `string`                          | `'h3'`                        | HTML tag for the title                                   |
| `position`     | `'bottom-right' \| 'bottom-left'` | `'bottom-right'`              | Widget position on screen                                |
| `popup`        | `PopupProps`                      | `{ width: 400, height: 400 }` | Chat popup dimensions and styling                        |
| `trigger`      | `TriggerProps`                    | See below                     | Trigger button configuration                             |
| `user`         | `object`                          | `undefined`                   | User message avatar/styling (Nuxt UI ChatMessages props) |
| `assistant`    | `object`                          | `undefined`                   | Assistant message avatar/styling                         |
| `prompt`       | `ChatPromptProps (Nuxt/UI)`       | `undefined`                   | Input prompt configuration                               |
| `promptSubmit` | `ChatPromptSubmitProps (Nuxt/UI)` | `undefined`                   | Submit button configuration                              |

### Trigger Props (Extension of Nuxt/UI ButtonProps)

```ts
interface TriggerProps extends ButtonProps {
  triggerIcon?: string // Default: 'i-lucide-bot-message-square'
  closeIcon?: string // Default: 'i-lucide-x'
}
```

### Popup Props (Extension of Nuxt/UI CardProps)

```ts
interface PopupProps extends CardProps {
  width?: number // Default: 400
  height?: number // Default: 400
}
```

## 📖 Usage Examples

### Basic Usage

```vue
<template>
  <NuxtChatbot title="Help Assistant" />
</template>
```

### Custom Position

```vue
<template>
  <NuxtChatbot title="Support" position="bottom-left" />
</template>
```

### Custom Styling

```vue
<template>
  <NuxtChatbot
    title="AI Helper"
    :popup="{ width: 500, height: 600, variant: 'soft' }"
    :trigger="{
      color: 'primary',
      variant: 'solid',
      size: 'xl',
      triggerIcon: 'i-lucide-message-circle'
    }"
  />
</template>
```

### Custom Avatars

```vue
<template>
  <NuxtChatbot
    title="Chat"
    :user="{
      avatar: { src: '/avatars/user.png' }
    }"
    :assistant="{
      avatar: { icon: 'i-lucide-bot', color: 'primary' }
    }"
  />
</template>
```

### Custom Input Placeholder

```vue
<template>
  <NuxtChatbot
    title="Ask Anything"
    :prompt="{ placeholder: 'Type your question here...' }"
  />
</template>
```

## 🔧 Composable API

For headless usage or custom UI implementations, use the `useChatbot` composable:

```vue
<script setup>
const chat = useChatbot()

// Access reactive state
// chat.messages - Array of messages
// chat.status - 'idle' | 'streaming' | 'error'

// Send a message
const sendMessage = () => {
  chat.sendMessage({ text: 'Hello, AI!' })
}
</script>
```

For further reference go to the [Vercel AI SDK](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat#usechat) documentation.

### Options

```ts
const chat = useChatbot({
  api: '/api/custom-chatbot' // Override default API endpoint
})
```

### Return Value

The composable returns a `Chat` instance from `@ai-sdk/vue`.

For further reference go to the [Vercel AI SDK](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat#usechat) documentation.

## 🔒 Security

This module is designed with security as a priority:

- **Server-Side Only API Keys**: Your AI provider API keys are stored in `runtimeConfig` (server-only) and never exposed to the client bundle
- **Nitro Endpoints**: All AI requests go through server-side Nitro handlers
- **Input Validation**: Messages are validated before being sent to providers
- **Timeout Protection**: Configurable request timeouts prevent hanging requests

## 📝 TypeScript

TypeScript support with exported types:

```ts
import type {
  ChatbotModuleOptions,
  ChatbotProps,
  Provider
} from 'nuxt-chatbot-ai'
```

## 🤝 Contributing

Contributions will be open soon.

## 📄 License

[MIT License](./LICENSE) © 2025

---
