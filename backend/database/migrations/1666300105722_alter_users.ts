import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('mercadopago_email').nullable().after('onboarding_status')
      table.string('mercadopago_id').nullable().after('mercadopago_email')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('mercadopago_email')
      table.dropColumn('mercadopago_id')
    })
  }
}
