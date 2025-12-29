export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  chatbot: {
    provider: 'openrouter',
    model: 'google/gemini-2.5-flash',
    systemPrompt: 'You are a helpful assistant.',
    providers: {
      openrouter: { apiKey: process.env.OPENAI_API_KEY, baseURL: 'https://openrouter.ai/api/v1' }
    }
  },
  devtools: { enabled: true }
})
