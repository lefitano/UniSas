import { getToken } from './api.js'

const BASE_URL = 'http://localhost:3001/api'

export async function uploadPDF(arquivo) {
  const formData = new FormData()
  formData.append('arquivo', arquivo)

  const resposta = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  })

  if (!resposta.ok) {
    const corpo = await resposta.json().catch(() => ({}))
    throw new Error(corpo.erro || 'Erro ao fazer upload do arquivo.')
  }

  return resposta.json()
}
