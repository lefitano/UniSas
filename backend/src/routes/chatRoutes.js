import { Router } from 'express'
import { listar, criar } from '../controllers/chatController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.get('/', verificarAuth, listar)
router.post('/', verificarAuth, validarCampos(['remetente_id', 'destinatario_id', 'texto']), criar)

export default router