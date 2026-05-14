import api from './api'
import type { Track } from '@/store'

interface ITunesTrack {
  trackId: number
  trackName: string
  artistName: string
  collectionName: string
  previewUrl: string
  artworkUrl100: string
  trackTimeMillis: number
}

interface ITunesResponse {
  resultCount: number
  results: ITunesTrack[]
}

interface SearchResponse {
  tracks: {
    total: number
    items: Track[]
  }
}

// Convert iTunes track format to our Track format
function convertITunesTrack(iTunesTrack: ITunesTrack): Track {
  return {
    id: String(iTunesTrack.trackId),
    name: iTunesTrack.trackName,
    duration_ms: iTunesTrack.trackTimeMillis,
    preview_url: iTunesTrack.previewUrl,
    album: {
      images: [
        {
          url: iTunesTrack.artworkUrl100.replace('100x100', '600x600')
        }
      ]
    },
    artists: [
      {
        name: iTunesTrack.artistName
      }
    ]
  }
}

const trackService = {
  async search(q: string): Promise<SearchResponse> {
    const response = await api.get('', {
      params: {
        term: q,
        media: 'music',
        entity: 'song',
        limit: 20
      }
    })
    
    const iTunesData: ITunesResponse = response.data
    const tracks = iTunesData.results.map(convertITunesTrack)
    
    return {
      tracks: {
        total: iTunesData.resultCount,
        items: tracks
      }
    }
  },

  async getById(id: string): Promise<Track> {
    const response = await api.get('', {
      params: {
        term: id,
        media: 'music',
        entity: 'song',
        limit: 1
      }
    })
    
    const iTunesData: ITunesResponse = response.data
    if (iTunesData.results.length === 0) {
      throw new Error('Track not found')
    }
    
    return convertITunesTrack(iTunesData.results[0])
  }
}

export default trackService
