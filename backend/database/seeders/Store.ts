import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Store from 'App/Models/Store'
import StoreName from 'App/Models/StoreName'
import { DateTime } from 'luxon'

export default class StoreSeeder extends BaseSeeder {
  public async run() {
    // Creating first Store
    try {
      await Store.create({
        tnId: 12345678,
        status: 'Created',
        address: 'Calle falsa 123',
        email: 'store1@lerentools.com',
        country: 'AR',
        originalDomain: 'store1.lerentools.com',
        currentTheme: 'Rio',
        mainLanguage: 'es',
        mainCurrency: 'ARS',
        phone: '42001337',
        tnPlanName: 'enterprise',
        tnCreatedAt: DateTime.now(),
        syncedAt: DateTime.now(),
      })

      await StoreName.create({
        storeId: 1,
        es: 'Store 1',
        pt: 'Store 1',
        en: 'Store 1',
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding first Store', error)
    }

    // Creating second Store
    try {
      await Store.create({
        tnId: 87654321,
        status: 'Created',
        address: 'Calle falsa 321',
        email: 'store2@lerentools.com',
        country: 'AR',
        originalDomain: 'store2.lerentools.com',
        currentTheme: 'Rio',
        mainLanguage: 'es',
        mainCurrency: 'ARS',
        phone: '13374200',
        tnPlanName: 'enterprise',
        tnCreatedAt: DateTime.now(),
        syncedAt: DateTime.now(),
      })

      await StoreName.create({
        storeId: 2,
        es: 'Store 2',
        pt: 'Store 2',
        en: 'Store 2',
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding second Store', error)
    }
  }
}
