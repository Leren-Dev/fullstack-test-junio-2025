import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Menu from 'App/Models/Menu'
import Menulist from 'App/Models/Menulist'
import Permission from 'App/Models/Permission'

export default class MenuSeeder extends BaseSeeder {
  public async run() {
    // Creating sidebar Menulist
    try {
      const totalAccessPermissions = await Permission.firstOrFail()

      const sidebarMenulist = await Menulist.create({
        name: 'sidebar',
      })

      // Creating administracion Menu separator
      try {
        const adminUsersMenuSeparator = await Menu.create({
          sequence: 1,
          name: 'Administración',
          icon: '',
          type: 'separator',
          href: '',
        })
        await adminUsersMenuSeparator.related('menulist').associate(sidebarMenulist)
        await adminUsersMenuSeparator.related('permissions').attach([totalAccessPermissions.id])
      } catch (error) {
        const timestamp = new Date().toJSON()
        console.log(`[${timestamp}]: ` + 'Error seeding administration Menu separator', error)
      }

      // Creating admin-users Menu link
      try {
        const adminUsersMenu = await Menu.create({
          sequence: 2,
          name: 'Usuarios Admin',
          icon: 'UserCircle',
          type: 'link',
          href: '/admin-users',
        })
        await adminUsersMenu.related('menulist').associate(sidebarMenulist)
        await adminUsersMenu.related('permissions').attach([totalAccessPermissions.id])
      } catch (error) {
        const timestamp = new Date().toJSON()
        console.log(`[${timestamp}]: ` + 'Error seeding admin-users Menu link', error)
      }

      // Creating users Menu link
      try {
        const usersMenu = await Menu.create({
          sequence: 3,
          name: 'Usuarios',
          icon: 'User',
          type: 'link',
          href: '/users',
        })
        await usersMenu.related('menulist').associate(sidebarMenulist)
        await usersMenu.related('permissions').attach([totalAccessPermissions.id])
      } catch (error) {
        const timestamp = new Date().toJSON()
        console.log(`[${timestamp}]: ` + 'Error seeding users Menu link', error)
      }

      // Creating general Menu separator
      try {
        const generalMenuSeparator = await Menu.create({
          sequence: 4,
          name: 'General',
          icon: '',
          type: 'separator',
          href: '',
        })
        await generalMenuSeparator.related('menulist').associate(sidebarMenulist)
        await generalMenuSeparator.related('permissions').attach([totalAccessPermissions.id])
      } catch (error) {
        const timestamp = new Date().toJSON()
        console.log(`[${timestamp}]: ` + 'Error seeding general Menu separator', error)
      }

      // Creating stores Menu link
      try {
        const storesMenu = await Menu.create({
          sequence: 5,
          name: 'Tiendas',
          icon: 'ShoppingCart',
          type: 'link',
          href: '/stores',
        })
        await storesMenu.related('menulist').associate(sidebarMenulist)
        await storesMenu.related('permissions').attach([totalAccessPermissions.id])
      } catch (error) {
        const timestamp = new Date().toJSON()
        console.log(`[${timestamp}]: ` + 'Error seeding stores Menu', error)
      }

      // Creating orders Menu link
      try {
        const ordersMenu = await Menu.create({
          sequence: 6,
          name: 'Ordenes',
          icon: 'RectangleStack',
          type: 'link',
          href: '/orders',
        })
        await ordersMenu.related('menulist').associate(sidebarMenulist)
        await ordersMenu.related('permissions').attach([totalAccessPermissions.id])
      } catch (error) {
        const timestamp = new Date().toJSON()
        console.log(`[${timestamp}]: ` + 'Error seeding orders Menu', error)
      }

      // Creating customers Menu link
      try {
        const customersMenu = await Menu.create({
          sequence: 7,
          name: 'Clientes',
          icon: 'Users',
          type: 'link',
          href: '/customers',
        })
        await customersMenu.related('menulist').associate(sidebarMenulist)
        await customersMenu.related('permissions').attach([totalAccessPermissions.id])
      } catch (error) {
        const timestamp = new Date().toJSON()
        console.log(`[${timestamp}]: ` + 'Error seeding customers Menu', error)
      }

      // Creating products Menu link
      try {
        const productsMenu = await Menu.create({
          sequence: 8,
          name: 'Productos',
          icon: 'Cube',
          type: 'link',
          href: '/products',
        })
        await productsMenu.related('menulist').associate(sidebarMenulist)
        await productsMenu.related('permissions').attach([totalAccessPermissions.id])
      } catch (error) {
        const timestamp = new Date().toJSON()
        console.log(`[${timestamp}]: ` + 'Error seeding products Menu', error)
      }
    } catch (error) {
      const timestamp = new Date().toJSON()
      console.log(`[${timestamp}]: ` + 'Error seeding sidebar Menulist', error)
    }
  }
}
