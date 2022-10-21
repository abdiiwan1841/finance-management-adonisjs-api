import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('type').notNullable()
      table.integer('value').notNullable()
      table.string('date').notNullable()
      table.string('description').notNullable()
      table.string('choose_account').notNullable()
      table.uuid('account_id').references('accounts.id').onDelete('CASCADE').notNullable()
      table.uuid('user_id').references('users.id').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
