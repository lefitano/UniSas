import supabase from '../config/database.js'

export async function listarTurmas() {
  const { data, error } = await supabase
    .from('turmas')
    .select('id, nome, turno, ano_letivo, professor_id, criado_em')
    .order('nome')
  if (error) throw new Error('Não foi possível listar as turmas')
  return data
}

export async function listarTurmasPorProfessor(professorId) {
  const { data, error } = await supabase
    .from('turmas')
    .select('id, nome, turno, ano_letivo, professor_id, criado_em')
    .eq('professor_id', professorId)
    .order('nome')
  if (error) throw new Error('Não foi possível listar as turmas')
  return data
}

export async function buscarTurmaPorId(id) {
  const { data, error } = await supabase
    .from('turmas')
    .select('id, nome, turno, ano_letivo, professor_id, criado_em')
    .eq('id', id)
    .single()
  if (error) throw new Error('Turma não encontrada')
  return data
}

export async function criarTurma(dados) {
  const { data, error } = await supabase
    .from('turmas')
    .insert(dados)
    .select('id, nome, turno, ano_letivo, professor_id, criado_em')
    .single()
  if (error) throw new Error(error.message)
  return data
}

export async function atualizarTurma(id, dados) {
  const { data, error } = await supabase
    .from('turmas')
    .update(dados)
    .eq('id', id)
    .select('id, nome, turno, ano_letivo, professor_id, criado_em')
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

export async function listarAlunosDaTurma(turmaId) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, matricula, criado_em')
    .eq('perfil', 'aluno')
    .eq('turma_id', turmaId)
    .order('nome')
  if (error) throw new Error('Não foi possível listar os alunos da turma')
  return data
}

export async function vincularAluno(alunoId, turmaId) {
  const { error } = await supabase
    .from('usuarios')
    .update({ turma_id: turmaId })
    .eq('id', alunoId)
    .eq('perfil', 'aluno')
  if (error) throw new Error('Erro ao vincular aluno à turma')
}

export async function desvincularAluno(alunoId) {
  const { error } = await supabase
    .from('usuarios')
    .update({ turma_id: null })
    .eq('id', alunoId)
    .eq('perfil', 'aluno')
  if (error) throw new Error('Erro ao desvincular aluno da turma')
}
