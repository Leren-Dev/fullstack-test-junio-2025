/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
// import Application from '@ioc:Adonis/Core/Application'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | SQLite
    |--------------------------------------------------------------------------
    |
    | Configuration for the SQLite database.  Make sure to install the driver
    | from npm when using this connection
    |
    | npm i @vscode/sqlite3
    |
    */
    /*
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: Application.tmpPath('db.sqlite3'),
      },
      pool: {
        afterCreate: (conn, cb) => {
          conn.run('PRAGMA foreign_keys=true', cb)
        }
      },
      migrations: {
        naturalSort: true,
      },
      seeders: {
        paths: ['./database/seeders/MainSeeder']
      },
      useNullAsDefault: true,
      healthCheck: false,
      debug: false,
    },
    */

    /*
    |--------------------------------------------------------------------------
    | MYSQL
    |--------------------------------------------------------------------------
    |
    | Configuration for the MYSQL database.  Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql2
    |
    */
    mysql: {
      client: 'mysql2',
      connection: {
        host: Env.get('MYSQL_HOST'),
        port: Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER'),
        password: Env.get('MYSQL_PASSWORD', ''),
        database: Env.get('MYSQL_DB_NAME'),
        charset: 'utf8',
      },
      pool: {
        // AWS RDS db.m6g.large (SHOW VARIABLES LIKE 'max_connections';) = 628
        min: parseInt(Env.get('INSTANCE_DB_MIN_CONNECTIONS_PER_CPU', 5), 10), // 8 vCPUs * 5 = 48 min BD connections // 16 vCPUs * 5 = 80 min BD connections
        max: parseInt(Env.get('INSTANCE_DB_MAX_CONNECTIONS_PER_CPU', 36), 10), // 8 vCPUs * 60 = 480 max BD connections // 16 vCPUs * 36 = 576 max BD connections
        createTimeoutMillis: 15000,
        acquireTimeoutMillis: 15000,
        idleTimeoutMillis: 60000,
        reapIntervalMillis: 6000,
        createRetryIntervalMillis: 6000,
        propagateCreateError: false,
      },
      migrations: {
        naturalSort: true,
      },
      seeders: {
        paths: ['./database/seeders/MainSeeder'],
      },
      healthCheck: true,
      debug: false,
    },
  },
}

export default databaseConfig
