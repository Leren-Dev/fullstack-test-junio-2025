import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class PermissionSeeder extends BaseSeeder {
  public async run() {
    // Creating every Permission
    try {
      await Permission.createMany([
        /*** SuperAdmin ***/
        {
          name: 'Acceso Total',
          guardName: 'TotalAccess',
          description: 'Permiso de control total del sistema.',
          level: 9999,
        },
        /*** Users ***/
        {
          name: 'Listar Usuarios',
          guardName: 'ListUsers',
          description: 'Permiso para listar los Usuarios del sistema.',
          level: 100,
        },
        {
          name: 'Ver Usuarios',
          guardName: 'ReadUsers',
          description: 'Permiso para consultar el detalle de los Usuarios del sistema.',
          level: 200,
        },
        {
          name: 'Crear Usuarios',
          guardName: 'CreateUsers',
          description: 'Permiso para crear Usuarios en el sistema.',
          level: 400,
        },
        {
          name: 'Editar Usuarios',
          guardName: 'EditUsers',
          description: 'Permiso para editar Usuarios del sistema.',
          level: 300,
        },
        {
          name: 'Eliminar Usuarios',
          guardName: 'DeleteUsers',
          description: 'Permiso para eliminar Usuarios del sistema.',
          level: 400,
        },
        /*** Stores ***/
        {
          name: 'Store Owner',
          guardName: 'StoreOwner',
          description: 'Permiso que posee el dueño de una tienda.',
          level: 1000,
        },
      ])
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding Permissions', error)
    }
  }
}
