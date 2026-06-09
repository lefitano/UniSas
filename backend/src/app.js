import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import { tratarErros } from './middlewares/errorMiddleware.js'
import { logRequisicoes } from './middlewares/logMiddleware.js'

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))
app.use(express.json())
app.use(logRequisicoes)

app.use('/api', routes)

app.use(tratarErros)
export default app
