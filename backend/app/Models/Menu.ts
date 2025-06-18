import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import Menulist from './Menulist'
import Permission from './Permission'

export default class Menu extends compose(BaseModel, SoftDeletes) {
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
  public menulistId: number

  @column({
    serialize: (value: number | null) => {
      return value ? Hashids.encode(value) : value
    },
  })
  public parentId?: number

  @column()
  public name: string

  @column()
  public href: string

  @column()
  public icon: string

  @column()
  public type: string

  @column()
  public sequence: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @hasMany(() => Menu, { foreignKey: 'parentId' })
  public children: HasMany<typeof Menu>

  @belongsTo(() => Menu)
  public parent: BelongsTo<typeof Menu>

  @belongsTo(() => Menulist)
  public menulist: BelongsTo<typeof Menulist>

  @manyToMany(() => Permission, {
    pivotTable: 'menu_permissions',
    pivotRelatedForeignKey: 'perm_id',
    pivotTimestamps: true,
  })
  public permissions: ManyToMany<typeof Permission>
}
