import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CustomerCategory from 'App/Models/CustomerCategory'
import Hashids from '@ioc:Adonis/Addons/Hashids'

export default class CustomerCategoriesController {
  public async index({ auth, request, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      // TODO: Refactor - Crear CustomerCategoryService y mover esta implementación a CustomerCategoryService
      const page: number = request.input('page', 1)
      const limit: number = 100
      const search: string = request.input('search', '')

      const customerCategoriesIDsQuery = CustomerCategory.query()
        .select('customer_categories.id')
        .orderBy('customer_categories.id', 'desc') // OJO aca nunca ordenar por un campo que no sea index idealmente
        .where('storeId', auth.user.currentStoreId)
      if (search) {
        customerCategoriesIDsQuery.whereILike('customer_categories.name', '%' + search + '%')
      }

      const customerCategoriesIDs = await customerCategoriesIDsQuery.paginate(page, limit)

      if (
        customerCategoriesIDs.length === 0 &&
        customerCategoriesIDs.total > 0 &&
        customerCategoriesIDs.currentPage > customerCategoriesIDs.lastPage
      ) {
        const altCustomerCategoriesIDs = await customerCategoriesIDsQuery.paginate(
          customerCategoriesIDs.lastPage,
          limit
        )

        const altCustomerCategories = CustomerCategory.query().whereIn(
          'id',
          altCustomerCategoriesIDs.map((c) => c.id)
        )
        if (request.input('include_customers')) {
          altCustomerCategories.withCount('customers')
        }
        altCustomerCategories.orderBy('customer_categories.id', 'desc')

        const customerCategories = await altCustomerCategories

        return response.ok({
          status: true,
          customer_categories: {
            data: customerCategories.map((cc) => {
              return {
                ...cc.serialize(),
                rules_count: cc.$extras.rules_count || 0,
                customers_count: cc.$extras.customers_count || 0,
              }
            }),
            meta: altCustomerCategoriesIDs.getMeta(),
          },
          details: customerCategories.length
            ? 'Ok'
            : 'Ups, no encontramos Categorías de Clientes que cumplan con esas condiciones...',
        })
      }

      const altCustomerCategories = CustomerCategory.query().whereIn(
        'id',
        customerCategoriesIDs.map((c) => c.id)
      )
      if (request.input('include_customers')) {
        altCustomerCategories.withCount('customers')
      }
      altCustomerCategories.orderBy('customer_categories.id', 'desc')

      const customerCategories = await altCustomerCategories

      return response.ok({
        status: true,
        customer_categories: {
          data: customerCategories.map((cc) => {
            return {
              ...cc.serialize(),
              rules_count: cc.$extras.rules_count || 0,
              customers_count: cc.$extras.customers_count || 0,
            }
          }),
          meta: customerCategoriesIDs.getMeta(),
        },
        details: customerCategories.length
          ? 'Ok'
          : 'Ups, no encontramos Categorías de Clientes que cumplan con esas condiciones...',
      })
    }

    return response.ok({
      status: false,
    })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      // TODO: Refactor - Crear CustomerCategoryService y mover esta implementación a CustomerCategoryService
      const name = request.input('name')
      const description = request.input('description')

      const customerCategory = await CustomerCategory.create({
        storeId: auth.user.currentStoreId,
        name: name,
        description: description,
      })

      return response.ok({
        status: true,
        customer_category: customerCategory,
        details: customerCategory
          ? 'Ok'
          : 'Ups, ocurrió un error al intentar crear la nueva Categoría de Cliente...',
      })
    }

    return response.ok({
      status: false,
    })
  }

  // public async show({ auth, params, response }: HttpContextContract) {

  // }

  // public async update({ auth, params, request, response }: HttpContextContract) {

  // }

  public async destroy({ auth, params, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      // TODO: Refactor - Crear CustomerCategoryService y mover esta implementación a CustomerCategoryService
      const id = Hashids.decode(params.id)[0] as number

      const customerCategory = await CustomerCategory.query()
        .where('storeId', auth.user.currentStoreId)
        .andWhere('id', id)
        .firstOrFail()
      await customerCategory.forceDelete()

      return response.ok({
        status: true,
        details: customerCategory
          ? 'Ok'
          : 'Ups, ocurrió un error al intentar eliminar la categoría de cliente...',
      })
    }

    return response.ok({
      status: false,
    })
  }
}
