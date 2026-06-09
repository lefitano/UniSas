import { Router } from 'express'
import { listar, criar, atualizar } from '../controllers/notaController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos, validarNota } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.get('/', verificarAuth, listar)
router.post('/', verificarAuth, validarCampos(['atividade_id', 'aluno_id', 'nota']), validarNota, criar)
router.put('/:id', verificarAuth, validarCampos(['nota']), validarNota, atualizar)

export default router