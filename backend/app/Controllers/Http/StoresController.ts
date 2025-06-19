import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import StoreService from 'App/Services/StoreService'
import StoreConfig from 'App/Models/StoreConfig'
import StoreConfigValue from 'App/Models/StoreConfigValue'

export default class StoresController {
  public async index({}: HttpContextContract) {
    // TODO: implement
  }

  public async store({}: HttpContextContract) {
    // TODO: implement
  }

  public async show({}: HttpContextContract) {
    // TODO: decode hashid + implement
  }

  public async update({}: HttpContextContract) {
    // TODO: decode hashid + implement
  }

  public async destroy({}: HttpContextContract) {
    // TODO: decode hashid + implement
  }

  public async getCurrent({ auth, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      const storeService = new StoreService(undefined, auth.user.currentStoreId)
      const store = await storeService.getStore()
      await store.load('names')
      await store.load('configs', (q) => {
        q.preload('values')
      })
      await store.loadCount('customers')

      const responseData: any = { status: true }

      responseData.store = {
        ...store.serialize(),
        configs: store.configs.map((c) => {
          return {
            ...c.serialize(),
            values: c.values.map((v) => {
              return {
                ...v.serialize(),
              }
            }),
          }
        }),
        customers_count: store.$extras.customers_count,
      }

      return response.ok(responseData)
    }

    return response.ok({
      status: false,
    })
  }

  public async setCurrent({ auth, request, response }: HttpContextContract) {
    if (auth.user) {
      const storeIdHash = request.input('store_id')
      const storeId = Hashids.decode(storeIdHash)[0] as number
      auth.user.currentStoreId = storeId
      await auth.user.save()

      return response.ok({
        status: true,
      })
    }

    return response.ok({
      status: false,
    })
  }

  public async updateStoreConfig({ auth, request, response }: HttpContextContract) {
    if (auth.user) {
      // TODO: Refactor - Mover esta implementación a StoreService
      const data = request.input('data')
      /* data = {
        type: 'sales' | 'application:business_rules',
        value: {
          name: 'monthly_target' | 'payment_providers_message' | 'shipping_carriers_message' | 'cart_installments',
          type: 'number' | 'text',
          // value: value,
          status: true | false
        }
      } */

      if (data?.id) {
        data.id = Hashids.decode(data.id)[0] as number
      }
      const storeService = new StoreService(undefined, auth.user.currentStoreId)
      const store = await storeService.getStore()
      const storeConfig = await StoreConfig.updateOrCreate(
        {
          storeId: store.id,
          type: data.store_config_type,
        },
        {
          storeId: store.id,
          type: data.store_config_type,
          status: true,
        }
      )
      await StoreConfigValue.updateOrCreate(
        {
          storeConfigId: storeConfig.id,
          name: data.name,
        },
        {
          storeConfigId: storeConfig.id,
          name: data.name,
          type: data.type,
          value: data.value,
          status: data.status,
        }
      )

      return response.ok({
        status: true,
        details: 'La configuración de la tienda se actualizó exitosamente!',
      })
    }

    return response.ok({
      status: false,
      details: 'Ocurrió un error al actualizar la configuración de la tienda.',
    })
  }
}
