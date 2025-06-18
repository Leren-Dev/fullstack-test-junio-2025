import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import Customer from './Customer'

export default class CustomerCategory extends compose(BaseModel, SoftDeletes) {
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
  public storeId: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @hasMany(() => Customer, { foreignKey: 'categoryId' })
  public customers: HasMany<typeof Customer>
}
