import * as turmaService from '../services/turmaService.js'

export async function listar(req, res, next) {
  try {
    const turmas = await turmaService.listarTurmas()
    res.json(turmas)
  } catch (erro) {
    next(erro)
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { id } = req.params
    const turma = await turmaService.buscarTurmaPorId(id)
    res.json(turma)
  } catch (erro) {
    next(erro)
  }
}

export async function criar(req, res, next) {
  try {
    const turma = await turmaService.criarTurma(req.body)
    res.status(201).json(turma)
  } catch (erro) {
    next(erro)
  }
}

export async function atualizar(req, res, next) {
  try {
    const { id } = req.params
    const turma = await turmaService.atualizarTurma(id, req.body)
    res.json(turma)
  } catch (erro) {
    next(erro)
  }
}

export async function remover(req, res, next) {
  try {
    const { id } = req.params
    await turmaService.removerTurma(id)
    res.status(204).send()
  } catch (erro) {
    next(erro)
  }
}
