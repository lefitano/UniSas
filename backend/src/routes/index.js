import { Router } from 'express'
import usuarioRoutes  from './usuarioRoutes.js'
import authRoutes     from './authRoutes.js'
import turmaRoutes    from './turmaRoutes.js'

const router = Router()

router.use('/usuarios', usuarioRoutes)
router.use('/auth',     authRoutes)
router.use('/turmas',   turmaRoutes)

export default router
