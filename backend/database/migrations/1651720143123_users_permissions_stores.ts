import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersPermissionsStores extends BaseSchema {
  protected tableName = 'user_permission_stores'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .bigInteger('perm_id')
        .unsigned()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE')
      table.bigInteger('store_id').unsigned().references('id').inTable('stores').onDelete('CASCADE')
      table.unique(['user_id', 'perm_id', 'store_id'])
      // table.bigInteger('org_perm_store_id').unsigned().references('id').inTable('organization_permission_stores').onDelete('CASCADE')

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
