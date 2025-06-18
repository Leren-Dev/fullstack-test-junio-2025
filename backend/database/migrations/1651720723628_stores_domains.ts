import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StoresDomains extends BaseSchema {
  protected tableName = 'store_domains'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.bigInteger('store_id').unsigned().references('id').inTable('stores').onDelete('CASCADE')

      table.string('url').nullable()
      table.boolean('original').notNullable().defaultTo(false)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
