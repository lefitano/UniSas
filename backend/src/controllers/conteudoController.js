import * as conteudoService from '../services/conteudoService.js'

export async function listar(req, res, next) {
  try {
    const { professorId, turmaId } = req.query
    if (turmaId) {
      return res.json(await conteudoService.listarConteudosPorTurma(turmaId))
    }
    res.json(await conteudoService.listarConteudos(professorId))
  } catch (erro) {
    next(erro)
  }
}

export async function criar(req, res, next) {
  try {
    const conteudo = await conteudoService.criarConteudo(req.body)
    res.status(201).json(conteudo)
  } catch (erro) {
    next(erro)
  }
}

export async function remover(req, res, next) {
  try {
    await conteudoService.removerConteudo(req.params.id)
    res.status(204).send()
  } catch (erro) {
    next(erro)
  }
}
