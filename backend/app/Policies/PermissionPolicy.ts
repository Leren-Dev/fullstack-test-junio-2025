import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
// import Permission from 'App/Models/Permission'

export default class PermissionPolicy extends BasePolicy {
  // Si el User tiene el Permiso de AccesoTotal devuelvo siempre true
  public async before(user: User | null) {
    if (user) {
      await user.load('permissions')
      const permissions = [...new Set(user.permissions)]
      if (permissions.find((p) => p.guardName === 'TotalAccess')) {
        return true
      }
    }
  }

  public async viewList(/* user: User */) {
    return false
  }
  public async view(/* user: User, permission: Permission */) {
    return false
  }
  public async create(/* user: User */) {
    return false
  }
  public async update(/* user: User, permission: Permission */) {
    return false
  }
  public async delete(/* user: User, permission: Permission */) {
    return false
  }
}
