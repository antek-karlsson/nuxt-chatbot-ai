<script setup lang="ts">
import { ref, computed } from 'vue'
import { useChatbot } from '../composables/useChatbot'
import type { ChatbotProps } from '../../types/index'

const props = withDefaults(defineProps<ChatbotProps>(), {
  titleTag: 'h3',
  position: 'bottom-right',
  popup: () => ({
    width: 400,
    height: 400
  }),
  trigger: () => ({
    triggerIcon: 'i-lucide-bot-message-square',
    closeIcon: 'i-lucide-x'
  })
})

const chat = useChatbot()
const input = ref('')
const isChatbotOpen = ref(false)

const popupWidth = computed(() => {
  return `${props.popup?.width}px`
})

const popupHeight = computed(() => {
  return `${props.popup?.height}px`
})

const handleSubmit = () => {
  chat.sendMessage({ text: input.value.trim() })
  input.value = ''
}
</script>

<template>
  <div :class="['nuxt-chatbot', `nuxt-chatbot--${props.position}`]">
    <Transition name="chatbot-container">
      <UCard
        v-if="isChatbotOpen"
        v-bind="popup"
        class="nuxt-chatbot-popup"
        :ui="{
          root: `flex flex-col gap-2  min-w-[${popupWidth}] min-h-[${popupHeight}]`,
          body: 'flex-1 h-auto overflow-y-auto sm:p-2'
        }"
      >
        <template v-if="title" #header>
          <component :is="titleTag" class="font-medium">{{ title }}</component>
        </template>

        <UChatMessages :messages="chat.messages" :status="chat.status">
          <template #content="{ message }">
            <template
              v-for="(part, index) in message.parts"
              :key="`${message.id}-${part.type}-${index}`"
            >
              <MDC
                v-if="part.type === 'text' && message.role === 'assistant'"
                :value="part.text"
                :cache-key="`${message.id}-${index}`"
                class="*:first:mt-0 *:last:mb-0"
              />
              <p
                v-else-if="part.type === 'text' && message.role === 'user'"
                class="whitespace-pre-wrap"
              >
                {{ part.text }}
              </p>
            </template>
          </template>
        </UChatMessages>

        <template #footer>
          <UChatPrompt
            v-model="input"
            :placeholder="prompt?.placeholder"
            :disabled="chat.status === 'streaming'"
            autoresize
            :rows="1"
            class="flex-1"
            @keydown.enter.exact.prevent="handleSubmit"
          >
            <UChatPromptSubmit
              v-bind="promptSubmit"
              :ui="{ base: 'cursor-pointer' }"
            />
          </UChatPrompt>
        </template>
      </UCard>
    </Transition>
    <UButton
      v-bind="trigger"
      class="nuxt-chatbot-trigger"
      :icon="isChatbotOpen ? trigger.closeIcon : trigger.triggerIcon"
      :ui="{ base: 'cursor-pointer' }"
      @click="isChatbotOpen = !isChatbotOpen"
    />
  </div>
</template>

<style scoped>
.nuxt-chatbot {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
  z-index: 1000;
}

.nuxt-chatbot--bottom-left {
  left: 1rem;
  bottom: 1rem;
}

.nuxt-chatbot--bottom-right {
  right: 1rem;
  bottom: 1rem;
}

.nuxt-chatbot-popup {
  width: v-bind(popupWidth);
  height: v-bind(popupHeight);

  @media (max-width: 768px) {
    max-width: 90vw;
    max-height: 80vh;
  }
}

.nuxt-chatbot-trigger {
  width: fit-content;
  flex-shrink: 0;
}

.nuxt-chatbot--bottom-left .nuxt-chatbot-trigger {
  align-self: flex-start;
}

.nuxt-chatbot--bottom-right .nuxt-chatbot-trigger {
  align-self: flex-end;
}

.chatbot-container-enter-active,
.chatbot-container-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.chatbot-container-enter-from,
.chatbot-container-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
