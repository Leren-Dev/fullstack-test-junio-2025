import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Menus extends BaseSchema {
  protected tableName = 'menus'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table
        .bigInteger('parent_id')
        .unsigned()
        .references('id')
        .inTable('menus')
        .onDelete('RESTRICT')
      table
        .bigInteger('menulist_id')
        .unsigned()
        .references('id')
        .inTable('menulists')
        .onDelete('CASCADE')

      table.string('name', 64).notNullable()
      table.string('href', 64).notNullable()
      table.string('icon', 64).nullable()
      table.string('type', 64).notNullable()
      table.integer('sequence').notNullable()

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
