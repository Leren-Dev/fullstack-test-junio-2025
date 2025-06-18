import Store from 'App/Models/Store'

export default class StoreService {
  constructor(protected tnStoreId?: number, protected storeId?: number) {}

  public async getStore() {
    // Obtener el store correspondiente en nuestra BD
    if (this.storeId) {
      return Store.findOrFail(this.storeId)
    }
    if (this.tnStoreId) {
      return Store.findByOrFail('tnId', this.tnStoreId)
    }

    const timestamp = new Date().toJSON()
    throw new Error(
      `[${timestamp}]: Tiendanube Store not found. Received tnID: ${this.tnStoreId}, ID: ${this.storeId}`
    )
  }
}
