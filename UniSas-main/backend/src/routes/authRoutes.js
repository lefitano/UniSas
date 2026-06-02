import { Router } from 'express'
import { login, logout, cadastro } from '../controllers/authController.js'

const router = Router()

router.post('/login',   login)
router.post('/logout',  logout)
router.post('/cadastro', cadastro)

export default router
