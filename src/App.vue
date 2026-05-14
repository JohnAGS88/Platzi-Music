<template>
  <div id="app">
    <AppHeader />
    <router-view />
    <AppFooter />
    <AIChat v-if="showChat" @close="showChat = false" />
    <button v-else @click="showChat = true" class="chat-toggle">🤖</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/layout/Header.vue'
import AppFooter from '@/components/layout/Footer.vue'
import AIChat from '@/components/AIChat.vue'

const showChat = ref(false)
</script>

<style>
@import './styles/global.scss';

.chat-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5ce1e6, #4db8b8);
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(92, 225, 230, 0.3);
  transition: all 0.3s ease;
  z-index: 999;
}

.chat-toggle:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(92, 225, 230, 0.4);
}
</style>
