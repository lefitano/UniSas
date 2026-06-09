import supabase from '../config/database.js'
import { AppError } from '../middlewares/AppError.js'

export async function listarAtividades() {
  const { data, error } = await supabase
    .from('atividades')
    .select('*')

  if (error) throw new AppError(error.message, 400)
  return data
}

export async function criarAtividade(dados) {
  const { data, error } = await supabase
    .from('atividades')
    .insert([dados])
    .select()
    .single()

  if (error) throw new AppError(error.message, 400)
  return data
}

export async function atualizarAtividade(id, dados) {
  const { data, error } = await supabase
    .from('atividades')
    .update(dados)
    .eq('id', id)
    .select()
    .single()

  if (error) throw new AppError(error.message, 400)
  return data
}

export async function removerAtividade(id) {
  const { error } = await supabase
    .from('atividades')
    .delete()
    .eq('id', id)

  if (error) throw new AppError(error.message, 400)
}

export async function submeterEntrega(atividadeId, dados) {
  const { data, error } = await supabase
    .from('entregas')
    .insert([{ ...dados, atividade_id: atividadeId }])
    .select()
    .single()

  if (error) throw new AppError(error.message, 400)
  return data
}