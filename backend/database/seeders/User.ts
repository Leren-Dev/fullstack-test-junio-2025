import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Creating superadmin User and attaching Organization
    try {
      /* const superAdmin =  */ await User.create({
        name: 'SuperAdmin',
        email: 'superadmin@lerentools.com',
        password: 'password',
        orgId: 1,
        orgRole: 'Owner',
        currentStoreId: 1,
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding SuperAdmin User', error)
    }

    // Creating admin User and attaching Organization
    try {
      /* const admin =  */ await User.create({
        name: 'Admin',
        email: 'admin@lerentools.com',
        password: 'password',
        orgId: 1,
        orgRole: 'Admin',
        currentStoreId: 1,
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding Admin User', error)
    }

    // Creating user User and attaching Organization
    try {
      /* const user =  */ await User.create({
        name: 'User',
        email: 'user@lerentools.com',
        password: 'password',
        orgId: 1,
        orgRole: 'User',
        currentStoreId: 1,
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding User User', error)
    }

    // Creating seller User and attaching Organization
    try {
      /* const seller =  */ await User.create({
        name: 'Seller',
        email: 'seller@lerentools.com',
        password: 'password',
        orgId: 1,
        orgRole: 'Seller',
        currentStoreId: 1,
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding Seller User', error)
    }

    // Creating customer User and attaching Organization
    try {
      /* const customer =  */ await User.create({
        name: 'Customer',
        email: 'customer@lerentools.com',
        password: 'password',
        orgId: 1,
        orgRole: 'Customer',
        currentStoreId: 1,
      })
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding Customer User', error)
    }
  }
}
