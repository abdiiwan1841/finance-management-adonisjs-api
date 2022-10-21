import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { BadRequestException } from 'App/Exceptions/BadRequestException'
import Account from 'App/Models/Account'
import Transaction from 'App/Models/Transaction'
import User from 'App/Models/User'
import CreateTransaction from 'App/Validators/CreateTransactionValidator'
import { updateAccountBalance } from '../utils/updateAccountBalance'

export default class TransactionsController {
  public async create({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateTransaction)
    const accountOption = payload.choose_account.toLowerCase().trim()

    const userId = auth.user.id
    const user = await User.findOrFail(userId)
    const getUserAccounts = await user.related('accounts').query()

    const findAccountByName = getUserAccounts.find(
      ({ account_name }) => account_name.toLowerCase() === accountOption
    )
    if (!findAccountByName) throw new BadRequestException('Account does not exists')

    const getAccountData = await Account.findOrFail(findAccountByName.id)
    const newBalance = updateAccountBalance(payload, getAccountData)

    getAccountData.bank_balance = newBalance
    await getAccountData.save()

    const transaction = await Transaction.create({
      ...payload,
      user_id: userId,
      account_id: getAccountData.id,
    })

    return response.created({ transaction })
  }

  public async findById({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const transaction = await Transaction.findOrFail(id)
    await bouncer.authorize('getTransactionData', transaction)

    return response.ok({ transaction })
  }

  public async remove({ request, response, bouncer }: HttpContextContract) {
    const id = request.param('id')
    const transaction = await Transaction.findOrFail(id)
    await bouncer.authorize('removeTransaction', transaction)
    await transaction.delete()

    return response.ok({ transaction })
  }
}
