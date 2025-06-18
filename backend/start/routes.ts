/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

// Using 'throttle' Middleware for all routes (when needed)

/**************************/
/********** Auth **********/
/**************************/

Route.post('login', 'AuthController.login').as('login').middleware(['throttle'])

Route.post('token', 'AuthController.token').as('token').middleware(['throttle'])

Route.get('logout', 'AuthController.logout').as('logout').middleware(['throttle'])

/*****************************************/
/*************** Public V2 ***************/
/*****************************************/

// Group with prefix '/v2' + Middleware 'auth:api'
Route.group(() => {
  /*******************************/
  /********** Dashboard **********/
  /*******************************/

  Route.get('dashboard', 'DashboardController.index')

  /***********************************/
  /********** Organizations **********/
  /***********************************/

  Route.get('organizations/current', 'OrganizationsController.getCurrent')
  Route.post('organizations/:id/associate/store', 'OrganizationsController.associateStore')
  Route.resource('organizations', 'OrganizationsController').apiOnly()

  /**********************************/
  /************* Stores *************/
  /**********************************/

  Route.get('stores/current', 'StoresController.getCurrent')
  Route.resource('stores', 'StoresController').apiOnly()

  /********************************************/
  /*********** Customers Categories ***********/
  /********************************************/

  Route.resource('customer_categories', 'CustomerCategoriesController').apiOnly()

  /*********************************/
  /*********** Customers ***********/
  /*********************************/

  Route.get('customers/get_name/:id', 'CustomersController.getName')
  Route.resource('customers', 'CustomersController').apiOnly()

  /**********************************/
  /************* Labels *************/
  /**********************************/

  Route.put('labels/:id/status', 'LabelsController.setLabelStatus')
  Route.resource('labels', 'LabelsController').apiOnly()

  /***************************/
  /********** Users **********/
  /***************************/

  // Info de los endpoint tipo 'resource':
  // Estos endpoints Route.resource generan las siguientes rutas con su correspondiente metodo de controller, asi:
  //// GET request a API_V2_BASE_URL/users - Controller metodo 'index'
  //// POST request a API_V2_BASE_URL/users - Controller metodo 'store'
  //// GET request a API_V2_BASE_URL/users/:id - Controller metodo 'show'
  //// PUT o PATCH request a API_V2_BASE_URL/users/:id - Controller metodo 'update'
  //// DELETE request a API_V2_BASE_URL/users/:id - Controller metodo 'destroy'
  Route.get('users/current', 'UsersController.getCurrent')
  Route.resource('users', 'UsersController').apiOnly()
  // .apiOnly lo que hace es eliminar estas dos rutas con su correspondiente metodo:
  //// GET a API_V2_BASE_URL/users/create - Controller metodo 'create'
  //// GET a API_V2_BASE_URL/users/:id/edit - Controller metodo 'edit'
})
  .prefix('/v2')
  .middleware(['auth:api', 'throttle'])

/**************************************/
/*********** End Tiendanube ***********/
/**************************************/

/************************************/
/********** Healthy checks **********/
/************************************/

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.get('/', async ({ response }) => {
  return response.ok({
    status: true,
    details: 'Bienvenido al desafío técnico - Full stack dev - Leren Junio 2025',
  })
})

// Catch all
Route.any('*', async ({ response }) => {
  return response.notFound({ status: false, error: 'Route not found' })
}).middleware(['throttle'])
