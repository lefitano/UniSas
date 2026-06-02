import * as api from './api.js'

export async function getTurmas()                      { return api.get('/turmas') }
export async function getMinhasTurmas()                { return api.get('/turmas/minhas') }
export async function getTurmaPorId(id)                { return api.get(`/turmas/${id}`) }
export async function adicionarTurma(dados)            { return api.post('/turmas', dados) }
export async function atualizarTurma(id, d)            { return api.put(`/turmas/${id}`, d) }
export async function removerTurma(id)                 { return api.del(`/turmas/${id}`) }
export async function getAlunosDaTurma(turmaId)        { return api.get(`/turmas/${turmaId}/alunos`) }
export async function vincularAluno(turmaId, alunoId)  { return api.post(`/turmas/${turmaId}/alunos/${alunoId}`) }
export async function desvincularAluno(turmaId, alunoId) { return api.del(`/turmas/${turmaId}/alunos/${alunoId}`) }
