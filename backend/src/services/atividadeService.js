import supabase from '../config/database.js'
import { AppError } from '../middlewares/AppError.js'

export async function listarAtividades(pagina, limite) {
  if (pagina && limite) {
    const from = (pagina - 1) * limite
    const to = from + limite - 1
    const { data, error, count } = await supabase
      .from('atividades')
      .select('*', { count: 'exact' })
      .range(from, to)
    if (error) throw new AppError(error.message, 400)
    return { dados: data, total: count, pagina, limite, totalPaginas: Math.ceil(count / limite) }
  }

  const { data, error } = await supabase.from('atividades').select('*')
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