export function validarCampos(campos) {
    return (req, res, next) => {
        const faltando = campos.filter(campo =>
            req.body[campo] === undefined || req.body[campo] === null || req.body[campo] === ''
        )
        if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Campos obrigatórios faltando: ${faltando.join(', ')}`
            })
        }
        next()
    }
}

export function validarEmail(req, res, next) {
    const { email } = req.body
    if (!email) return next()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ erro: 'Formato de email inválido' })
    }
    next()
}

export function validarNota(req, res, next) {
    const { nota } = req.body
    if (nota === undefined || nota === null || nota === '') return next()
    const valor = Number(nota)
    if (isNaN(valor) || valor < 0 || valor > 10) {
        return res.status(400).json({ erro: 'Nota deve ser um número entre 0 e 10' })
    }
    next()
}

export function validarCPF(req, res, next) {
    const { cpf } = req.body
    if (!cpf) return next()
    const nums = cpf.replace(/\D/g, '')
    if (nums.length !== 11) {
        return res.status(400).json({ erro: 'CPF deve ter exatamente 11 dígitos' })
    }
    next()
}