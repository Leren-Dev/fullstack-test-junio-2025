import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserService from 'App/Services/UserService'
import { DateTime } from 'luxon'
import Hashids from '@ioc:Adonis/Addons/Hashids'

export default class UsersController {
  public async index({}: HttpContextContract) {
    return User.all()
  }

  public async store({}: HttpContextContract) {
    // TODO:
  }

  public async show({}: HttpContextContract) {
    // TODO: decode hashid
  }

  public async update({}: HttpContextContract) {
    // TODO: decode hashid
  }

  public async destroy({ auth, params, request, response, route, routeKey }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      const userId = Hashids.decode(params.id)[0] as number
      const userService = new UserService(userId)
      const currentUser = await userService.getUser()
      const startTime = DateTime.now()

      try {
        if (currentUser) {
          await currentUser.delete()
        }

        await auth.logout()
      } catch (error) {
        const err = new Error(error)
        const endTime = DateTime.now()
        console.log(
          JSON.stringify({
            time: endTime.toISO(),
            durations_ms: endTime.toMillis() - startTime.toMillis(),
            msg: 'Error EXCEPTION al eliminar User para el Store',
            error: true,
            error_name: err.name,
            error_message: err.message,
            error_stack: err.stack,
            user_id: userId,
            store_id: currentUser.currentStoreId,
            store_tn_id: currentUser.currentStoreId,
            name: route?.handler,
            http_route_key: routeKey,
            http_status_code: 200,
            request_params: params,
            request_body: request.all(),
            request_id: request.id(),
          })
        )

        return response.ok({
          status: false,
        })
      }

      return response.ok({
        status: true,
        details: 'Account deleted with success',
      })
    }

    return response.ok({
      status: false,
    })
  }

  public async getCurrent({ auth, response }: HttpContextContract) {
    if (auth.user) {
      return response.ok({
        status: true,
        user: auth.user,
      })
    }

    return response.ok({
      status: false,
    })
  }
}
