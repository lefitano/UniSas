import * as authService from '../services/authService.js'

export async function login(req, res) {
  // TODO: obter perfil e senha do corpo da requisição (req.body)
  // TODO: autenticar via authService.autenticar(perfil, senha)
  // TODO: retornar o token gerado como JSON
}

export async function logout(req, res) {
  // TODO: obter o token do cabeçalho da requisição
  // TODO: encerrar a sessão via authService.encerrarSessao(token)
  // TODO: retornar status 204 (sem conteúdo)
}
