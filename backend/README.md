# Adonis v5

API server

## Setup

```
npm install
```

## Running localy

```
node ace serve --watch
```

## Running tests

```
node ace test
```

## Compiles and minifies for local env

```
node ace build
```

## Scaffolding

- For 'controllers' use `node ace make:controller [Name]`. https://docs.adonisjs.com/guides/controllers

- For 'middlewares' use `node ace make:middleware [Name]`. https://docs.adonisjs.com/guides/middleware

- For 'models' use `node ace make:model [Name]`. You can add `-m` flag to also create a database migration. https://docs.adonisjs.com/guides/models/introduction

- For 'migrations' use `node ace make:migration [name]`. https://docs.adonisjs.com/guides/database/migrations
  - To run all migrations use `node ace migration:run`.
  - To rollback migrations use `node ace migration:reset`.
    - To rollback only latest batch use `node ace migration:rollback`. You can add `--batch=[number]` to select more batches.
  - To rollback and migrate in a single command use `node ace migration:refresh`. You can add `--seed` to run all seeders.
  - To drop tables and migrate in a single command use `node ace migration:fresh`. You can add `--seed` to run all seeders.
    - To drop all tables use `db:wipe`.
  - For a dry run add `--dry-run`.
- For 'seeders' use `node ace make:seeder [Name]`. https://docs.adonisjs.com/guides/database/seeders

  - To run seeders use `node ace db:seed`.

- For 'policies' use `node ace make:policy [Name]`. https://docs.adonisjs.com/guides/authorization#using-policies

- For request body 'validators' use `node ace make:validator [Name]`. https://docs.adonisjs.com/guides/validator/introduction

- For 'event listeners' use `node ace make:listener [Name]`. https://docs.adonisjs.com/guides/events

- For 'views' use `node ace make:view [name]`. https://docs.adonisjs.com/guides/views/introduction

- For 'mailers' use `node ace make:mailer [Name]`. https://docs.adonisjs.com/guides/mailer

- For 'providers' use `node ace make:provider [Name]`.

- For 'tests' use `node ace make:test [functional/unit] [name]`.

- Other important links:
  - Hashids: https://hashids.org/ from custom integration
  - Request throttling: https://github.com/reg2005/adonis-request-throttler
