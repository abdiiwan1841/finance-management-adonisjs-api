import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, schema } from '@ioc:Adonis/Core/Validator'

export default class CreateTransactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.string(),
    value: schema.number(),
    date: schema.string(),
    description: schema.string(),
    choose_account: schema.string(),
  })

  public messages: CustomMessages = {}
}
