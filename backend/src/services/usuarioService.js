import supabase from '../config/database.js'
import { ErrorFactory } from '../middlewares/errorFactory.js'

export async function listarUsuarios(pagina, limite) {
  const selecao = 'id, nome, email, perfil, matricula, registro_funcional, disciplina, cpf, codigo_aluno, escola, turma_id, criado_em'

  if (pagina && limite) {
    const from = (pagina - 1) * limite
    const to = from + limite - 1
    const { data, error, count } = await supabase.from('usuarios')
      .select(selecao, { count: 'exact' })
      .range(from, to)
    if (error) throw ErrorFactory.interno('Não foi possível listar os usuarios')
    return { dados: data, total: count, pagina, limite, totalPaginas: Math.ceil(count / limite) }
  }

  const { data, error } = await supabase.from('usuarios').select(selecao)
  if (error) throw ErrorFactory.interno('Não foi possível listar os usuarios')
  return data
}

export async function buscarUsuarioPorId(id) {
  const {data, error} = await supabase.from('usuarios')
  .select('id, nome, email, perfil, matricula, registro_funcional, cpf, codigo_aluno, escola, criado_em')
  .eq('id', id)
  .single()

  if(error) throw ErrorFactory.naoEncontrado('Usuário não encontrado')
    return data;
}

export async function criarUsuario(dados) {
 const {data, error} = await supabase.from('usuarios')
  .insert(dados)
  .select('id, nome, email, perfil, criado_em ')
  .single()

  if(error) throw ErrorFactory.invalido(error.message)
    return data

}

export async function atualizarUsuario(id, dados) {
  const {data, error} = await supabase.from('usuarios')
  .update(dados)
  .eq('id', id)
  .select('id, nome, email, perfil, criado_em')
  .single()
  

  if(error) throw ErrorFactory.interno('Erro ao atualizar o usuario')
    return data

}

export async function removerUsuario(id) {
  const { error } = await supabase.from('usuarios')
  .delete()
  .eq('id', id)

  if(error) throw ErrorFactory.interno('Erro ao remover usuario')

  


}
