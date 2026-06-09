import { Router } from 'express'
import { listar, criar, atualizar, remover, entregar } from '../controllers/atividadeController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'
import { usarCache, invalidarCache } from '../middlewares/cacheMiddleware.js'

const router = Router()

router.get('/', verificarAuth, usarCache('atividades'), listar)
router.post('/', verificarAuth, validarCampos(['turma_id', 'titulo', 'prazo']), invalidarCache('atividades'), criar)
router.put('/:id', verificarAuth, validarCampos(['titulo', 'prazo']), invalidarCache('atividades'), atualizar)
router.delete('/:id', verificarAuth, invalidarCache('atividades'), remover)
router.post('/:id/entregas', verificarAuth, validarCampos(['aluno_id', 'data_entrega']), entregar)

export default router