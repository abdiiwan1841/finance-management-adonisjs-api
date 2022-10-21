import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ConflictException } from 'App/Exceptions/ConflictException'
import Account from 'App/Models/Account'
import CreateAccount from 'App/Validators/CreateAccountValidator'
import UpdateAccount from 'App/Validators/UpdateAccountValidator'

export default class AccountsController {
  public async create({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateAccount)
    const userId = auth.user.id

    const userAccountNumber = await Account.findBy('account_number', payload.account_number)
    if (userAccountNumber) throw new ConflictException('Account number already exists')

    const account = await Account.create({ ...payload, user_id: userId })
    return response.created({ account })
  }

  public async findById({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const account = await Account.findOrFail(id)

    await bouncer.authorize('getAccountData', account)

    return response.ok({ account })
  }

  public async update({ request, response, bouncer }: HttpContextContract) {
    const {
      account_currency,
      account_name,
      account_number,
      account_type,
      bank_balance,
      bank_name,
    } = await request.validate(UpdateAccount)
    const id = request.param('id')
    const account = await Account.findOrFail(id)

    await bouncer.authorize('updateAccount', account)

    account.account_currency = account_currency
    account.account_name = account_name
    account.account_number = account_number
    account.account_type = account_type
    account.bank_balance = bank_balance
    account.bank_name = bank_name
    await account.save()

    return response.ok({ account })
  }

  public async remove({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const account = await Account.findOrFail(id)
    await bouncer.authorize('removeAccount', account)
    await account.delete()

    return response.ok({ account })
  }
}
