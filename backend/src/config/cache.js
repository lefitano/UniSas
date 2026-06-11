import { createClient } from 'redis'

class RedisConexao {
  static #instancia = null

  #cliente

  constructor() {
    this.#cliente = createClient({
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

    this.#cliente.on('error', (err) => console.error('[Redis] Erro de conexão:', err.message))
    this.#cliente.on('connect', () => console.log('[Redis] Conectado com sucesso'))
    this.#cliente.connect().catch(err =>
      console.error('[Redis] Servidor não encontrado, cache desativado:', err.message)
    )

    console.log('[Redis] Nova instância criada.')
  }

  static getInstance() {
    if (!RedisConexao.#instancia) {
      RedisConexao.#instancia = new RedisConexao()
    }
    return RedisConexao.#instancia
  }

  getCliente() {
    return this.#cliente
  }
}

export { RedisConexao }
export default RedisConexao.getInstance().getCliente()
