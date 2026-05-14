<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <p class="footer-text">💻 Hecho con ❤️ por @jgoyosilva88</p>
        <p class="footer-version">Platzi Music v2.0 - Powered by Vue 3 + Vite + AI</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-footer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 2rem 0;
  margin-top: auto;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-content {
  text-align: center;
}

.footer-text {
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0 0 0.5rem 0;
}

.footer-version {
  font-size: 0.875rem;
  color: var(--accent);
  margin: 0;
  opacity: 0.7;
}
</style>
