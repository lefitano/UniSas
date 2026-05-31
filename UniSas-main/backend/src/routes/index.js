import { Router } from 'express'
import perfilRoutes   from './perfilRoutes.js'
import usuarioRoutes  from './usuarioRoutes.js'
import authRoutes     from './authRoutes.js'
import turmaRoutes from './turmaRoutes.js'      
import frequenciaRoutes from './frequenciaRoutes.js'

const router = Router()

router.use('/perfis',   perfilRoutes)
router.use('/usuarios', usuarioRoutes)
router.use('/auth',     authRoutes)
router.use('/turmas',       turmaRoutes)
router.use('/frequencias',  frequenciaRoutes)

export default router
