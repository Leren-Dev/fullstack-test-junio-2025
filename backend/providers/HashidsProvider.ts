import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Config from '@ioc:Adonis/Core/Config'
import HashidsInstance from 'hashids/cjs/hashids'

/**
 * Hashids class
 *
 * @namespace Adonis/Addons/Hashids
 * @singleton
 * @alias Hashids
 *
 * @class Hashids
 * @constructor
 */
class Hashids extends HashidsInstance {
  // Esto podría extraerse a otro paquete
  /**
   * returns instance of a new factory instance for
   * a given connection
   *
   * @param  {String} [connection='']
   *
   * @return {Object} Instance of hashids
   *
   * @public
   */
  public connection(connection: string = ''): Object {
    connection = connection || Config.get('hashids.connection')
    const config = Config.get(`hashids.${connection}`)

    if (!config) {
      null
    }

    return new HashidsInstance(config.salt, config.length, config.alphabet)
  }
}

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
|
| Your application is not ready when this file is loaded by the framework.
| Hence, the top level imports relying on the IoC container will not work.
| You must import them inside the life-cycle methods defined inside
| the provider class.
|
| @example:
|
| public async ready () {
|   const Database = this.app.container.resolveBinding('Adonis/Lucid/Database')
|   const Event = this.app.container.resolveBinding('Adonis/Core/Event')
|   Event.on('db:query', Database.prettyPrint)
| }
|
*/
export default class HashidsProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('Adonis/Addons/Hashids', () => {
      return new Hashids().connection()
    })
  }
}
