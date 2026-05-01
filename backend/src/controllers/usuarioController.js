import * as usuarioService from '../services/usuarioService.js'

export async function listar(req, res) {
  // TODO: const usuarios = await usuarioService.listarUsuarios()
  // TODO: res.json(usuarios)
}

export async function buscarPorId(req, res) {
  // TODO: const { id } = req.params
  // TODO: const usuario = await usuarioService.buscarUsuarioPorId(id)
  // TODO: if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' })
  // TODO: res.json(usuario)
}

export async function criar(req, res) {
  // TODO: const dados = req.body
  // TODO: const novoUsuario = await usuarioService.criarUsuario(dados)
  // TODO: res.status(201).json(novoUsuario)
}

export async function atualizar(req, res) {
  // TODO: const { id } = req.params
  // TODO: const dados = req.body
  // TODO: const atualizado = await usuarioService.atualizarUsuario(id, dados)
  // TODO: res.json(atualizado)
}

export async function remover(req, res) {
  // TODO: const { id } = req.params
  // TODO: await usuarioService.removerUsuario(id)
  // TODO: res.status(204).send()
}
