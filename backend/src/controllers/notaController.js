import * as notaService from '../services/notaService.js'

export async function listar(req, res, next) {
  try {
    const { alunoId } = req.query
    const notas = await notaService.buscarNotasPorAluno(alunoId)
    res.json(notas)
  } catch (erro) {
    next(erro)
  }
}

export async function criar(req, res, next) {
  try {
    const nota = await notaService.lancarNota(req.body)
    res.status(201).json(nota)
  } catch (erro) {
    next(erro)
  }
}

export async function atualizar(req, res, next) {
  try {
    const { id } = req.params
    const { nota } = req.body
    const notaAtualizada = await notaService.alterarNota(id, nota)
    res.json(notaAtualizada)
  } catch (erro) {
    next(erro)
  }
}