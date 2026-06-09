import supabase from '../config/database.js'
import { AppError } from '../middlewares/AppError.js'

export async function listarNotas(alunoId) {
  const query = supabase
    .from('entregas')
    .select('id, atividade_id, aluno_id, data_entrega, nota, atividades(titulo, prazo, turma_id)')
    .not('nota', 'is', null)
    .order('data_entrega', { ascending: false })

  if (alunoId) query.eq('aluno_id', alunoId)

  const { data, error } = await query
  if (error) throw new AppError('Não foi possível listar as notas', 500)
  return data
}

export async function buscarNotaPorId(id) {
  const { data, error } = await supabase
    .from('entregas')
    .select('id, atividade_id, aluno_id, data_entrega, nota, atividades(titulo, prazo, turma_id)')
    .eq('id', id)
    .single()
  if (error) throw new AppError('Nota não encontrada', 404)
  return data
}

export async function lancarNota(id, nota) {
  const { data, error } = await supabase
    .from('entregas')
    .update({ nota })
    .eq('id', id)
    .select('id, atividade_id, aluno_id, data_entrega, nota')
    .single()
  if (error) throw new AppError('Erro ao lançar nota', 500)
  return data
}

export async function criarNota(dados) {
  const { data, error } = await supabase
    .from('entregas')
    .insert(dados)
    .select('id, atividade_id, aluno_id, data_entrega, nota')
    .single()
  if (error) throw new AppError(error.message, 400)
  return data
}