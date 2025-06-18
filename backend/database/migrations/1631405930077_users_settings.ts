import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSettings extends BaseSchema {
  protected tableName = 'user_settings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.string('type', 64).notNullable()
      table.string('name', 64).notNullable()
      table.integer('value').notNullable()
      table.boolean('status').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
