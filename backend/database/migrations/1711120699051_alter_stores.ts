import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stores'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('main_currency', 3).nullable().after('main_language')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('main_currency')
    })
  }
}
