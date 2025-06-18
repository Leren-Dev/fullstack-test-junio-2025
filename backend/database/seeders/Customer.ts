import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Customer from 'App/Models/Customer'
import CustomerAddress from 'App/Models/CustomerAddress'
import { DateTime } from 'luxon'

export default class CustomerSeeder extends BaseSeeder {
  public async run() {
    // Creating superadmin User and attaching Organization
    try {
      await Customer.create({
        storeId: 1,
        tnId: 999999991,
        name: 'Customer 11',
        email: 'customer11@lerentools.com',
        identification: '33444511',
        totalSpent: 666.66,
        totalSpentCurrency: 'ARS',
        active: true,
        tnCreatedAt: DateTime.now(),
        tnUpdatedAt: DateTime.now(),
      })

      await CustomerAddress.create({
        customerId: 1,
        tnId: 999999992,
        address: 'Calle y altura 1',
        city: 'Buenos Aires',
        country: 'AR',
        tnCreatedAt: DateTime.now(),
        tnUpdatedAt: DateTime.now(),
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding first Customer', error)
    }

    // Creating admin User and attaching Organization
    try {
      await Customer.create({
        storeId: 1,
        tnId: 999999993,
        name: 'Customer 12',
        email: 'customer12@lerentools.com',
        identification: '33444512',
        totalSpent: 777.66,
        totalSpentCurrency: 'ARS',
        active: true,
        tnCreatedAt: DateTime.now(),
        tnUpdatedAt: DateTime.now(),
      })

      await CustomerAddress.create({
        customerId: 2,
        tnId: 999999994,
        address: 'Calle y altura 2',
        city: 'Buenos Aires',
        country: 'AR',
        tnCreatedAt: DateTime.now(),
        tnUpdatedAt: DateTime.now(),
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding second Customer', error)
    }

    // Creating user User and attaching Organization
    try {
      await Customer.create({
        storeId: 2,
        tnId: 999999995,
        name: 'Customer 23',
        email: 'customer23@lerentools.com',
        identification: '33444523',
        totalSpent: 888.66,
        totalSpentCurrency: 'ARS',
        active: true,
        tnCreatedAt: DateTime.now(),
        tnUpdatedAt: DateTime.now(),
      })

      await CustomerAddress.create({
        customerId: 3,
        tnId: 999999996,
        address: 'Calle y altura 3',
        city: 'Buenos Aires',
        country: 'AR',
        tnCreatedAt: DateTime.now(),
        tnUpdatedAt: DateTime.now(),
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding third Customer', error)
    }

    // Creating seller User and attaching Organization
    try {
      await Customer.create({
        storeId: 2,
        tnId: 999999997,
        name: 'Customer 24',
        email: 'customer24@lerentools.com',
        identification: '33444524',
        totalSpent: 999.66,
        totalSpentCurrency: 'ARS',
        active: true,
        tnCreatedAt: DateTime.now(),
        tnUpdatedAt: DateTime.now(),
      })

      await CustomerAddress.create({
        customerId: 4,
        tnId: 999999998,
        address: 'Calle y altura 4',
        city: 'Buenos Aires',
        country: 'AR',
        tnCreatedAt: DateTime.now(),
        tnUpdatedAt: DateTime.now(),
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding fourth Customer', error)
    }
  }
}
