import express, { type Request, type Response } from 'express'

const app = express()
const port = 3000

app.get('/', function (req: Request, res: Response) {
  return res.send({
    message: 'Uepa'
  })
})

app.listen(port, () => {
  console.log(`App listening on port: http://localhost:${port}/`)
})
