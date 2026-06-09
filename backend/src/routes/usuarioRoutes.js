import { Router } from 'express'
import { listar, buscarPorId, criar, atualizar, remover } from '../controllers/usuarioController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos, validarEmail } from '../middlewares/validacaoMiddleware.js'
import { usarCache, invalidarCache } from '../middlewares/cacheMiddleware.js'

const router = Router()

router.get('/',       verificarAuth, usarCache('usuarios'), listar)
router.get('/:id',    verificarAuth, buscarPorId)
router.post('/',      verificarAuth, validarCampos(['nome', 'email', 'senha', 'perfil']), validarEmail, invalidarCache('usuarios'), criar)
router.put('/:id',    verificarAuth, validarCampos(['nome', 'email']), validarEmail, invalidarCache('usuarios'), atualizar)
router.delete('/:id', verificarAuth, invalidarCache('usuarios'), remover)

export default router
