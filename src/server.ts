import express, { type Request, type Response } from 'express'
import connect from '../config/db'
import userRouter from './routes/users.routes'

const app = express()
const port = process.env.PORT ?? 3000

app.use(express.json())

app.use('/', userRouter)
app.get('/', function (req: Request, res: Response) {
  return res.send('Bem-vindo à API.')
})

app.listen(port, () => {
  connect()
    .catch((error) => {
      console.log(error)
    })
  console.log(`App listening on port: http://localhost:${port}/`)
})
