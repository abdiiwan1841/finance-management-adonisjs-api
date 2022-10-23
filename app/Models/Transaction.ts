import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import Account from './Account'
import User from './User'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public type: string

  @column()
  public value: number

  @column()
  public date: string

  @column()
  public description: string

  @column()
  public choose_account: string

  @column()
  public account_id: string

  @belongsTo(() => Account, { foreignKey: 'account_id' })
  public account: BelongsTo<typeof Account>

  @column()
  public user_id: string

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @beforeCreate()
  public static async generateUUID(transaction: Transaction) {
    transaction.id = uuidv4()
  }
}
