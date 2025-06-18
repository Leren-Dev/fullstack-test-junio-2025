import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CustomersAddresses extends BaseSchema {
  protected tableName = 'customer_addresses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table
        .bigInteger('customer_id')
        .unsigned()
        .references('id')
        .inTable('customers')
        .onDelete('CASCADE')

      table.bigInteger('tn_id').unsigned().unique().notNullable()

      table.string('address').nullable()
      table.string('city').nullable()
      table.string('country', 2).nullable()
      table.boolean('default').nullable()
      table.string('floor', 64).nullable()
      table.string('locality').nullable()
      table.string('number', 64).nullable()
      table.string('phone').nullable()
      table.string('province').nullable()
      table.string('zipcode', 64).nullable()

      table.timestamp('tn_created_at', { useTz: true }).notNullable()
      table.timestamp('tn_updated_at', { useTz: true }).nullable()

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
