import  supabase  from '../config/database.js'

export async function listarUsuarios() {
  const {data, error} = await supabase.from('usuarios')
  .select('id, nome, email, perfil, matricula, registro_funcional, disciplina, cpf, codigo_aluno, escola, criado_em');

  if(error) throw new Error('Não foi possível listar os usuarios')
    return data;
}

export async function buscarUsuarioPorId(id) {
  const {data, error} = await supabase.from('usuarios')
  .select('id, nome, email, perfil, matricula, registro_funcional, cpf, codigo_aluno, escola, criado_em')
  .eq('id', id) // pra comparar é como se fosse um .equals
  .single()

  if(error) throw new Error('Usuário não encontrado')
    return data;
}

export async function criarUsuario(dados) {
 const {data, error} = await supabase.from('usuarios')
  .insert(dados)
  .select('id, nome, email, perfil, criado_em ')
  .single()

  if(error) throw new Error(error.message)
    return data
 
}

export async function atualizarUsuario(id, dados) {
  const {data, error} = await supabase.from('usuarios')
  .update(dados)
  .eq('id', id)
  .select('id, nome, email, perfil, criado_em')
  .single()
  

  if(error) throw new Error('Erro ao atualizar o usuario')
    return data

}

export async function removerUsuario(id) {
  const {data, error} = await supabase.from('usuarios')
  .delete()
  .eq('id', id)

  if(error) throw new Error('Erro ao remover usuario')

  


}
