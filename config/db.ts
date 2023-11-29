import mongoose from 'mongoose'
import 'dotenv/config'

async function connect (): Promise<void> {
  try {
    await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/admin`
    )
    console.log('Conectado ao banco de dados.')
  } catch (error) {
    console.log('Não foi possível se conectar ao banco de dados.')
    console.log(error)
  }
}

export default connect
