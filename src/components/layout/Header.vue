<template>
  <header class="app-header">
    <nav class="nav">
      <div class="nav-container">
        <div class="nav-brand">
          <router-link :to="{ name: 'search' }" class="brand-link">
            <span class="brand-icon">📻</span>
            <span class="brand-text">Platzi Music</span>
          </router-link>
        </div>
        <div class="nav-menu">
          <router-link :to="{ name: 'search' }" class="nav-link">Buscar</router-link>
          <router-link :to="{ name: 'about' }" class="nav-link">Nosotros</router-link>
        </div>
      </div>
    </nav>
    <div class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Platzi Music</h1>
        <p class="hero-subtitle">Canciones que están Vue-nisimas!</p>
        <Player />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Player from '@/components/Player.vue'
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, rgba(92, 225, 230, 0.1), rgba(246, 224, 94, 0.05));
  border-bottom: 1px solid var(--border);
}

.nav {
  padding: 1rem 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--accent);
  font-size: 1.25rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.brand-link:hover {
  transform: translateY(-2px);
}

.brand-icon {
  font-size: 1.5rem;
}

.brand-text {
  background: linear-gradient(135deg, #5ce1e6, #f6e05e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--accent);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(135deg, #5ce1e6, #f6e05e);
  border-radius: 2px;
}

.hero {
  padding: 3rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #5ce1e6, #f6e05e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin: 0 0 2rem 0;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-menu {
    gap: 1rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }
}
</style>
