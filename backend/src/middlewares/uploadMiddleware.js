import multer from 'multer'

const armazenamento = multer.memoryStorage()

function filtrarArquivo(req, file, cb) {
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    cb(new Error('Apenas arquivos PDF são permitidos.'))
  }
}

export const uploadPDF = multer({
  storage:    armazenamento,
  fileFilter: filtrarArquivo,
  limits:     { fileSize: 5 * 1024 * 1024 },
}).single('arquivo')

export function tratarErroUpload(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ erro: 'Arquivo muito grande. Máximo de 5MB.' })
    }
    return res.status(400).json({ erro: err.message })
  }
  if (err) {
    return res.status(400).json({ erro: err.message })
  }
  next()
}
