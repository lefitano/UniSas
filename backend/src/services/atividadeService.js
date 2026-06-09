import supabase from '../config/database.js'
import { AppError } from '../middlewares/AppError.js'

export async function listarAtividades(turmaId) {
  const query = supabase
    .from('atividades')
    .select('id, turma_id, titulo, descricao, prazo, criado_em')
    .order('criado_em', { ascending: false })

  if (turmaId) query.eq('turma_id', turmaId)

  const { data, error } = await query
  if (error) throw new AppError('Não foi possível listar as atividades', 500)
  return data
}

export async function buscarAtividadePorId(id) {
  const { data, error } = await supabase
    .from('atividades')
    .select('id, turma_id, titulo, descricao, prazo, criado_em')
    .eq('id', id)
    .single()
  if (error) throw new AppError('Atividade não encontrada', 404)
  return data
}

export async function criarAtividade(dados) {
  const { data, error } = await supabase
    .from('atividades')
    .insert(dados)
    .select('id, turma_id, titulo, descricao, prazo, criado_em')
    .single()
  if (error) throw new AppError(error.message, 400)
  return data
}

export async function atualizarAtividade(id, dados) {
  const { data, error } = await supabase
    .from('atividades')
    .update(dados)
    .eq('id', id)
    .select('id, turma_id, titulo, descricao, prazo, criado_em')
    .single()
  if (error) throw new AppError('Erro ao atualizar atividade', 500)
  return data
}

export async function removerAtividade(id) {
  const { error } = await supabase
    .from('atividades')
    .delete()
    .eq('id', id)
  if (error) throw new AppError('Erro ao remover atividade', 500)
}

export async function submeterEntrega(atividadeId, alunoId) {
  const { data, error } = await supabase
    .from('entregas')
    .insert({ atividade_id: atividadeId, aluno_id: alunoId })
    .select('id, atividade_id, aluno_id, data_entrega, nota')
    .single()
  if (error) throw new AppError(error.message, 400)
  return data
}