import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import Customer from './Customer'

export default class CustomerAddress extends compose(BaseModel, SoftDeletes) {
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
  public customerId: number

  @column()
  public tnId: number

  @column()
  public address: string

  @column()
  public city: string

  @column()
  public country: string

  @column()
  public default: boolean

  @column()
  public floor: string

  @column()
  public locality: string

  @column()
  public number: string

  @column()
  public phone: string

  @column()
  public province: string

  @column()
  public zipcode: string

  @column.dateTime()
  public tnCreatedAt: DateTime

  @column.dateTime()
  public tnUpdatedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @belongsTo(() => Customer)
  public customer: BelongsTo<typeof Customer>
}
