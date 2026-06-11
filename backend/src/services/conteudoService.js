import supabase from '../config/database.js'
import { ErrorFactory } from '../middlewares/errorFactory.js'

export async function listarConteudos(professorId) {
  const { data, error } = await supabase
    .from('conteudos')
    .select('*, turmas(nome)')
    .eq('professor_id', professorId)
    .order('created_at', { ascending: false })

  if (error) throw ErrorFactory.invalido(error.message)
  return data
}

export async function listarConteudosPorTurma(turmaId) {
  const { data, error } = await supabase
    .from('conteudos')
    .select('*, turmas(nome)')
    .or(`turma_id.eq.${turmaId},turma_id.is.null`)
    .order('created_at', { ascending: false })

  if (error) throw ErrorFactory.invalido(error.message)
  return data
}

export async function criarConteudo(dados) {
  const { data, error } = await supabase
    .from('conteudos')
    .insert([dados])
    .select()
    .single()

  if (error) throw ErrorFactory.invalido(error.message)
  return data
}

export async function removerConteudo(id) {
  const { error } = await supabase
    .from('conteudos')
    .delete()
    .eq('id', id)

  if (error) throw ErrorFactory.invalido(error.message)
}
