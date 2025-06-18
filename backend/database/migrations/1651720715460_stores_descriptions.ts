import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StoresDescriptions extends BaseSchema {
  protected tableName = 'store_descriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.bigInteger('store_id').unsigned().references('id').inTable('stores').onDelete('CASCADE')

      table.text('es').nullable()
      table.text('en').nullable()
      table.text('pt').nullable()

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
