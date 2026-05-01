// Serviço de usuários
// Atualmente usa localStorage — substituir pelas chamadas à API quando o backend estiver pronto

import * as api from './api.js'

const CHAVE_USUARIO  = 'unisas_usuario'
const CHAVE_USUARIOS = 'unisas_usuarios'

// ─── Usuário logado ────────────────────────────────────────────────────────────

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

// ─── CRUD de usuários (gerenciado pelo diretor) ────────────────────────────────

export function getUsuarios() {
  const dados = localStorage.getItem(CHAVE_USUARIOS)
  return dados ? JSON.parse(dados) : []
}

function salvarUsuarios(lista) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista))
}

export function adicionarUsuario(dados) {
  const lista = getUsuarios()
  const novo = { ...dados, id: Date.now().toString(), criadoEm: new Date().toISOString() }
  salvarUsuarios([...lista, novo])
  return novo
  // TODO (backend pronto): substituir por chamada à API para criar usuário
}

export function atualizarUsuario(id, dados) {
  const lista = getUsuarios().map(u => u.id === id ? { ...u, ...dados } : u)
  salvarUsuarios(lista)
  // TODO (backend pronto): substituir por chamada à API para atualizar usuário
}

export function removerUsuario(id) {
  salvarUsuarios(getUsuarios().filter(u => u.id !== id))
  // TODO (backend pronto): substituir por chamada à API para remover usuário
}

export function getUsuarioPorId(id) {
  return getUsuarios().find(u => u.id === id) || null
  // TODO (backend pronto): substituir por chamada à API para buscar usuário por id
}
