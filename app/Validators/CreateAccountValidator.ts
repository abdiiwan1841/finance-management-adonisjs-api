import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator'

export default class CreateAccountValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    account_name: schema.string([rules.minLength(5), rules.maxLength(20)]),
    account_number: schema.string([rules.maxLength(16)]),
    account_currency: schema.string([rules.maxLength(3)]),
    account_type: schema.string(),
    bank_name: schema.string(),
    bank_balance: schema.number(),
  })

  public messages: CustomMessages = {}
}
