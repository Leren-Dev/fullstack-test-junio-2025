import Organization from 'App/Models/Organization'
import User from 'App/Models/User'

export default class OrganizationService {
  constructor(protected userId?: number, protected organizationId?: number) {}

  public async getOrganization() {
    // Obtener la organization correspondiente en nuestra BD
    if (this.organizationId) {
      return Organization.findOrFail(this.organizationId)
    }

    const timestamp = new Date().toJSON()
    throw new Error(`[${timestamp}]: Organization not found. ID: ${this.organizationId}`)
  }

  public async getOwnerUser() {
    if (this.organizationId) {
      return await User.query()
        .where('orgId', this.organizationId)
        .andWhere('orgRole', 'Owner')
        .first()
    }

    const timestamp = new Date().toJSON()
    throw new Error(`[${timestamp}]: Organization not found. ID: ${this.organizationId}`)
  }
}
