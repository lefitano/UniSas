const isProducao = window.location.hostname !== 'localhost'
const BASE_URL = isProducao
  ? 'https://unisas-production.up.railway.app/api'
  : 'http://localhost:3001/api'

const CHAVE_TOKEN = 'unisas_token'

export function salvarToken(token) {
  localStorage.setItem(CHAVE_TOKEN, token)
}

export function getToken() {
  return localStorage.getItem(CHAVE_TOKEN)
}

export function removerToken() {
  localStorage.removeItem(CHAVE_TOKEN)
}

function montarHeaders(incluirAuth = true) {
  const headers = { 'Content-Type': 'application/json' }

  if (incluirAuth) {
    const token = getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
  }

  return headers
}

async function checarResposta(resposta) {
  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => ({}))
    throw new Error(corpo.erro || `Erro ${resposta.status}`)
  }
  return resposta
}

export async function get(endpoint) {
  const resposta = await fetch(`${BASE_URL}${endpoint}`, {
    headers: montarHeaders(),
  })
  await checarResposta(resposta)
  return resposta.json()
}

export async function post(endpoint, dados, incluirAuth = true) {
  const resposta = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: montarHeaders(incluirAuth),
    body: JSON.stringify(dados),
  })
  if (resposta.status === 204) return null
  await checarResposta(resposta)
  return resposta.json()
}

export async function put(endpoint, dados) {
  const resposta = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: montarHeaders(),
    body: JSON.stringify(dados),
  })
  await checarResposta(resposta)
  return resposta.json()
}

export async function del(endpoint) {
  const resposta = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers: montarHeaders(),
  })
  if (resposta.status === 204) return null
  await checarResposta(resposta)
  return resposta.json()
}
