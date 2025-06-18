import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
  public async index({ auth, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      return response.ok({
        status: true,
        msg: `Bienvenido/a ${auth.user.name}!`,
        dashboard: {},
      })
    }

    return response.ok({
      status: false,
    })
  }
}
