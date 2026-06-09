import * as api from './api.js'

export async function getNotasDoAluno(alunoId)   { return api.get(`/notas?alunoId=${alunoId}`) }
export async function lancarNota(dados)           { return api.post('/notas', dados) }
export async function atualizarNota(id, nota)     { return api.put(`/notas/${id}`, { nota }) }
