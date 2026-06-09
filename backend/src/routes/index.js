import { Router } from 'express'
import usuarioRoutes   from './usuarioRoutes.js'
import authRoutes      from './authRoutes.js'
import turmaRoutes     from './turmaRoutes.js'
import atividadeRoutes from './atividadeRoutes.js'
import notaRoutes      from './notaRoutes.js'

const router = Router()

router.use('/usuarios',   usuarioRoutes)
router.use('/auth',       authRoutes)
router.use('/turmas',     turmaRoutes)
router.use('/atividades', atividadeRoutes)
router.use('/notas',      notaRoutes)

export default router