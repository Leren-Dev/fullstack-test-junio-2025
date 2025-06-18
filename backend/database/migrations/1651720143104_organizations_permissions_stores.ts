import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OrganizationsPermissionsStores extends BaseSchema {
  protected tableName = 'organization_permission_stores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table
        .bigInteger('org_id')
        .unsigned()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')
      table
        .bigInteger('perm_id')
        .unsigned()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE')
      table.bigInteger('store_id').unsigned().references('id').inTable('stores').onDelete('CASCADE')
      table.unique(['org_id', 'perm_id', 'store_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
