import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginUser from 'App/Validators/LoginUserValidator'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    // login - expira en 30 dias
    try {
      const payload = await request.validate(LoginUser)

      const email = payload.email
      const password = payload.password

      await auth.verifyCredentials(email, password)

      const user = await User.findByOrFail('email', email)
      if (!user.currentStoreId) {
        await user.load('stores', (q) => {
          q.limit(1)
        })
        const store = user.stores[0]
        if (store && store.id) {
          user.currentStoreId = store.id
          await user.save()
        }
      }

      const token = await auth.login(user, {
        expiresIn: '30days',
      })
      return response.ok(token)
    } catch (error) {
      return response.badRequest(error.messages || error)
    }
  }

  public async token({ auth, request, response }: HttpContextContract) {
    // token - es valido para otros sistemas que se integren, expira en 12 horas
    try {
      const payload = await request.validate(LoginUser)

      const email = payload.email
      const password = payload.password

      await auth.verifyCredentials(email, password)

      const user = await User.findByOrFail('email', email)
      if (!user.currentStoreId) {
        await user.load('stores', (q) => {
          q.limit(1)
        })
        const store = user.stores[0]
        if (store && store.id) {
          user.currentStoreId = store.id
          await user.save()
        }
      }

      const token = await auth.login(user, {
        expiresIn: '720mins', // 12 horas
      })
      return response.ok(token)
    } catch (error) {
      return response.badRequest(error.messages || error)
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.authenticate()
    await auth.logout()
  }
}
