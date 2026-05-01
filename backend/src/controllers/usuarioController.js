import * as usuarioService from '../services/usuarioService.js'

export async function listar(req, res) {
  // TODO: buscar todos os usuários via usuarioService.listarUsuarios()
  // TODO: retornar a lista como JSON
}

export async function buscarPorId(req, res) {
  // TODO: obter o id a partir da URL (req.params)
  // TODO: buscar o usuário via usuarioService.buscarUsuarioPorId(id)
  // TODO: retornar erro 404 se não encontrado, ou o usuário como JSON
}

export async function criar(req, res) {
  // TODO: obter os dados do corpo da requisição (req.body)
  // TODO: criar o usuário via usuarioService.criarUsuario(dados)
  // TODO: retornar o usuário criado com status 201
}

export async function atualizar(req, res) {
  // TODO: obter o id da URL e os dados do corpo da requisição
  // TODO: atualizar via usuarioService.atualizarUsuario(id, dados)
  // TODO: retornar o usuário atualizado como JSON
}

export async function remover(req, res) {
  // TODO: obter o id a partir da URL
  // TODO: remover via usuarioService.removerUsuario(id)
  // TODO: retornar status 204 (sem conteúdo)
}
