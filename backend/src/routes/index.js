import { Router } from 'express'
import usuarioRoutes from './usuarioRoutes.js'
import authRoutes from './authRoutes.js'
import turmaRoutes from './turmaRoutes.js'
import frequenciaRoutes from './frequenciaRoutes.js'
import atividadeRoutes from './atividadeRoutes.js'
import notaRoutes from './notaRoutes.js'
import chatRoutes from './chatRoutes.js'
import recuperacaoRoutes from './recuperacaoRoutes.js'

const router = Router()

router.use('/usuarios', usuarioRoutes)
router.use('/auth', authRoutes)
router.use('/turmas', turmaRoutes)
router.use('/frequencias', frequenciaRoutes)
router.use('/atividades', atividadeRoutes)
router.use('/notas', notaRoutes)
router.use('/mensagens', chatRoutes)
router.use('/recuperacao', recuperacaoRoutes)

export default router