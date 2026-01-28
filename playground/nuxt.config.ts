export default defineNuxtConfig({
  modules: ['nuxt-chatbot-ai', '@nuxt/ui', '@nuxtjs/mdc'],
  chatbot: {
    provider: 'google',
    model: 'gemini-2.5-flash',
    systemPrompt: 'You are a helpful assistant.',
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 1,
    maxTokens: 4096
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true }
})
