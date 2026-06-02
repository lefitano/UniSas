import { Router } from 'express'
import { listar, minhas, buscarPorId, criar, atualizar, remover, listarAlunos, vincular, desvincular } from '../controllers/turmaController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { validarCampos } from '../middlewares/validacaoMiddleware.js'

const router = Router()

router.get('/',                          verificarAuth, listar)
router.get('/minhas',                    verificarAuth, minhas)
router.get('/:id',                       verificarAuth, buscarPorId)
router.get('/:id/alunos',               verificarAuth, listarAlunos)
router.post('/',                         verificarAuth, validarCampos(['nome', 'turno', 'ano_letivo']), criar)
router.post('/:id/alunos/:alunoId',     verificarAuth, vincular)
router.put('/:id',                       verificarAuth, validarCampos(['nome', 'turno', 'ano_letivo']), atualizar)
router.delete('/:id',                    verificarAuth, remover)
router.delete('/:id/alunos/:alunoId',   verificarAuth, desvincular)

export default router
