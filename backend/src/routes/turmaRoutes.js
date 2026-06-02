import { Router } from 'express'
import { listar, minhas, buscarPorId, criar, atualizar, remover } from '../controllers/turmaController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.get('/',        verificarAuth, listar)
router.get('/minhas',  verificarAuth, minhas)
router.get('/:id',     verificarAuth, buscarPorId)
router.post('/',      verificarAuth, validarCampos(['nome', 'turno', 'ano_letivo']), criar)
router.put('/:id',    verificarAuth, validarCampos(['nome', 'turno', 'ano_letivo']), atualizar)
router.delete('/:id', verificarAuth, remover)

export default router
