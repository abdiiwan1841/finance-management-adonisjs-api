import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Account from 'App/Models/Account'
import Transaction from 'App/Models/Transaction'
import User from 'App/Models/User'

export const { actions } = Bouncer.define(
  'updateUser',
  (user: User, updatedUser: User) => user.id === updatedUser.id
)
  .define('getUserData', (user: User, updatedUser: User) => user.id === updatedUser.id)
  .define('updateAccount', (user: User, account: Account) => user.id === account.user_id)
  .define('getAccountData', (user: User, account: Account) => user.id === account.user_id)
  .define('removeAccount', (user: User, account: Account) => user.id === account.user_id)
  .define(
    'getTransactionData',
    (user: User, transaction: Transaction) => user.id === transaction.user_id
  )
  .define(
    'removeTransaction',
    (user: User, transaction: Transaction) => user.id === transaction.user_id
  )

export const { policies } = Bouncer.registerPolicies({})
