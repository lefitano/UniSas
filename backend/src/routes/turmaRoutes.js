import { Router } from 'express'
import { listar, minhas, buscarPorId, criar, atualizar, remover, listarAlunos, vincular, desvincular } from '../controllers/turmaController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'
import { usarCache, invalidarCache } from '../middlewares/cacheMiddleware.js'

const router = Router()

router.get('/',                          verificarAuth, usarCache('turmas'), listar)
router.get('/minhas',                    verificarAuth, minhas)
router.get('/:id',                       verificarAuth, buscarPorId)
router.get('/:id/alunos',               verificarAuth, listarAlunos)
router.post('/',                         verificarAuth, validarCampos(['nome', 'turno', 'ano_letivo']), invalidarCache('turmas'), criar)
router.post('/:id/alunos/:alunoId',     verificarAuth, invalidarCache('turmas'), vincular)
router.put('/:id',                       verificarAuth, validarCampos(['nome', 'turno', 'ano_letivo']), invalidarCache('turmas'), atualizar)
router.delete('/:id',                    verificarAuth, invalidarCache('turmas'), remover)
router.delete('/:id/alunos/:alunoId',   verificarAuth, invalidarCache('turmas'), desvincular)

export default router
