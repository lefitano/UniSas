import * as api from './api.js'

export async function getAtividades()              { return api.get('/atividades') }
export async function getAtividadesDaTurma(turmaId){ return api.get(`/atividades?turma_id=${turmaId}`) }
export async function criarAtividade(dados)        { return api.post('/atividades', dados) }
export async function atualizarAtividade(id, dados){ return api.put(`/atividades/${id}`, dados) }
export async function removerAtividade(id)         { return api.del(`/atividades/${id}`) }
export async function entregarAtividade(id, dados) { return api.post(`/atividades/${id}/entregas`, dados) }
