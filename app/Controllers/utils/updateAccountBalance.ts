import { BadRequestException } from 'App/Exceptions/BadRequestException'
import Account from 'App/Models/Account'

export const updateAccountBalance = (payload: any, account: Account): number => {
  const type = payload.type
  const transactionValue = payload.value
  const accountBalance = account.bank_balance

  if (type === 'renda') return accountBalance + transactionValue
  else if (type === 'despesa' && accountBalance >= transactionValue)
    return accountBalance - transactionValue
  else throw new BadRequestException('Insufficient account balance')
}
