import { getPerfisDisponiveis } from '../services/perfilService.js'

export async function listar(req, res) {
  const perfis = await getPerfisDisponiveis()
  res.json(perfis)
}
