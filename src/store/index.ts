import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Track {
  id: string
  name: string
  duration_ms: number
  preview_url: string
  album: {
    images: Array<{ url: string }>
  }
  artists: Array<{ name: string }>
}

// Global audio singleton
let globalAudio: HTMLAudioElement | null = null

export const useTrackStore = defineStore('track', () => {
  const track = ref<Track | null>(null)
  const isPlaying = ref(false)

  const trackTitle = computed(() => {
    if (!track.value?.name) return ''
    return `${track.value.name} - ${track.value.artists[0]?.name}`
  })

  function setTrack(newTrack: Track) {
    // Stop previous audio if playing
    if (globalAudio) {
      globalAudio.pause()
      globalAudio.currentTime = 0
    }

    track.value = newTrack
    isPlaying.value = false

    // Create new audio instance
    if (newTrack.preview_url) {
      globalAudio = new Audio(newTrack.preview_url)
      globalAudio.onended = () => {
        isPlaying.value = false
      }
    }
  }

  function playTrack() {
    if (!globalAudio || !track.value) return

    if (isPlaying.value) {
      globalAudio.pause()
      isPlaying.value = false
    } else {
      globalAudio.play()
      isPlaying.value = true
    }
  }

  function pauseTrack() {
    if (globalAudio) {
      globalAudio.pause()
      isPlaying.value = false
    }
  }

  return { track, trackTitle, isPlaying, setTrack, playTrack, pauseTrack }
})
