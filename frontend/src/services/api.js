// Configuração base para todas as chamadas ao backend
// Quando o backend estiver pronto, só mude BASE_URL aqui e tudo funciona

const BASE_URL = 'http://localhost:3001/api'

export async function get(endpoint) {
  const resposta = await fetch(`${BASE_URL}${endpoint}`)
  if (!resposta.ok) throw new Error(`Erro ${resposta.status}`)
  return resposta.json()
}

export async function post(endpoint, dados) {
  const resposta = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  if (!resposta.ok) throw new Error(`Erro ${resposta.status}`)
  return resposta.json()
}

export async function put(endpoint, dados) {
  const resposta = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
  if (!resposta.ok) throw new Error(`Erro ${resposta.status}`)
  return resposta.json()
}

export async function del(endpoint) {
  const resposta = await fetch(`${BASE_URL}${endpoint}`, { method: 'DELETE' })
  if (!resposta.ok) throw new Error(`Erro ${resposta.status}`)
  return resposta.json()
}
