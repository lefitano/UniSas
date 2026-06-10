import { createClient } from 'redis'

const redis = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (tentativas) => {
      if (tentativas >= 3) {
        console.error('[Redis] Cache desativado — servidor Redis não encontrado.')
        return false
      }
      return tentativas * 500
    }
  }
})

redis.on('error', (err) => console.error('[Redis] Erro de conexão:', err.message))
redis.on('connect', () => console.log('[Redis] Conectado com sucesso'))

redis.connect().catch(err => console.error('[Redis] Servidor não encontrado, cache desativado:', err.message))

export default redis
