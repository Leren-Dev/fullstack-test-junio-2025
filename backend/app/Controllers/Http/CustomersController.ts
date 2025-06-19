import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import Customer from 'App/Models/Customer'
import CustomerService from 'App/Services/CustomerService'

export default class CustomersController {
  public async index({ auth, request, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      const requestData = request.all()

      const customerService = new CustomerService()
      const customerServiceResponse = await customerService.getCustomers(auth, requestData, true)

      return {
        status: true,
        customers: {
          data: customerServiceResponse.customers.data,
          meta: customerServiceResponse.customers.meta,
        },
        details: customerServiceResponse.details,
      }
    }

    return response.ok({
      status: false,
    })
  }

  public async getName({ auth, params, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      // TODO: Refactor - Mover esta implementación a CustomerService
      const id = Hashids.decode(params.id)[0] as number

      if (id) {
        const customerIdQuery = Customer.query().select('id', 'name').where('id', id)

        const customerId = await customerIdQuery

        const customerQuery = Customer.query().where(
          'id',
          customerId.map((o) => o.id)
        )

        const customer = await customerQuery

        return {
          status: true,
          name: customer[0].name,
        }
      }
    }

    return response.ok({
      status: false,
    })
  }

  public async store({}: HttpContextContract) {}

  public async show({ auth, params, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      // TODO: Refactor - Mover esta implementación a CustomerService
      const id = Hashids.decode(params.id)[0] as number
      const customer = await Customer.query()
        .where('storeId', auth.user.currentStoreId)
        .andWhere('id', id)
        .firstOrFail()
      return response.ok({
        status: true,
        customer: customer,
      })
    }

    return response.ok({
      status: false,
    })
  }

  public async update({ auth, params, request, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      // TODO: Refactor - Mover esta implementación a CustomerService
      const id = Hashids.decode(params.id)[0] as number
      const requestData = request.all()
      const newData = {
        categoryId: requestData.category_id
          ? (Hashids.decode(requestData.category_id)[0] as number)
          : null,
      }

      const customer = await Customer.query()
        .where('storeId', auth.user.currentStoreId)
        .andWhere('id', id)
        .firstOrFail()
      const result = await customer.merge(newData).save()

      return response.ok({
        status: true,
        customer: customer,
        details: result ? 'Ok' : 'Ups, ocurrió un error al intentar actualizar el Cliente...',
      })
    }

    return response.ok({
      status: false,
    })
  }

  public async destroy({}: HttpContextContract) {
    // TODO: decode hashid + implement
  }
}
