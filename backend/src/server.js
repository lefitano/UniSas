import 'dotenv/config'
import app from './app.js'
import { SupabaseConexao } from './config/database.js'
import { RedisConexao } from './config/cache.js'

const PORT = process.env.PORT || 3001


const instanciaA = SupabaseConexao.getInstance()
const instanciaB = SupabaseConexao.getInstance()
console.log('[Singleton] Supabase - mesma instância?', instanciaA === instanciaB)

const cacheA = RedisConexao.getInstance()
const cacheB = RedisConexao.getInstance()
console.log('[Singleton] Redis - mesma instância?', cacheA === cacheB)

app.listen(PORT, () => {
  console.log(`Servidor UniSas rodando na porta ${PORT}`)
})
