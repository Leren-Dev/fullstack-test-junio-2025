import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import Store from './Store'

export default class Label extends compose(BaseModel, SoftDeletes) {
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
  public type: string

  @column()
  public location: string

  @column()
  public description: string

  @column()
  public imageUrl?: string

  @column()
  public backgroundColor: string

  @column()
  public textColor: string

  @column()
  public isLeren: boolean

  @column()
  public enabled: boolean

  @column()
  public showAtPdp: boolean

  @column()
  public showAtGrids: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @belongsTo(() => Store)
  public store: BelongsTo<typeof Store>
}
