import * as api from './api.js'

export async function getMensagens(remetenteId, destinatarioId) {
  return api.get(`/mensagens?remetente=${remetenteId}&destinatario=${destinatarioId}`)
}

export async function enviarMensagem(dados) {
  return api.post('/mensagens', dados)
}
