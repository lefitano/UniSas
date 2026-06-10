import { Router } from 'express'
import { uploadArquivo } from '../controllers/uploadController.js'
import { verificarAuth } from '../middlewares/authMiddleware.js'
import { uploadPDF, tratarErroUpload } from '../middlewares/uploadMiddleware.js'

const router = Router()

router.post('/', verificarAuth, (req, res, next) => {
  uploadPDF(req, res, (err) => {
    if (err) return tratarErroUpload(err, req, res, next)
    next()
  })
}, uploadArquivo)

export default router
