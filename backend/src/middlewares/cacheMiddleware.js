import redis from '../config/cache.js'

const TTL_SEGUNDOS = 60

export function usarCache(chave) {
  return async (req, res, next) => {
    try {
      const cached = await redis.get(chave)
      if (cached) {
        return res.json(JSON.parse(cached))
      }

      const jsonOriginal = res.json.bind(res)
      res.json = (dados) => {
        redis.setEx(chave, TTL_SEGUNDOS, JSON.stringify(dados)).catch(() => {})
        return jsonOriginal(dados)
      }
    } catch {
      // se Redis estiver indisponível, continua sem cache
    }
    next()
  }
}

export function invalidarCache(...chaves) {
  return async (req, res, next) => {
    try {
      await Promise.all(chaves.map(c => redis.del(c)))
    } catch {
      // falha silenciosa — não bloqueia a requisição
    }
    next()
  }
}
