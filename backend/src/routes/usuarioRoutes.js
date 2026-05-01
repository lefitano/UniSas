import { Router } from 'express'
import { listar, buscarPorId, criar, atualizar, remover } from '../controllers/usuarioController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'

const router = Router()

// Todas as rotas de usuário exigem que o solicitante esteja autenticado
// GET    /api/usuarios
// GET    /api/usuarios/:id
// POST   /api/usuarios
// PUT    /api/usuarios/:id
// DELETE /api/usuarios/:id
router.get('/',       verificarAuth, listar)
router.get('/:id',    verificarAuth, buscarPorId)
router.post('/',      verificarAuth, criar)
router.put('/:id',    verificarAuth, atualizar)
router.delete('/:id', verificarAuth, remover)

export default router
