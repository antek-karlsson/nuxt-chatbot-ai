export default defineNuxtConfig({
  modules: ['../src/module', '@nuxt/ui', '@nuxtjs/mdc'],
  chatbot: {
    provider: 'google',
    model: 'gemini-2.5-flash',
    systemPrompt: 'You are a helpful assistant.',
    providers: {
      google: { apiKey: process.env.GOOGLE_API_KEY, model: 'gemini-2.5-flash' }
    }
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true }
})
