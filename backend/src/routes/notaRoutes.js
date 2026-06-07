import { Router } from 'express'
import { listar, criar, atualizar } from '../controllers/notaController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.get('/', verificarAuth, listar)
router.post('/', verificarAuth, validarCampos(['atividade_id', 'aluno_id', 'nota']), criar)
router.put('/:id', verificarAuth, validarCampos(['nota']), atualizar)

export default router