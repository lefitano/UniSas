import supabase from '../config/database.js'
import { AppError } from '../middlewares/AppError.js'

export async function buscarNotasPorAluno(alunoId) {
  const { data, error } = await supabase
    .from('entregas')
    .select('id, atividade_id, nota, atividades(titulo)')
    .eq('aluno_id', alunoId)

  if (error) throw new AppError(error.message, 400)
  return data
}

export async function lancarNota(dados) {
  const { data, error } = await supabase
    .from('entregas')
    .insert([dados])
    .select()
    .single()

  if (error) throw new AppError(error.message, 400)
  return data
}

export async function buscarNotasPorAtividade(atividadeId) {
  const { data, error } = await supabase
    .from('entregas')
    .select('id, aluno_id, atividade_id, nota, data_entrega')
    .eq('atividade_id', atividadeId)

  if (error) throw new AppError(error.message, 400)
  return data
}

export async function alterarNota(id, nota) {
  const { data, error } = await supabase
    .from('entregas')
    .update({ nota })
    .eq('id', id)
    .select()
    .single()

  if (error) throw new AppError(error.message, 400)
  return data
}