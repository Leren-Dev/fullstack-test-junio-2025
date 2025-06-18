import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Organization from 'App/Models/Organization'
import Permission from 'App/Models/Permission'

export default class OrganizationSeeder extends BaseSeeder {
  public async run() {
    // Creating Leren Organization and attaching Permissions
    try {
      const lerenOrganization = await Organization.create({
        name: 'Leren',
        email: 'info@leren.com.ar',
        supportEmail: 'soporte@leren.com.ar',
        devEmail: 'dev@leren.com.ar',
        phone: '12345678',
        url: 'https://www.leren.com.ar',
      })
      const allPermissions = await Permission.all()
      await lerenOrganization.related('permissions').attach(allPermissions.map((p) => p.id))
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding Leren Organization', error)
    }
  }
}
