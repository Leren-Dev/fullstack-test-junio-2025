/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: Error) {
    if (
      error &&
      error.message &&
      error.message !== 'E_INVALID_API_TOKEN: Invalid API token' &&
      error.message !== 'E_UNAUTHORIZED_ACCESS: Unauthorized access' &&
      error.message !== 'Too many requests! Please try again later.'
    ) {
      const timestamp = new Date().toJSON()
      console.trace(
        `[${timestamp}]: UNEXPECTED GENERAL ERROR: mgs=${error.message}, details=${error.stack}`
      )
    }
  }
}
