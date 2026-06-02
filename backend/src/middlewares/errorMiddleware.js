export function tratarErros(err, req, res, next) {
  const status = err.statusCode || 500
  console.error(err.message)
  res.status(status).json({ erro: err.message })
}