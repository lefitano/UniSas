import { Router } from 'express'
import { listar, buscarPorId, criar, atualizar, remover, submeterEntrega } from '../controllers/atividadeController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.get('/',           verificarAuth, listar)
router.get('/:id',        verificarAuth, buscarPorId)
router.post('/',          verificarAuth, validarCampos(['turma_id', 'titulo']), criar)
router.put('/:id',        verificarAuth, validarCampos(['titulo']), atualizar)
router.delete('/:id',     verificarAuth, remover)
router.post('/:id/entregas', verificarAuth, submeterEntrega)

export default router