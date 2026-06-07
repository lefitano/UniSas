import { Router } from 'express'
import { listar, criar, atualizar } from '../controllers/frequenciaController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.get('/', verificarAuth, listar)
router.post('/', verificarAuth, validarCampos(['turma_id', 'aluno_id', 'data', 'presente']), criar)
router.put('/:id', verificarAuth, validarCampos(['presente']), atualizar)

export default router