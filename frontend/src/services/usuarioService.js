import * as api from './api.js'

const CHAVE_USUARIO = 'unisas_usuario'

export function getUsuario() {
  const dados = localStorage.getItem(CHAVE_USUARIO)
  return dados ? JSON.parse(dados) : null
}

export function salvarUsuario(dados) {
  localStorage.setItem(CHAVE_USUARIO, JSON.stringify(dados))
}

export function limparUsuario() {
  localStorage.removeItem(CHAVE_USUARIO)
}

export async function getUsuarios() {
  return api.get('/usuarios')
}

export async function getUsuarioPorId(id) {
  return api.get(`/usuarios/${id}`)
}

export async function adicionarUsuario(dados) {
  return api.post('/usuarios', dados)
}

export async function atualizarUsuario(id, dados) {
  return api.put(`/usuarios/${id}`, dados)
}

export async function removerUsuario(id) {
  return api.del(`/usuarios/${id}`)
}
