<template>
  <div class="player">
    <div v-if="track && track.album" class="player-content">
      <div class="player-image">
        <img :src="track.album.images[0]?.url" :alt="track.name" />
      </div>
      <div class="player-info">
        <p class="player-title">{{ track.name }}</p>
        <p class="player-duration">{{ formatDuration(track.duration_ms) }}</p>
      </div>
      <div class="player-controls">
        <button @click="togglePlay" class="play-button">
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
      </div>
    </div>
    <div v-else class="player-placeholder">
      <p>Selecciona una canción para reproducir</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTrackStore } from '@/store'

const trackStore = useTrackStore()

const track = computed(() => trackStore.track)
const isPlaying = computed(() => trackStore.isPlaying)

function togglePlay() {
  if (isPlaying.value) {
    trackStore.pauseTrack()
  } else {
    trackStore.playTrack()
  }
}

function formatDuration(ms: number): string {
  const min = Math.floor(ms / 60000)
  const sec = Math.floor((ms % 60000) / 1000)
  return `${min}:${sec.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.player {
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
}

.player-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.player-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent);
  box-shadow: 0 0 20px rgba(92, 225, 230, 0.3);
}

.player-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-info {
  text-align: center;
}

.player-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
  margin: 0 0 0.25rem 0;
}

.player-duration {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
}

.player-controls {
  width: 100%;
}

.player-audio {
  width: 100%;
  height: 40px;
}

.player-placeholder {
  text-align: center;
  color: var(--text-muted);
  padding: 1rem;
}

@media (max-width: 768px) {
  .player {
    max-width: 100%;
  }

  .player-image {
    width: 80px;
    height: 80px;
  }
}
</style>
