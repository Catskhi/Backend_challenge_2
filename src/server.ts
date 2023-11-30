import express, { type NextFunction, type Request, type Response } from 'express'
import connect from '../config/db'
import userRouter from './routes/users.routes'

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())

app.use('/', userRouter)

app.get('/', function (req: Request, res: Response) {
  return res.send({
    message: 'Bem-vindo à API'
  })
})

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    mensagem: 'Endpoint não encontrado'
  })
})

app.listen(port, () => {
  connect()
    .catch((error) => {
      console.log(error)
    })
  console.log(`App listening on url: http://localhost:${port}/`)
})
