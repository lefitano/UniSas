const CHAVE_USUARIO  = 'unisas_usuario'
const CHAVE_USUARIOS = 'unisas_usuarios'

// --- Usuário logado ---

export function getUsuario() {
  const dados = localStorage.getItem(CHAVE_USUARIO)
  if (!dados) return null
  return JSON.parse(dados)
}

export function salvarUsuario(dados) {
  localStorage.setItem(CHAVE_USUARIO, JSON.stringify(dados))
}

export function limparUsuario() {
  localStorage.removeItem(CHAVE_USUARIO)
}

// --- Lista de usuários gerenciados pelo diretor (CRUD) ---

export function getUsuarios() {
  const dados = localStorage.getItem(CHAVE_USUARIOS)
  if (!dados) return []
  return JSON.parse(dados)
}

export function salvarUsuarios(lista) {
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(lista))
}

export function adicionarUsuario(dados) {
  const lista = getUsuarios()
  const novo = { ...dados, id: Date.now().toString(), criadoEm: new Date().toISOString() }
  salvarUsuarios([...lista, novo])
  return novo
}

export function atualizarUsuario(id, dados) {
  const lista = getUsuarios().map(u => u.id === id ? { ...u, ...dados } : u)
  salvarUsuarios(lista)
}

export function removerUsuario(id) {
  salvarUsuarios(getUsuarios().filter(u => u.id !== id))
}

export function getUsuarioPorId(id) {
  return getUsuarios().find(u => u.id === id) || null
}

export function getIniciais(nome) {
  if (!nome) return '?'
  const partes = nome.trim().split(' ').filter(Boolean)
  if (partes.length === 1) return partes[0].substring(0, 2).toUpperCase()
  return (partes[0][0] + partes[1][0]).toUpperCase()
}

export function getSaudacao() {
  const hora = new Date().getHours()
  if (hora < 12) return 'Bom dia'
  if (hora < 18) return 'Boa tarde'
  return 'Boa noite'
}

export const avatarCores = {
  aluno:      '#2D7A3A',
  professor:  '#854F0B',
  responsavel:'#185FA5',
  diretor:    '#A32D2D',
}
