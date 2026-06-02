import { supabase } from '../config/supabase.js'

export const frequenciaService = {
  // Lançar ou atualizar a frequencia
  async lancarFrequencia(dadosFrequencia) {
    const { data, error } = await supabase
      .from('frequencias')
      .upsert(dadosFrequencia) 
      .select()

    if (error) throw new Error(error.message)
    return data
  },

  async listarPorTurma(turmaId, dataFiltro) {
    let query = supabase
      .from('frequencias')
      .select(`
        id,
        turma_id,
        aluno_id,
        data,
        presente,
        usuarios (id, nome)
      `)
      .eq('turma_id', turmaId)

    if (dataFiltro) {
      query = query.eq('data', dataFiltro)
    }

    const { data, error } = await query
    if (error) throw new Error(error.message)
    return data
  },

  async atualizarPresenca(id, presente) {
    const { data, error } = await supabase
      .from('frequencias')
      .update({ presente })
      .eq('id', id)
      .select()

    if (error) throw new Error(error.message)
    return data[0]
  }
}