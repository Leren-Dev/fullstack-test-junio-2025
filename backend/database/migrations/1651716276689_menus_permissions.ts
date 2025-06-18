import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MenusPermissions extends BaseSchema {
  protected tableName = 'menu_permissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()
      table.bigInteger('menu_id').unsigned().references('id').inTable('menus').onDelete('CASCADE')
      table
        .bigInteger('perm_id')
        .unsigned()
        .references('id')
        .inTable('permissions')
        .onDelete('CASCADE')
      table.unique(['menu_id', 'perm_id'])

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
