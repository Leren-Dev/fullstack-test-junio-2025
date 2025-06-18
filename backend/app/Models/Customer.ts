import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import Store from './Store'
import CustomerAddress from './CustomerAddress'
import CustomerCategory from './CustomerCategory'

export default class Customer extends compose(BaseModel, SoftDeletes) {
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
  public tnId: number

  @column()
  public name?: string

  @column()
  public email: string

  @column()
  public phone?: string

  @column()
  public identification?: string

  @column()
  public note?: string

  @column()
  public billingAddress?: string

  @column()
  public billingNumber?: string

  @column()
  public billingFloor?: string

  @column()
  public billingLocality?: string

  @column()
  public billingZipcode?: string

  @column()
  public billingCity?: string

  @column()
  public billingProvince?: string

  @column()
  public billingCountry?: string

  @column()
  public extra: string

  @column()
  public totalSpent?: number

  @column()
  public totalSpentCurrency?: string

  @column()
  public lastOrderId?: string

  @column()
  public active?: boolean

  @column({
    serialize: (value: number | null) => {
      return value ? Hashids.encode(value) : value
    },
  })
  public categoryId?: number | null

  @column.dateTime()
  public tnCreatedAt: DateTime

  @column.dateTime()
  public tnUpdatedAt?: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @hasMany(() => CustomerAddress)
  public addresses: HasMany<typeof CustomerAddress>

  @belongsTo(() => Store)
  public store: BelongsTo<typeof Store>

  @belongsTo(() => CustomerCategory, { foreignKey: 'categoryId' })
  public category: BelongsTo<typeof CustomerCategory>
}
