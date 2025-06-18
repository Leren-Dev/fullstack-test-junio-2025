import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stores'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('synced_at', { useTz: true }).nullable().after('tn_created_at')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('synced_at')
    })
  }
}
