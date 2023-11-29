import { type ValidationChain, body } from 'express-validator'

export const validateSignUpFields: ValidationChain[] = [
  body('email').isEmail().withMessage('Email necessário.'),
  body('nome').notEmpty().withMessage('Nome necessário.'),
  body('senha').notEmpty().withMessage('Senha necessária.'),
  body('telefones').isArray().withMessage('Telefone(s) necessário(s).')
]
