import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import Transaction from './Transaction'
import User from './User'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public account_name: string

  @column()
  public account_number: string

  @column()
  public account_currency: string

  @column()
  public account_type: string

  @column()
  public account_active: boolean

  @column()
  public bank_name: string

  @column()
  public bank_balance: number

  @column()
  public user_id: string

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeCreate()
  public static async generateUUID(account: Account) {
    account.id = uuidv4()
  }
}
