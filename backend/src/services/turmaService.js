import supabase from '../config/database.js'
import { AppError } from '../middlewares/AppError.js'

export async function listarTurmas(pagina, limite) {
  const selecao = 'id, nome, turno, ano_letivo, professor_id, criado_em'

  const turmasQuery = (pagina && limite)
    ? supabase.from('turmas').select(selecao, { count: 'exact' }).order('nome').range((pagina - 1) * limite, pagina * limite - 1)
    : supabase.from('turmas').select(selecao).order('nome')

  const [
    { data: turmas, error, count },
    { data: contagens }
  ] = await Promise.all([
    turmasQuery,
    supabase.from('usuarios').select('turma_id').eq('perfil', 'aluno').not('turma_id', 'is', null)
  ])

  if (error) throw new AppError('Não foi possível listar as turmas', 500)

  const contagemPorTurma = {}
  contagens?.forEach(u => {
    contagemPorTurma[u.turma_id] = (contagemPorTurma[u.turma_id] || 0) + 1
  })

  const turmasComContagem = turmas.map(t => ({ ...t, total_alunos: contagemPorTurma[t.id] || 0 }))

  if (pagina && limite) {
    return { dados: turmasComContagem, total: count, pagina, limite, totalPaginas: Math.ceil(count / limite) }
  }
  return turmasComContagem
}

export async function listarTurmasPorProfessor(professorId) {
  const { data, error } = await supabase
    .from('turmas')
    .select('id, nome, turno, ano_letivo, professor_id, criado_em')
    .eq('professor_id', professorId)
    .order('nome')
  if (error) throw new AppError('Não foi possível listar as turmas', 500)
  return data
}

export async function buscarTurmaPorId(id) {
  const { data, error } = await supabase
    .from('turmas')
    .select('id, nome, turno, ano_letivo, professor_id, criado_em')
    .eq('id', id)
    .single()
  if (error) throw new AppError('Turma não encontrada', 404)
  return data
}

export async function criarTurma(dados) {
  const { data, error } = await supabase
    .from('turmas')
    .insert(dados)
    .select('id, nome, turno, ano_letivo, professor_id, criado_em')
    .single()
  if (error) throw new AppError(error.message, 400)
  return data
}

export async function atualizarTurma(id, dados) {
  const { data, error } = await supabase
    .from('turmas')
    .update(dados)
    .eq('id', id)
    .select('id, nome, turno, ano_letivo, professor_id, criado_em')
    .single()
  if (error) throw new AppError('Erro ao atualizar a turma', 500)
  return data
}

export async function removerTurma(id) {
  const { error } = await supabase
    .from('turmas')
    .delete()
    .eq('id', id)
  if (error) throw new AppError('Erro ao remover turma', 500)
}

export async function listarAlunosDaTurma(turmaId) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, matricula, criado_em')
    .eq('perfil', 'aluno')
    .eq('turma_id', turmaId)
    .order('nome')
  if (error) throw new AppError('Não foi possível listar os alunos da turma', 500)
  return data
}

export async function vincularAluno(alunoId, turmaId) {
  const { error } = await supabase
    .from('usuarios')
    .update({ turma_id: turmaId })
    .eq('id', alunoId)
    .eq('perfil', 'aluno')
  if (error) throw new AppError('Erro ao vincular aluno à turma', 400)
}

export async function desvincularAluno(alunoId) {
  const { error } = await supabase
    .from('usuarios')
    .update({ turma_id: null })
    .eq('id', alunoId)
    .eq('perfil', 'aluno')
  if (error) throw new AppError('Erro ao desvincular aluno da turma', 400)
}
