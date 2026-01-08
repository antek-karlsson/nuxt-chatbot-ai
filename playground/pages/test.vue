<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Chatbot API Test</h1>

    <button
      @click="testEndpoint"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      :disabled="loading"
    >
      {{ loading ? 'Testing...' : 'Test Chatbot Endpoint' }}
    </button>

    <div v-if="result" class="mt-4 p-4 bg-gray-100 rounded">
      <pre>{{ JSON.stringify(result, null, 2) }}</pre>
    </div>

    <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded">Error: {{ error }}</div>
  </div>
</template>

<script setup>
const loading = ref(false)
const result = ref(null)
const error = ref(null)

const testEndpoint = async () => {
  loading.value = true
  error.value = null
  result.value = null

  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: 'Hello! Say something short and friendly.'
          }
        ]
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    result.value = {
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      streaming: true
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
