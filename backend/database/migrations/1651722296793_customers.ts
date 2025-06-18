import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Customers extends BaseSchema {
  protected tableName = 'customers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table
        .bigInteger('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onDelete('RESTRICT')

      table.bigInteger('tn_id').unsigned().unique().notNullable()

      table.string('name').nullable()
      table.string('email', 64).notNullable()
      table.string('phone').nullable()
      table.string('identification', 64).nullable()
      table.string('note').nullable()
      table.string('billing_address').nullable()
      table.string('billing_number', 64).nullable()
      table.string('billing_floor', 64).nullable()
      table.string('billing_locality').nullable()
      table.string('billing_zipcode', 64).nullable()
      table.string('billing_city').nullable()
      table.string('billing_province').nullable()
      table.string('billing_country', 2).nullable()
      table.text('extra').nullable()
      table.decimal('total_spent').nullable()
      table.string('total_spent_currency', 3).nullable()
      table.string('last_order_id').nullable()
      table.boolean('active').nullable()

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
