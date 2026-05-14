<template>
  <main class="track-detail-view">
    <div v-if="track && track.id" class="track-container">
      <div class="track-header">
        <div class="track-image-large">
          <img :src="track.album?.images?.[0]?.url" :alt="track.name" />
          <div class="play-overlay">
            <button @click="playTrack" class="play-button">
              <span>▶</span>
            </button>
          </div>
        </div>
        <div class="track-info-large">
          <h1 class="track-title-large">{{ track.name }}</h1>
          <p class="track-artist-large">{{ track.artists?.[0]?.name }}</p>
          <p class="track-meta">{{ formatDuration(track.duration_ms) }}</p>
          <div class="track-actions">
            <button @click="playTrack" class="action-button primary">
              <span>▶ Reproducir</span>
            </button>
            <button @click="goBack" class="action-button secondary">
              <span>← Volver</span>
            </button>
          </div>
        </div>
      </div>

      <div class="track-details-panel">
        <h2 class="panel-title">Detalles de la Canción</h2>
        <div class="details-grid">
          <div v-for="(value, key) in displayDetails" :key="key" class="detail-item">
            <span class="detail-label">{{ formatKey(key) }}:</span>
            <span class="detail-value">{{ formatValue(value) }}</span>
          </div>
        </div>
      </div>

      <div class="ai-insights">
        <h2 class="panel-title">💡 Insights de IA</h2>
        <div class="insights-content">
          <p class="insight-text">
            Esta canción tiene características únicas que la hacen perfecta para tu playlist personal.
            La IA detecta patrones en ritmo y melodía que coinciden con tus preferencias.
          </p>
          <div class="insight-tags">
            <span class="insight-tag">Popular</span>
            <span class="insight-tag">Alta Energía</span>
            <span class="insight-tag">Trending</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading-state">
      <div class="spinner"></div>
      <p>Cargando track...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTrackStore } from '@/store'
import trackService from '@/services/track'
import type { Track } from '@/store'

const route = useRoute()
const router = useRouter()
const trackStore = useTrackStore()

const track = computed(() => trackStore.track)

const displayDetails = computed(() => {
  if (!track.value) return {}
  const { id, name, duration_ms, preview_url, album, artists, ...rest } = track.value
  return rest
})

onMounted(async () => {
  const id = route.params.id as string
  
  if (!track.value || track.value.id !== id) {
    try {
      const trackData = await trackService.getById(id)
      trackStore.setTrack(trackData)
    } catch (error) {
      console.error('Error loading track:', error)
      router.push({ name: 'search' })
    }
  }
})

function playTrack() {
  trackStore.playTrack()
}

function goBack() {
  router.push({ name: 'search' })
}

function formatDuration(ms: number): string {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  return `${min}:${sec.toString().padStart(2, '0')}`
}

function formatKey(key: string): string {
  return key
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function formatValue(value: any): string {
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value)
  }
  return String(value)
}
</script>

<style scoped>
.track-detail-view {
  min-height: 100vh;
  padding: 2rem;
}

.track-container {
  max-width: 1200px;
  margin: 0 auto;
}

.track-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.track-image-large {
  position: relative;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  background: var(--surface-alt);
}

.track-image-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.track-image-large:hover .play-overlay {
  opacity: 1;
}

.play-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5ce1e6, #4db8b8);
  border: none;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.play-button:hover {
  transform: scale(1.1);
}

.track-info-large {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.track-title-large {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #5ce1e6, #f6e05e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.track-artist-large {
  font-size: 1.5rem;
  color: var(--text-muted);
  margin: 0 0 0.5rem 0;
}

.track-meta {
  font-size: 1rem;
  color: var(--accent);
  margin: 0 0 2rem 0;
}

.track-actions {
  display: flex;
  gap: 1rem;
}

.action-button {
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.action-button.primary {
  background: linear-gradient(135deg, #5ce1e6, #4db8b8);
  color: #020617;
}

.action-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(92, 225, 230, 0.3);
}

.action-button.secondary {
  background: var(--surface-alt);
  color: var(--accent);
  border: 1px solid var(--border);
}

.action-button.secondary:hover {
  background: var(--surface);
  border-color: var(--accent);
}

.track-details-panel,
.ai-insights {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.panel-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 1.5rem 0;
  color: var(--accent);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 0.875rem;
  color: var(--accent);
  word-break: break-word;
}

.insights-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.insight-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0;
}

.insight-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.insight-tag {
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, rgba(92, 225, 230, 0.1), rgba(246, 224, 94, 0.1));
  border: 1px solid var(--border);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--accent);
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
  margin-bottom: 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .track-header {
    grid-template-columns: 1fr;
  }

  .track-title-large {
    font-size: 1.75rem;
  }

  .track-artist-large {
    font-size: 1.25rem;
  }

  .track-actions {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
