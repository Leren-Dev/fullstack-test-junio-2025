import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { DateTime } from 'luxon'
import {
  BaseModel,
  belongsTo,
  BelongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import Organization from './Organization'
import Menu from './Menu'

export default class Permission extends compose(BaseModel, SoftDeletes) {
  @column({
    isPrimary: true,
    serialize: (value: number | null) => {
      return value ? Hashids.encode(value) : value
    },
  })
  public id: number

  @column({
    serialize: (value: number | null) => {
      return value ? Hashids.encode(value) : value
    },
  })
  public parentId?: number

  @column()
  public name: string

  @column()
  public guardName: string

  @column()
  public description: string

  @column()
  public level?: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @hasMany(() => Permission, { foreignKey: 'parentId' })
  public children: HasMany<typeof Permission>

  @belongsTo(() => Permission)
  public parent: BelongsTo<typeof Permission>

  @manyToMany(() => Organization, {
    pivotTable: 'organization_permission_stores',
    pivotColumns: ['store_id'],
    pivotTimestamps: true,
  })
  public organizations: ManyToMany<typeof Organization>

  @manyToMany(() => User, {
    pivotTable: 'user_permission_stores',
    pivotColumns: ['store_id', 'org_perm_store_id'],
    pivotTimestamps: true,
  })
  public users: ManyToMany<typeof User>

  @manyToMany(() => Menu, {
    pivotTable: 'menu_permissions',
    pivotTimestamps: true,
  })
  public menus: ManyToMany<typeof Menu>
}
