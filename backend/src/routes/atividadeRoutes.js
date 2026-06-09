import { Router } from 'express'
import { listar, criar, atualizar, remover, entregar } from '../controllers/atividadeController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.get('/', verificarAuth, listar)
router.post('/', verificarAuth, validarCampos(['turma_id', 'titulo', 'prazo']), criar)
router.put('/:id', verificarAuth, validarCampos(['titulo', 'prazo']), atualizar)
router.delete('/:id', verificarAuth, remover)
router.post('/:id/entregas', verificarAuth, validarCampos(['aluno_id', 'data_entrega']), entregar)

export default router