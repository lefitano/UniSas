import { Router } from 'express'
import { login, logout, cadastro } from '../controllers/authController.js'
import { validarEmail } from '../middlewares/validacaoMiddleware.js'
import { limiteLogin } from '../middlewares/rateLimitMiddleware.js'

const router = Router()

router.post('/login',    limiteLogin, validarEmail, login)
router.post('/logout',   logout)
router.post('/cadastro', limiteLogin, validarEmail, cadastro)

export default router
