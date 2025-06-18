import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import Store from './Store'
import User from './User'

export default class Log extends BaseModel {
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

  @column({
    serialize: (value: number | null) => {
      return value ? Hashids.encode(value) : value
    },
  })
  public userId: number

  @column({
    serialize: (value: number | null) => {
      return value ? Hashids.encode(value) : value
    },
  })
  public jobId: number

  @column()
  public content?: string

  @manyToMany(() => Store)
  public stores: ManyToMany<typeof Store>

  @manyToMany(() => User)
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
