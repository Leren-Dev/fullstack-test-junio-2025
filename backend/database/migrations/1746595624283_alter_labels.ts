import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'labels'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('show_at_pdp').after('enabled').notNullable().defaultTo(false)
      table.boolean('show_at_grids').after('enabled').notNullable().defaultTo(false)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('show_at_pdp')
      table.dropColumn('show_at_grids')
    })
  }
}
