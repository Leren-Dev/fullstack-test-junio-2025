import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrganizationsSchema extends BaseSchema {
  protected tableName = 'organizations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()

      table.string('name', 64).notNullable()
      table.string('email').notNullable().unique()
      table.string('support_email').nullable()
      table.string('dev_email').nullable()
      table.string('phone').nullable()
      table.string('logo').nullable()
      table.string('url').nullable()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
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
