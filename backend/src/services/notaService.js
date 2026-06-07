import { supabase } from '../config/supabase.js'
import { AppError } from '../middlewares/errorMiddleware.js'

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