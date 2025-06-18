import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_mercadopago_email_verified').defaultTo(false).after('mercadopago_email')
      table
        .timestamp('mercadopago_email_verified_at', { useTz: true })
        .nullable()
        .after('is_mercadopago_email_verified')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('mercadopago_email_verified_at')
      table.dropColumn('is_mercadopago_email_verified')
    })
  }
}
