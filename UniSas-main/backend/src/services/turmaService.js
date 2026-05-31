import supabase from '../config/database.js'

export async function listarTurmas() {
  const { data, error } = await supabase
    .from('turmas')
    .select('id, nome, turno, ano_letivo, criado_em')
    .order('nome')
  if (error) throw new Error('Não foi possível listar as turmas')
  return data
}

export async function buscarTurmaPorId(id) {
  const { data, error } = await supabase
    .from('turmas')
    .select('id, nome, turno, ano_letivo, criado_em')
    .eq('id', id)
    .single()
  if (error) throw new Error('Turma não encontrada')
  return data
}

export async function criarTurma(dados) {
  const { data, error } = await supabase
    .from('turmas')
    .insert(dados)
    .select('id, nome, turno, ano_letivo, criado_em')
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function atualizarTurma(id, dados) {
  const { data, error } = await supabase
    .from('turmas')
    .update(dados)
    .eq('id', id)
    .select('id, nome, turno, ano_letivo, criado_em')
    .single()
  if (error) throw new Error('Erro ao atualizar a turma')
  return data
}

export async function removerTurma(id) {
  const { error } = await supabase
    .from('turmas')
    .delete()
    .eq('id', id)
  if (error) throw new Error('Erro ao remover turma')
}
