import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').primary()

      table.bigInteger('org_id').unsigned().references('organizations.id').onDelete('RESTRICT')
      table.bigInteger('current_store_id').unsigned().references('stores.id').onDelete('RESTRICT')

      table.string('name', 64).notNullable()
      table.string('email').notNullable().unique()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.string('org_role', 64).nullable()
      table.boolean('is_email_verified').notNullable().defaultTo(false)
      table.timestamp('email_verified_at', { useTz: true }).nullable()
      table.integer('onboarding_status').defaultTo(0)

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
