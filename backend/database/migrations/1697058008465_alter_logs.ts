import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Logs extends BaseSchema {
  protected tableName = 'logs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .bigInteger('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .after('id')
        .onDelete('CASCADE')
      table
        .bigInteger('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .after('store_id')
        .onDelete('CASCADE')
      table.dropColumn('unix')
      table.dropColumn('name')
      table.dropColumn('url')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('store_id')
      table.dropColumn('user_id')
      table.bigInteger('unix').unsigned().notNullable()
      table.string('name', 64).notNullable()
      table.string('url', 64).notNullable()
    })
  }
}
