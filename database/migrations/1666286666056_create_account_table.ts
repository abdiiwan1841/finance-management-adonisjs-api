import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('account_name').notNullable()
      table.string('account_number').notNullable().unique()
      table.string('account_currency').notNullable()
      table.string('account_type').notNullable()
      table.boolean('account_active').defaultTo(true)
      table.string('bank_name').notNullable()
      table.integer('bank_balance').notNullable()
      table.uuid('user_id').references('users.id').onDelete('CASCADE').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
