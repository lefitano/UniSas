import * as api from './api.js'

export async function getConteudos(professorId)    { return api.get(`/conteudos?professorId=${professorId}`) }
export async function getConteudosPorTurma(turmaId) { return api.get(`/conteudos?turmaId=${turmaId}`) }
export async function criarConteudo(dados)          { return api.post('/conteudos', dados) }
export async function removerConteudo(id)           { return api.del(`/conteudos/${id}`) }
