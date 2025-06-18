import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
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

  public async viewList(loggedUser: User) {
    if (loggedUser) {
      await loggedUser.load('permissions')
      const permissions = [...new Set(loggedUser.permissions)]
      if (permissions.find((p) => p.guardName === 'ListUsers')) {
        return true
      }
    }
  }
  public async view(loggedUser: User /* , user: User */) {
    if (loggedUser) {
      await loggedUser.load('permissions')
      const permissions = [...new Set(loggedUser.permissions)]
      if (permissions.find((p) => p.guardName === 'ReadUsers')) {
        return true
      }
    }
  }
  public async create(loggedUser: User) {
    if (loggedUser) {
      await loggedUser.load('permissions')
      const permissions = [...new Set(loggedUser.permissions)]
      if (permissions.find((p) => p.guardName === 'CreateUsers')) {
        return true
      }
    }
  }
  public async createAdmin(/* loggedUser: User */) {
    return false
  }
  public async update(loggedUser: User /* , user: User */) {
    if (loggedUser) {
      await loggedUser.load('permissions')
      const permissions = [...new Set(loggedUser.permissions)]
      if (permissions.find((p) => p.guardName === 'EditUsers')) {
        return true
      }
    }
  }
  public async delete(loggedUser: User /* , user: User */) {
    if (loggedUser) {
      await loggedUser.load('permissions')
      const permissions = [...new Set(loggedUser.permissions)]
      if (permissions.find((p) => p.guardName === 'DeleteUsers')) {
        return true
      }
    }
  }
  public async deleteAdmin(/* loggedUser: User */) {
    return false
  }
}
