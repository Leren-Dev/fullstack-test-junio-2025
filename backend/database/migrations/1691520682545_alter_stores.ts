import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stores'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('last_month_orders').after('status').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('last_month_orders')
    })
  }
}
