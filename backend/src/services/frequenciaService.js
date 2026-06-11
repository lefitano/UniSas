import supabase from '../config/database.js'
import { ErrorFactory } from '../middlewares/errorFactory.js'

export async function listarFrequencias(turmaId) {
  const { data, error } = await supabase
    .from('frequencias')
    .select('*')
    .eq('turma_id', turmaId)

  if (error) throw ErrorFactory.invalido(error.message)
  return data
}

export async function registrarFrequencia(dados) {
  const { data, error } = await supabase
    .from('frequencias')
    .insert([dados])
    .select()
    .single()

  if (error) throw ErrorFactory.invalido(error.message)
  return data
}

export async function atualizarFrequencia(id, dados) {
  const { data, error } = await supabase
    .from('frequencias')
    .update(dados)
    .eq('id', id)
    .select()
    .single()

  if (error) throw ErrorFactory.invalido(error.message)
  return data
}