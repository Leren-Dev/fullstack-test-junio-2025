import User from 'App/Models/User'

export default class UserService {
  constructor(protected userId?: number) {}

  public async getUser() {
    // Obtener el User correspondiente en nuestra BD
    if (this.userId) {
      return User.findOrFail(this.userId)
    }

    const timestamp = new Date().toJSON()
    throw new Error(`[${timestamp}]: User not found. ID: ${this.userId}`)
  }
}
