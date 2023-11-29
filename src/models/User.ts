import { Schema, model } from 'mongoose'

const phoneSchema = new Schema({
  numero: { type: String, required: true },
  ddd: { type: String, required: true }
})

const userSchema = new Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  ultimo_login: { type: String, required: true },
  telefones: [phoneSchema]
}, {
  timestamps: true
})

export const User = model('User', userSchema)
