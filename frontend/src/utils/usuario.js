export function getUsuario() {
  const dados = localStorage.getItem('unisas_usuario')
  if (!dados) return null
  return JSON.parse(dados)
}

export function salvarUsuario(dados) {
  localStorage.setItem('unisas_usuario', JSON.stringify(dados))
}

export function limparUsuario() {
  localStorage.removeItem('unisas_usuario')
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
