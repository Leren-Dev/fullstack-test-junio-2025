import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'labels'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table
        .bigInteger('store_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable('stores')
        .onDelete('CASCADE')

      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('location').notNullable()
      table.string('description').notNullable()
      table.string('image_url').nullable()
      table.string('background_color').notNullable().defaultTo('#000000ff')
      table.string('text_color').notNullable().defaultTo('#ffffffff')

      table.boolean('is_leren').defaultTo(false)
      table.boolean('enabled').defaultTo(true)

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
