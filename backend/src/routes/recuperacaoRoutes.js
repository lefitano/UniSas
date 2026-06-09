import { Router } from 'express'
import { solicitar, redefinir } from '../controllers/recuperacaoController.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.post('/solicitar', validarCampos(['email']),              solicitar)
router.post('/redefinir', validarCampos(['token', 'novaSenha']), redefinir)

export default router
