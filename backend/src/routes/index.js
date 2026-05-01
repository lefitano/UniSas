import { Router } from 'express'
import perfilRoutes   from './perfilRoutes.js'
import usuarioRoutes  from './usuarioRoutes.js'
import authRoutes     from './authRoutes.js'

const router = Router()

router.use('/perfis',   perfilRoutes)
router.use('/usuarios', usuarioRoutes)
router.use('/auth',     authRoutes)

export default router
