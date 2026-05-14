<template>
  <main class="search-view">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Platzi Music</h1>
        <p class="hero-subtitle">Descubre música que te inspira</p>
      </div>
    </div>

    <div class="search-container">
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar canciones, artistas..."
          class="search-input"
          @keyup.enter="search"
        />
        <button @click="search" class="search-button">Buscar</button>
        <button @click="clearSearch" class="clear-button">×</button>
      </div>
      <p v-if="searchMessage" class="search-message">{{ searchMessage }}</p>
    </div>

    <transition name="fade">
      <div v-if="isLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Buscando...</p>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="showNotification" class="notification">
        <p>No se encontraron resultados</p>
      </div>
    </transition>

    <div v-if="!isLoading && tracks.length > 0" class="results-grid">
      <div
        v-for="track in tracks"
        :key="track.id"
        :class="['track-card', { 'is-active': selectedTrack === track.id }]"
        @click="selectTrack(track)"
      >
        <div class="track-image">
          <img :src="track.album?.images?.[0]?.url" :alt="track.name" />
          <div class="track-overlay">
            <span class="play-icon">▶</span>
          </div>
        </div>
        <div class="track-info">
          <h3 class="track-name">{{ track.name }}</h3>
          <p class="track-artist">{{ track.artists?.[0]?.name }}</p>
          <p class="track-duration">{{ formatDuration(track.duration_ms) }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useTrackStore } from '@/store'
import trackService from '@/services/track'
import type { Track } from '@/store'

const router = useRouter()
const trackStore = useTrackStore()

const searchQuery = ref('')
const tracks = ref<Track[]>([])
const isLoading = ref(false)
const showNotification = ref(false)
const selectedTrack = ref('')

const searchMessage = computed(() => {
  return tracks.value.length > 0 ? `Encontrados: ${tracks.value.length}` : ''
})

watch(showNotification, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      showNotification.value = false
    }, 3000)
  }
})

async function search() {
  if (!searchQuery.value) return

  isLoading.value = true

  try {
    const res = await trackService.search(searchQuery.value)
    showNotification.value = res.tracks.total === 0
    tracks.value = res.tracks.items
  } catch (error) {
    console.error('Error searching tracks:', error)
    showNotification.value = true
  } finally {
    isLoading.value = false
  }
}

function clearSearch() {
  searchQuery.value = ''
  tracks.value = []
}

function selectTrack(track: Track) {
  selectedTrack.value = track.id
  trackStore.setTrack(track)
  router.push({ name: 'track', params: { id: track.id } })
}

function formatDuration(ms: number): string {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  return `${min}:${sec.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.search-view {
  min-height: 100vh;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  padding: 3rem 1rem;
  margin-bottom: 2rem;
}

.hero-content {
  background: linear-gradient(135deg, rgba(92, 225, 230, 0.1), rgba(246, 224, 94, 0.1));
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(10px);
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
  margin: 0;
}

.search-container {
  max-width: 800px;
  margin: 0 auto 2rem;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface);
  color: var(--accent);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 20px rgba(92, 225, 230, 0.2);
}

.search-button {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #5ce1e6, #4db8b8);
  border: none;
  border-radius: 12px;
  color: #020617;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(92, 225, 230, 0.3);
}

.clear-button {
  padding: 1rem;
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--text-muted);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background: var(--surface);
  color: var(--accent);
}

.search-message {
  text-align: center;
  color: var(--text-muted);
  margin-top: 0.5rem;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.notification {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 99, 71, 0.1);
  border: 1px solid rgba(255, 99, 71, 0.3);
  border-radius: 12px;
  color: #ff6347;
  margin-bottom: 2rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.track-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.track-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(92, 225, 230, 0.15);
  border-color: var(--accent);
}

.track-card.is-active {
  border-color: var(--accent-strong);
  box-shadow: 0 0 24px rgba(246, 224, 94, 0.2);
}

.track-image {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
}

.track-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.track-card:hover .track-image img {
  transform: scale(1.05);
}

.track-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.track-card:hover .track-overlay {
  opacity: 1;
}

.play-icon {
  font-size: 2rem;
  color: var(--accent);
}

.track-info {
  padding: 1rem;
}

.track-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: var(--accent);
}

.track-artist {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0 0 0.25rem 0;
}

.track-duration {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .search-bar {
    flex-direction: column;
  }

  .search-input,
  .search-button,
  .clear-button {
    width: 100%;
  }

  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
}
</style>
