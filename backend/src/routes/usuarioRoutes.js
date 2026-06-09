import { Router } from 'express'
import { listar, buscarPorId, criar, atualizar, remover } from '../controllers/usuarioController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos, validarEmail } from '../middlewares/validacaoMiddleware.js'

const router = Router()


router.get('/',       verificarAuth, listar)
router.get('/:id',    verificarAuth, buscarPorId)
router.post('/',      verificarAuth, validarCampos(['nome', 'email', 'senha', 'perfil']), validarEmail, criar)
router.put('/:id',    verificarAuth, validarCampos(['nome', 'email']), validarEmail, atualizar)
router.delete('/:id', verificarAuth, remover)

export default router
