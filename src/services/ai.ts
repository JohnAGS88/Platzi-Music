interface AIRecommendation {
  trackId: string
  score: number
  reason: string
}

interface AIInsight {
  title: string
  description: string
  tags: string[]
}

const aiService = {
  async getRecommendations(trackId: string): Promise<AIRecommendation[]> {
    // Simulated AI recommendations - in production, this would call an AI API
    const recommendations: AIRecommendation[] = [
      {
        trackId: '1',
        score: 0.95,
        reason: 'Similar energy and tempo'
      },
      {
        trackId: '2',
        score: 0.88,
        reason: 'Same artist and genre'
      },
      {
        trackId: '3',
        score: 0.82,
        reason: 'Popular in your region'
      }
    ]
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return recommendations
  },

  async getInsights(trackId: string): Promise<AIInsight> {
    // Simulated AI insights - in production, this would analyze track data
    const insights: AIInsight = {
      title: 'Análisis de Canción',
      description: 'Esta canción tiene características únicas que la hacen perfecta para tu playlist personal. La IA detecta patrones en ritmo y melodía que coinciden con tus preferencias.',
      tags: ['Popular', 'Alta Energía', 'Trending', 'Bailable']
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    return insights
  },

  async chat(message: string, context?: string): Promise<string> {
    // Simulated conversational AI - in production, this would use a real AI model
    const responses: Record<string, string> = {
      'busca': '¿Qué tipo de música te gustaría buscar? Puedo ayudarte a encontrar canciones por artista, género o mood.',
      'recomienda': 'Basándome en tus preferencias, te recomiendo explorar los trending de esta semana. ¿Quieres que te muestre algunos?',
      'playlist': 'Puedo crear una playlist personalizada para ti. ¿Para qué ocasión? (trabajo, ejercicio, relajación, etc.)',
      'default': '¡Hola! Soy tu asistente musical. Puedo ayudarte a buscar canciones, crear playlists o descubrir nueva música. ¿Qué te gustaría hacer?'
    }
    
    // Simple keyword matching
    const lowerMessage = message.toLowerCase()
    let response = responses.default
    
    if (lowerMessage.includes('busca') || lowerMessage.includes('buscar')) {
      response = responses.busca
    } else if (lowerMessage.includes('recomienda') || lowerMessage.includes('recomendación')) {
      response = responses.recomienda
    } else if (lowerMessage.includes('playlist') || lowerMessage.includes('lista')) {
      response = responses.playlist
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return response
  }
}

export default aiService
