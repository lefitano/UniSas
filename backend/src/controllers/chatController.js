import * as chatService from '../services/chatService.js'

export async function listar(req, res, next) {
  try {
    const { remetente, destinatario } = req.query
    const mensagens = await chatService.listarMensagens(remetente, destinatario)
    res.json(mensagens)
  } catch (erro) {
    next(erro)
  }
}

export async function criar(req, res, next) {
  try {
    const mensagem = await chatService.enviarMensagem(req.body)
    res.status(201).json(mensagem)
  } catch (erro) {
    next(erro)
  }
}