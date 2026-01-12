<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">useChatbot Composable Test</h1>

    <div class="mb-4">
      <p><strong>Status:</strong> {{ chat.status }}</p>
      <p><strong>Messages:</strong> {{ chat.messages.length }}</p>
      <p v-if="chat.error"><strong>Error:</strong> {{ chat.error.message }}</p>
    </div>

    <button
      @click="sendTestMessage"
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-4"
      :disabled="chat.status === 'streaming'"
    >
      Send Test Message
    </button>

    <div class="space-y-2">
      <div v-for="message in chat.messages" :key="message.id" class="p-3 border rounded">
        <strong>{{ message.role }}:</strong>
        {{ getMessageText(message) || '...' }}
      </div>
    </div>
  </div>
</template>

<script setup>
const chat = useChatbot()

const getMessageText = message => {
  const textPart = message.parts?.find(part => part.type === 'text')
  return textPart?.text || ''
}

const sendTestMessage = () => {
  chat.sendMessage({ text: 'Hello! Say something short and friendly.' })
}
</script>
