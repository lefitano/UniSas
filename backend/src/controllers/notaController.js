import * as notaService from '../services/notaService.js'

export async function listar(req, res, next) {
  try {
    const { alunoId } = req.query
    const notas = await notaService.listarNotas(alunoId)
    res.json(notas)
  } catch (erro) {
    next(erro)
  }
}

export async function buscarPorId(req, res, next) {
  try {
    const { id } = req.params
    const nota = await notaService.buscarNotaPorId(id)
    res.json(nota)
  } catch (erro) {
    next(erro)
  }
}

export async function lancar(req, res, next) {
  try {
    const { id } = req.params
    const { nota } = req.body
    const resultado = await notaService.lancarNota(id, nota)
    res.json(resultado)
  } catch (erro) {
    next(erro)
  }
}

export async function criar(req, res, next) {
  try {
    const nota = await notaService.criarNota(req.body)
    res.status(201).json(nota)
  } catch (erro) {
    next(erro)
  }
}