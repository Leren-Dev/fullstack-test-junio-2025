import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stores extends BaseSchema {
  protected tableName = 'stores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()

      table.bigInteger('tn_id').unsigned().unique().notNullable()

      table.string('status').nullable()
      table.string('address').nullable()
      table.string('email').nullable()
      table.string('country', 2).nullable()
      table.string('facebook').nullable()
      table.string('instagram').nullable()
      table.string('twitter').nullable()
      table.string('pinterest').nullable()
      table.string('logo').nullable()
      table.string('original_domain').nullable()
      table.string('current_theme', 64).nullable()
      table.string('main_language', 2).nullable()
      table.string('phone').nullable()
      table.string('tn_plan_name', 64).nullable()

      table.timestamp('tn_created_at', { useTz: true }).nullable()

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
