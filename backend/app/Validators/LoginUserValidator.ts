import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string(),
  })

  public messages = {
    'email.required': 'El campo "Email" es obligatorio.',
    'email.string': 'El campo "Email" debe contener texto.',
    'email.email': 'El campo "Email" debe contener una dirección de correo válida.',
    'password.required': 'El campo "Contraseña" es obligatorio.',
    'password.string': 'El campo "Contraseña" debe contener texto.',
  }
}
