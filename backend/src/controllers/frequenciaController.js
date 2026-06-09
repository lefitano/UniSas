import * as frequenciaService from '../services/frequenciaService.js'

export async function listar(req, res, next) {
  try {
    const { turmaId } = req.query
    const frequencias = await frequenciaService.listarFrequencias(turmaId)
    res.json(frequencias)
  } catch (erro) {
    next(erro)
  }
}

export async function criar(req, res, next) {
  try {
    const frequencia = await frequenciaService.registrarFrequencia(req.body)
    res.status(201).json(frequencia)
  } catch (erro) {
    next(erro)
  }
}

export async function atualizar(req, res, next) {
  try {
    const { id } = req.params
    const frequencia = await frequenciaService.atualizarFrequencia(id, req.body)
    res.json(frequencia)
  } catch (erro) {
    next(erro)
  }
}