<template>
  <div class="ai-chat">
    <div class="chat-header">
      <h3>🤖 Asistente Musical</h3>
      <button @click="toggleChat" class="close-button">×</button>
    </div>
    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message', message.role]"
      >
        <div class="message-content">{{ message.content }}</div>
      </div>
      <div v-if="isTyping" class="message ai typing">
        <div class="message-content">Escribiendo...</div>
      </div>
    </div>
    <div class="chat-input">
      <input
        v-model="userMessage"
        type="text"
        placeholder="Pregunta algo sobre música..."
        @keyup.enter="sendMessage"
        class="input-field"
      />
      <button @click="sendMessage" class="send-button">Enviar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import aiService from '@/services/ai'

interface Message {
  role: 'user' | 'ai'
  content: string
}

const messages = ref<Message[]>([
  {
    role: 'ai',
    content: '¡Hola! Soy tu asistente musical. ¿En qué puedo ayudarte?'
  }
])
const userMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement>()

async function sendMessage() {
  if (!userMessage.value.trim()) return

  const message = userMessage.value
  userMessage.value = ''
  
  messages.value.push({ role: 'user', content: message })
  
  isTyping.value = true
  
  try {
    const response = await aiService.chat(message)
    messages.value.push({ role: 'ai', content: response })
  } catch (error) {
    messages.value.push({ role: 'ai', content: 'Lo siento, hubo un error. Intenta de nuevo.' })
  } finally {
    isTyping.value = false
    await nextTick()
    scrollToBottom()
  }
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const emit = defineEmits(['close'])

function toggleChat() {
  emit('close')
}
</script>

<style scoped>
.ai-chat {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 350px;
  max-height: 500px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface-alt);
  border-radius: 16px 16px 0 0;
}

.chat-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
}

.close-button {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: var(--accent);
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
}

.message {
  display: flex;
}

.message.user {
  justify-content: flex-end;
}

.message.ai {
  justify-content: flex-start;
}

.message-content {
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-size: 0.875rem;
  line-height: 1.4;
}

.message.user .message-content {
  background: linear-gradient(135deg, #5ce1e6, #4db8b8);
  color: #020617;
  border-bottom-right-radius: 4px;
}

.message.ai .message-content {
  background: var(--surface-alt);
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-bottom-left-radius: 4px;
}

.message.typing .message-content {
  opacity: 0.7;
}

.chat-input {
  padding: 1rem;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 0.5rem;
  border-radius: 0 0 16px 16px;
}

.input-field {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-alt);
  color: var(--accent);
  font-size: 0.875rem;
}

.input-field:focus {
  outline: none;
  border-color: var(--accent);
}

.send-button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #5ce1e6, #4db8b8);
  border: none;
  border-radius: 8px;
  color: #020617;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(92, 225, 230, 0.3);
}

@media (max-width: 768px) {
  .ai-chat {
    width: calc(100% - 2rem);
    right: 1rem;
    bottom: 1rem;
    max-height: 60vh;
  }
}
</style>
