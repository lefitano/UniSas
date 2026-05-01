import * as usuarioRepository from '../repositories/usuarioRepository.js'

export async function listarUsuarios() {
  // TODO: return usuarioRepository.findAll()
}

export async function buscarUsuarioPorId(id) {
  // TODO: return usuarioRepository.findById(id)
}

export async function criarUsuario(dados) {
  // TODO: validar se email já existe
  // TODO: aplicar hash na senha antes de salvar
  // TODO: return usuarioRepository.save(dados)
}

export async function atualizarUsuario(id, dados) {
  // TODO: validar se o usuário existe antes de atualizar
  // TODO: return usuarioRepository.update(id, dados)
}

export async function removerUsuario(id) {
  // TODO: validar se o usuário existe antes de remover
  // TODO: return usuarioRepository.remove(id)
}
