<template>
  <main class="about-view">
    <div class="about-container">
      <h1 class="about-title">Sobre Platzi Music</h1>
      <div class="about-content">
        <p class="about-text">
          Platzi Music es una plataforma moderna para descubrir y explorar música.
          Construida con Vue 3, Vite y las mejores prácticas del desarrollo web.
        </p>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🎵</div>
            <h3 class="feature-title">Búsqueda Inteligente</h3>
            <p class="feature-description">Encuentra tus canciones favoritas al instante</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🤖</div>
            <h3 class="feature-title">Potenciado por IA</h3>
            <p class="feature-description">Recomendaciones personalizadas con inteligencia artificial</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3 class="feature-title">Ultra Rápido</h3>
            <p class="feature-description">Construido con Vite para una experiencia instantánea</p>
          </div>
        </div>
        <div class="tech-stack">
          <h2 class="section-title">Stack Tecnológico</h2>
          <div class="tech-list">
            <span class="tech-tag">Vue 3</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">Vite</span>
            <span class="tech-tag">Pinia</span>
            <span class="tech-tag">Vue Router</span>
            <span class="tech-tag">Axios</span>
          </div>
        </div>
        <div class="footer-credit">
          <p>💻 Hecho con ❤️ por @jgoyosilva88</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
</script>

<style scoped>
.about-view {
  min-height: 100vh;
  padding: 2rem;
}

.about-container {
  max-width: 900px;
  margin: 0 auto;
}

.about-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 2rem 0;
  text-align: center;
  background: linear-gradient(135deg, #5ce1e6, #f6e05e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.about-content {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
}

.about-text {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--text-muted);
  margin: 0 0 2rem 0;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.feature-card {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 8px 24px rgba(92, 225, 230, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--accent);
}

.feature-description {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

.tech-stack {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--accent);
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-tag {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(92, 225, 230, 0.1), rgba(246, 224, 94, 0.1));
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
}

.footer-credit {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.footer-credit p {
  color: var(--text-muted);
  margin: 0;
}

@media (max-width: 768px) {
  .about-title {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .about-content {
    padding: 1.5rem;
  }
}
</style>
