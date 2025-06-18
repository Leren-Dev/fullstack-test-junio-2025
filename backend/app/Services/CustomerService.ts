import Customer from 'App/Models/Customer'
import Hashids from '@ioc:Adonis/Addons/Hashids'

export default class CustomerService {
  constructor(protected tnCustomerId?: number, protected customerId?: number) {}

  public async getCustomer() {
    // Obtener el customer correspondiente en nuestra BD
    if (this.customerId) {
      return Customer.findOrFail(this.customerId)
    }
    if (this.tnCustomerId) {
      return Customer.findByOrFail('tnId', this.tnCustomerId)
    }

    const timestamp = new Date().toJSON()
    throw new Error(
      `[${timestamp}]: Tiendanube Customer not found. Received tnID: ${this.tnCustomerId}, ID: ${this.customerId}`
    )
  }

  public async getCustomers(auth, request, serialize?: boolean) {
    const page: number = request.page || 1
    const limit: number = request.limit || 20
    const search: string = request.search || ''
    const category: string = request.category || 'All'
    const orders: number = Number(request.orders || -1)
    const ordersOperator: string = request.orders_operator || null
    const ordersComparisonOperators: any = {
      'Igual a': '=',
      'Distinto a': '!=',
      'Menor a': '<',
      'Menor o igual a': '<=',
      'Mayor a': '>',
      'Mayor o igual a': '>=',
    }

    const customersIDsQuery = Customer.query()
      .select('customers.id')
      .orderBy('id', 'desc') // OJO aca nunca ordenar por un campo que no sea index
      .where('customers.store_id', auth.user.currentStoreId)
    if (search) {
      customersIDsQuery.andWhere((q) => {
        q.whereILike('name', '%' + search + '%')
          .orWhereILike('email', '%' + search + '%')
          .orWhereILike('identification', '%' + search + '%')
      })
    }
    if (category && category !== 'All') {
      const categoryId = Hashids.decode(category)[0] as number
      customersIDsQuery.andWhere('categoryId', categoryId)
    }
    if (orders >= 0 && ordersOperator && ordersComparisonOperators[ordersOperator]) {
      customersIDsQuery
        .leftJoin('orders', 'customers.id', 'orders.customer_id')
        .groupBy('customers.id')
        .havingRaw(`COALESCE(COUNT(orders.id), 0) ${ordersComparisonOperators[ordersOperator]} ?`, [
          orders,
        ])
    }

    const customersIDs = await customersIDsQuery.paginate(page, limit)

    if (
      customersIDs.length === 0 &&
      customersIDs.total > 0 &&
      customersIDs.currentPage > customersIDs.lastPage
    ) {
      const altCustomersIDs = await customersIDsQuery.paginate(customersIDs.lastPage, limit)

      const altCustomers = await Customer.query()
        .whereIn(
          'id',
          altCustomersIDs.map((o) => o.id)
        )
        .orderBy('tnId', 'desc')

      return {
        status: true,
        customers: {
          data: !serialize
            ? altCustomers
            : altCustomers.map((customer) => {
                return { ...customer.serialize(), cant_orders: customer.$extras.orders_count }
              }),
          meta: altCustomersIDs.getMeta(),
        },
        details: altCustomers.length
          ? 'Ok'
          : 'Ups, no encontramos clientes que cumplan con esas condiciones...',
      }
    }

    const customers = await Customer.query()
      .whereIn(
        'id',
        customersIDs.map((o) => o.id)
      )
      .orderBy('tnId', 'desc')

    return {
      status: true,
      customers: {
        data: !serialize
          ? customers
          : customers.map((customer) => {
              return { ...customer.serialize(), cant_orders: customer.$extras.orders_count }
            }),
        meta: customersIDs.getMeta(),
      },
      details: customers.length
        ? 'Ok'
        : 'Ups, no encontramos clientes que cumplan con esas condiciones...',
    }
  }
}
