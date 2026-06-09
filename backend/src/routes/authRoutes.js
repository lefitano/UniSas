import { Router } from 'express'
import { login, logout, cadastro } from '../controllers/authController.js'
import { validarEmail } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.post('/login',   validarEmail, login)
router.post('/logout',  logout)
router.post('/cadastro', validarEmail, cadastro)

export default router
