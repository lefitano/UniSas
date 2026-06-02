import * as api from './api.js'

export async function getTurmas()           { return api.get('/turmas') }
export async function getTurmaPorId(id)     { return api.get(`/turmas/${id}`) }
export async function adicionarTurma(dados) { return api.post('/turmas', dados) }
export async function atualizarTurma(id, d) { return api.put(`/turmas/${id}`, d) }
export async function removerTurma(id)      { return api.del(`/turmas/${id}`) }
