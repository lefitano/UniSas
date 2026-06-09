import * as atividadeService from '../services/atividadeService.js'

export async function listar(req, res, next) {
  try {
    const { turmaId } = req.query
    const atividades = await atividadeService.listarAtividades(turmaId)
    res.json(atividades)
  } catch (erro) {
    next(erro)
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { id } = req.params
    const atividade = await atividadeService.buscarAtividadePorId(id)
    res.json(atividade)
  } catch (erro) {
    next(erro)
  }
}

export async function criar(req, res, next) {
  try {
    const atividade = await atividadeService.criarAtividade(req.body)
    res.status(201).json(atividade)
  } catch (erro) {
    next(erro)
  }
}

export async function atualizar(req, res, next) {
  try {
    const { id } = req.params
    const atividade = await atividadeService.atualizarAtividade(id, req.body)
    res.json(atividade)
  } catch (erro) {
    next(erro)
  }
}

export async function remover(req, res, next) {
  try {
    const { id } = req.params
    await atividadeService.removerAtividade(id)
    res.status(204).send()
  } catch (erro) {
    next(erro)
  }
}

export async function submeterEntrega(req, res, next) {
  try {
    const { id } = req.params
    const { alunoId } = req.body
    const entrega = await atividadeService.submeterEntrega(id, alunoId)
    res.status(201).json(entrega)
  } catch (erro) {
    next(erro)
  }
}