import { Router } from 'express'
import { frequenciaController } from '../controllers/frequenciaController.js'

const router = Router()

router.post('/', frequenciaController.lancar)           
router.get('/', frequenciaController.buscarPorTurma)     
router.put('/:id', frequenciaController.alterar)         

export default router