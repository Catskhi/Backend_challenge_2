import { Router, type Request, type Response } from 'express'
import { validateSignUpFields } from '../middleware/userValidation'
import { User } from '../models/User'
import { validationResult } from 'express-validator'
import { compare, genSalt, hash } from 'bcrypt'
import { TokenExpiredError, sign, verify } from 'jsonwebtoken'
import 'dotenv/config'
const userRouter = Router()

userRouter.post('/signup', validateSignUpFields, async (req: Request, res: Response) => {
  const { nome, email, senha, telefones } = req.body
  const result = validationResult(req)
  if (!result.isEmpty()) {
    const errorMessages = result.array().map((error) => {
      return error.msg
    })
    return res.status(400).send({
      mensagem: errorMessages
    })
  }
  try {
    const userExists = await User.findOne({ email })
    if (userExists !== null) {
      res.status(400).send({
        mensagem: 'E-mail já existente'
      })
    } else {
      const salt = await genSalt(10)
      const hashedPassword = await hash(senha, salt)
      const now = new Date().toJSON()
      const user = new User({
        nome, email, senha: hashedPassword, ultimo_login: now, telefones
      })
      const savedUser = await user.save()

      const token = sign(
        {
          id: savedUser.id
        },
        process.env.SECRET as string,
        {
          expiresIn: '30m'
        }
      )
      res.status(200).send({
        id: savedUser.id,
        data_criacao: savedUser.createdAt,
        data_atualizacao: savedUser.updatedAt,
        ultimo_login: savedUser.ultimo_login,
        token
      })
    }
  } catch (error) {
    res.send({
      mensagem: 'Não foi possível criar o usuário.'
    })
  }
})

userRouter.post('/signin', async (req: Request, res: Response) => {
  const { email, senha } = req.body
  if (email === null || senha === null) {
    return res.send({
      mensagem: 'É necessário e-mail e senha.'
    })
  }

  try {
    const user = await User.findOne({ email })
    if (user === null) {
      return res.send({
        mensagem: 'Usuário e/ou senha inválidos'
      })
    } else {
      const isPasswordCorrect = await compare(senha, user.senha)
      if (!isPasswordCorrect) {
        return res.status(401).send({
          mensagem: 'Usuário e/ou senha inválidos'
        })
      }

      user.ultimo_login = new Date().toJSON()
      await user.save()

      const token = sign(
        {
          id: user.id
        },
        process.env.SECRET as string,
        {
          expiresIn: '30m'
        }
      )

      res.send({
        id: user.id,
        data_criacao: user.createdAt,
        data_atualizacao: user.updatedAt,
        ultimo_login: user.ultimo_login,
        token
      })
    }
  } catch (error) {
    res.send({
      mensagem: 'Ocorreu um erro no sistema.'
    })
  }
})

userRouter.post('/find', async (req: Request, res: Response) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1]
    let id: number | undefined
    if (token === undefined) {
      throw new Error()
    }
    verify(token, process.env.SECRET as string, (error, decoded: any) => {
      if (error !== null) {
        throw new Error()
      }
      id = decoded.id
    })

    const user = await User.findById(id)
    if (user === null) {
      return res.send({
        mensagem: 'Usuário inválido'
      })
    }
    res.send({
      id: user.id,
      data_criacao: user.createdAt,
      data_atualizacao: user.updatedAt,
      ultimo_login: user.ultimo_login
    })
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.send({
        mensagem: 'Sessão inválida'
      })
    }
    return res.send({
      mensagem: 'Não autorizado'
    })
  }
})

export default userRouter
