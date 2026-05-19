import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import { tratarErros } from './middlewares/errorMiddleware.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.use(tratarErros)
export default app
