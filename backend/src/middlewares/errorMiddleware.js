export function tratarErros(err, req, res, next) {
    console.error(err.message)
    res.status(500).json({ erro: err.message})
}