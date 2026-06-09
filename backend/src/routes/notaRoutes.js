import { Router } from 'express'
import { listar, buscarPorId, lancar, criar } from '../controllers/notaController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/',       verificarAuth, listar)
router.get('/:id',    verificarAuth, buscarPorId)
router.post('/',      verificarAuth, criar)
router.put('/:id',    verificarAuth, lancar)

export default router