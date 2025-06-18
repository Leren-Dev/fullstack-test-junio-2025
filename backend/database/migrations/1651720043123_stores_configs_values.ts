import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class StoresConfigsValues extends BaseSchema {
  protected tableName = 'store_config_values'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table
        .bigInteger('store_config_id')
        .unsigned()
        .references('id')
        .inTable('store_configs')
        .onDelete('CASCADE')

      table.string('name', 64).notNullable()
      table.string('type', 64).notNullable()
      table.string('value').notNullable()
      table.boolean('status').notNullable()

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
