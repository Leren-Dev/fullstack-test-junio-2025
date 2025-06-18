import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Organization from 'App/Models/Organization'

export default class OrganizationsController {
  public async index({}: HttpContextContract) {
    return Organization.all()
  }

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {
    // TODO: decode hashid
  }

  public async getCurrent({ auth, response }: HttpContextContract) {
    if (auth.user) {
      await auth.user.load('organization')
      if (auth.user.organization) {
        await auth.user.organization.loadCount('users')
        await auth.user.organization.loadCount('stores')
        return response.ok({
          status: true,
          organization: {
            ...auth.user.organization.serialize(),
            cant_users: auth.user.organization.$extras.users_count,
            cant_stores: auth.user.organization.$extras.stores_count,
          },
        })
      }
    }

    return response.ok({
      status: false,
      details: 'Error retrieving current Organization.',
    })
  }

  public async update({}: HttpContextContract) {
    // TODO: decode hashid
  }

  public async destroy({}: HttpContextContract) {
    // TODO: decode hashid
  }
}
