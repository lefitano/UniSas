import { frequenciaService } from '../services/frequenciaService.js'

export const frequenciaController = {
  async lancar(req, res) {
    try {
      const dados = req.body 
      const resultado = await frequenciaService.lancarFrequencia(dados)
      return res.status(201).json({ success: true, data: resultado })
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message })
    }
  },

  async buscarPorTurma(req, res) {
    try {
      const { turmaId, data } = req.query

      if (!turmaId) {
        return res.status(400).json({ success: false, error: 'O parâmetro turmaId é obrigatório.' })
      }

      const resultado = await frequenciaService.listarPorTurma(turmaId, data)
      return res.status(200).json({ success: true, data: resultado })
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message })
    }
  },

  async alterar(req, res) {
    try {
      const { id } = req.params
      const { presente } = req.body

      if (presente === undefined) {
        return res.status(400).json({ success: false, error: 'O campo "presente" (true/false) é obrigatório.' })
      }

      const resultado = await frequenciaService.atualizarPresenca(id, presente)
      return res.status(200).json({ success: true, data: resultado })
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}