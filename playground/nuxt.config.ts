export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui'],
  chatbot: {
    provider: 'google',
    model: 'gemini-2.5-flash',
    systemPrompt: 'You are a helpful assistant.',
    providers: {
      google: { apiKey: process.env.GOOGLE_API_KEY, model: 'gemini-2.5-flash' }
    }
  },
  devtools: { enabled: true }
})
