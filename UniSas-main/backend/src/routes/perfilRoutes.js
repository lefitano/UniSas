import { Router } from 'express'
import { listar } from '../controllers/perfilController.js'

const router = Router()

// GET /api/perfis
router.get('/', listar)

export default router
