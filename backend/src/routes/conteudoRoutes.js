import { Router } from 'express'
import { listar, criar, remover } from '../controllers/conteudoController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.get('/',       verificarAuth, listar)
router.post('/',      verificarAuth, validarCampos(['titulo', 'arquivo_url', 'professor_id']), criar)
router.delete('/:id', verificarAuth, remover)

export default router
