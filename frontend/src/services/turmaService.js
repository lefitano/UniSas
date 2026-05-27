import * as api from './api.js'

export async function getTurmas()           { return [] }
export async function getTurmaPorId(_id)    { return null }
export async function adicionarTurma(dados) { return { id: Date.now(), ...dados } }
export async function atualizarTurma(id, d) { return { id, ...d } }
export async function removerTurma(_id)     { return null }
