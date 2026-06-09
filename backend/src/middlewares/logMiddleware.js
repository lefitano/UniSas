export function logRequisicoes(req, res, next) {
  const inicio = Date.now()
  res.on('finish', () => {
    const duracao = Date.now() - inicio
    const data = new Date().toISOString()
    console.log(`[${data}] ${req.method} ${req.path} ${res.statusCode} - ${duracao}ms`)
  })
  next()
}
