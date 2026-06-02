import supabase from '../config/database.js'
import { AppError } from '../middlewares/AppError.js'

export async function listarUsuarios() {
  const {data, error} = await supabase.from('usuarios')
  .select('id, nome, email, perfil, matricula, registro_funcional, disciplina, cpf, codigo_aluno, escola, turma_id, criado_em');

  if(error) throw new AppError('Não foi possível listar os usuarios', 500)
    return data;
}

export async function buscarUsuarioPorId(id) {
  const {data, error} = await supabase.from('usuarios')
  .select('id, nome, email, perfil, matricula, registro_funcional, cpf, codigo_aluno, escola, criado_em')
  .eq('id', id)
  .single()

  if(error) throw new AppError('Usuário não encontrado', 404)
    return data;
}

export async function criarUsuario(dados) {
 const {data, error} = await supabase.from('usuarios')
  .insert(dados)
  .select('id, nome, email, perfil, criado_em ')
  .single()

  if(error) throw new AppError(error.message, 400)
    return data

}

export async function atualizarUsuario(id, dados) {
  const {data, error} = await supabase.from('usuarios')
  .update(dados)
  .eq('id', id)
  .select('id, nome, email, perfil, criado_em')
  .single()
  

  if(error) throw new AppError('Erro ao atualizar o usuario', 500)
    return data

}

export async function removerUsuario(id) {
  const { error } = await supabase.from('usuarios')
  .delete()
  .eq('id', id)

  if(error) throw new AppError('Erro ao remover usuario', 500)

  


}
