import { db } from '../config/database.js'

export async function listarUsuarios() {
  // TODO: buscar e retornar todos os usuários do banco de dados
}

export async function buscarUsuarioPorId(id) {
  // TODO: buscar e retornar um usuário pelo id no banco de dados
}

export async function criarUsuario(dados) {
  // TODO: validar se o email já está cadastrado
  // TODO: aplicar hash na senha antes de salvar
  // TODO: inserir o novo usuário no banco de dados
}

export async function atualizarUsuario(id, dados) {
  // TODO: verificar se o usuário existe antes de atualizar
  // TODO: atualizar os dados do usuário no banco de dados
}

export async function removerUsuario(id) {
  // TODO: verificar se o usuário existe antes de remover
  // TODO: remover o usuário do banco de dados
}
