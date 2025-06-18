import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  HasMany,
  hasMany,
  HasOne,
  hasOne,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import User from './User'
import StoreConfig from './StoreConfig'
import StoreName from './StoreName'
import StoreDescription from './StoreDescription'
import StoreDomain from './StoreDomain'
import StoreLanguage from './StoreLanguage'
import Customer from './Customer'
import Organization from './Organization'
import Permission from './Permission'
import Log from './Log'

export default class Store extends compose(BaseModel, SoftDeletes) {
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
  public planId: number

  @column()
  public desiredPlanName?: 'professional' | 'business' | 'beyond'

  @column()
  public tnId: number

  @column()
  public status?:
    | 'Created'
    | 'InstalledSuccessfully'
    | 'InstallationError'
    | 'SyncErrors'
    | 'Uninstalled'
    | 'Deleted'
    | 'Disabled'

  @column()
  public enforceSubscription: boolean

  @column()
  public bypassAppsSubscriptions?: string

  @column()
  public lastMonthOrders?: number

  @column()
  public address: string

  @column()
  public email: string

  @column()
  public country: string

  @column()
  public facebook: string

  @column()
  public instagram: string

  @column()
  public twitter: string

  @column()
  public pinterest: string

  @column()
  public logo: string

  @column()
  public originalDomain: string

  @column()
  public currentTheme: string

  @column()
  public mainLanguage: string

  @column()
  public mainCurrency: string

  @column()
  public phone: string

  @column({
    serialize: (value: number | null) => {
      return value ? Hashids.encode(value) : value
    },
  })
  public defaultCustomerBusinessRuleId: number

  @column({
    serialize: (value: number | null) => {
      return value ? Hashids.encode(value) : value
    },
  })
  public defaultProductBusinessRuleId: number

  @column()
  public periodicCouponsSyncJobId?: string

  @column()
  public tnPlanName: string

  @column.dateTime()
  public tnCreatedAt: DateTime

  @column.dateTime()
  public syncedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime

  @hasOne(() => StoreName)
  public names: HasOne<typeof StoreName>

  @hasOne(() => StoreDescription)
  public descriptions: HasOne<typeof StoreDescription>

  @hasMany(() => StoreDomain)
  public domains: HasMany<typeof StoreDomain>

  @hasMany(() => StoreLanguage)
  public languages: HasMany<typeof StoreLanguage>

  @hasMany(() => StoreConfig)
  public configs: HasMany<typeof StoreConfig>

  @manyToMany(() => User, {
    pivotTable: 'user_permission_stores',
    pivotColumns: ['perm_id', 'org_perm_store_id'],
    pivotTimestamps: true,
  })
  public users: ManyToMany<typeof User>

  @hasMany(() => Customer)
  public customers: HasMany<typeof Customer>

  @manyToMany(() => Organization, {
    pivotTable: 'organization_permission_stores',
    pivotColumns: ['perm_id'],
    pivotForeignKey: 'store_id',
    pivotRelatedForeignKey: 'org_id',
    pivotTimestamps: true,
  })
  public organizations: ManyToMany<typeof Organization>

  @manyToMany(() => Permission, {
    pivotTable: 'organization_permission_stores',
    pivotColumns: ['org_id'],
    pivotForeignKey: 'store_id',
    pivotRelatedForeignKey: 'perm_id',
    pivotTimestamps: true,
  })
  public permissions: ManyToMany<typeof Permission>

  @hasMany(() => Log)
  public logs: HasMany<typeof Log>
}
