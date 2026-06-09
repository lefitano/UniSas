import * as recuperacaoService from '../services/recuperacaoService.js'

export async function solicitar(req, res, next) {
  try {
    const { email } = req.body
    const resultado = await recuperacaoService.solicitarRecuperacao(email)
    res.json(resultado)
  } catch (erro) {
    next(erro)
  }
}

export async function redefinir(req, res, next) {
  try {
    const { token, novaSenha } = req.body
    const resultado = await recuperacaoService.redefinirSenha(token, novaSenha)
    res.json(resultado)
  } catch (erro) {
    next(erro)
  }
}
