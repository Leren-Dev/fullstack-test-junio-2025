import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import User from './User'
import Store from './Store'
import Permission from './Permission'

export default class Organization extends compose(BaseModel, SoftDeletes) {
  @column({
    isPrimary: true,
    serialize: (value: number | null) => {
      return value ? Hashids.encode(value) : value
    },
  })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public supportEmail?: string

  @column()
  public devEmail?: string

  @column()
  public phone?: string

  @column()
  public logo?: string

  @column()
  public url?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'orgId',
  })
  public users: HasMany<typeof User>

  @manyToMany(() => Store, {
    pivotTable: 'organization_permission_stores',
    pivotColumns: ['perm_id'],
    pivotForeignKey: 'org_id',
    pivotTimestamps: true,
  })
  public stores: ManyToMany<typeof Store>

  @manyToMany(() => Permission, {
    pivotTable: 'organization_permission_stores',
    pivotColumns: ['store_id'],
    pivotForeignKey: 'org_id',
    pivotRelatedForeignKey: 'perm_id',
    pivotTimestamps: true,
  })
  public permissions: ManyToMany<typeof Permission>
}
