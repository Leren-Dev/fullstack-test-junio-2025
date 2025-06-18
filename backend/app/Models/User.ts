import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { DateTime } from 'luxon'
import {
  column,
  beforeSave,
  BaseModel,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import Organization from './Organization'
import UserSetting from './UserSetting'
import Store from './Store'
import Permission from './Permission'
import Log from './Log'

export default class User extends compose(BaseModel, SoftDeletes) {
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
  public orgId?: number

  @column()
  public orgRole?: 'Owner' | 'Admin' | 'Employee' | 'User' | 'Collaborator' | 'Seller' | 'Customer'

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public isEmailVerified: boolean

  @column()
  public onboardingStatus: number

  @column()
  public mercadopagoEmail?: string

  @column()
  public isMercadopagoEmailVerified: boolean

  @column.dateTime()
  public mercadopagoEmailVerifiedAt: DateTime

  @column()
  public mercadopagoId?: string

  @column({
    serialize: (value: number | null) => {
      return value ? Hashids.encode(value) : value
    },
  })
  public currentStoreId: number

  @column.dateTime()
  public emailVerifiedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @belongsTo(() => Organization, { foreignKey: 'orgId' })
  public organization: BelongsTo<typeof Organization>

  @hasMany(() => UserSetting)
  public settings: HasMany<typeof UserSetting>

  @manyToMany(() => Store, {
    pivotTable: 'user_permission_stores',
    pivotColumns: ['perm_id' /* , 'org_perm_store_id' */],
    pivotTimestamps: true,
  })
  public stores: ManyToMany<typeof Store>

  @manyToMany(() => Permission, {
    pivotTable: 'user_permission_stores',
    pivotColumns: ['store_id' /* , 'org_perm_store_id' */],
    pivotTimestamps: true,
  })
  public permissions: ManyToMany<typeof Permission>

  @hasMany(() => Log)
  public logs: HasMany<typeof Log>
}
