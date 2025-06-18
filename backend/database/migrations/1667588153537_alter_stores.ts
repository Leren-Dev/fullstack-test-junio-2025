import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stores'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('periodic_coupons_sync_job_id').nullable().after('phone')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('periodic_coupons_sync_job_id')
    })
  }
}
