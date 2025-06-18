import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hashids from '@ioc:Adonis/Addons/Hashids'
import LabelService from 'App/Services/LabelService'

export default class LabelsController {
  public async index({ auth, request, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      const requestData = request.all()

      const labelService = new LabelService(auth.user.currentStoreId)
      const labelServiceResponse = await labelService.getLabelsById(requestData)

      return response.ok(labelServiceResponse)
    }

    return response.ok({
      status: false,
    })
  }

  public async store({ auth, request, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      const requestData = request.all()

      const labelService = new LabelService(auth.user.currentStoreId)
      const labelServiceResponse = await labelService.createLabel(requestData)

      return response.ok(labelServiceResponse)
    }

    return response.ok({
      status: false,
    })
  }

  public async show({ auth, params, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      console.log('show TODO:', params)
    }

    return response.ok({
      status: false,
    })
  }

  public async update({ auth, params, request, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      const labelId = Hashids.decode(params.id)[0] as number
      const requestData = request.all()

      const labelService = new LabelService(auth.user.currentStoreId)
      const labelServiceResponse = await labelService.updateLabel(labelId, requestData)

      return response.ok(labelServiceResponse)
    }

    return response.ok({
      status: false,
    })
  }

  public async destroy({ auth, params, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      const labelId = Hashids.decode(params.id)[0] as number

      const labelService = new LabelService(auth.user.currentStoreId)
      const labelServiceResponse = await labelService.deleteLabel(labelId)

      return response.ok(labelServiceResponse)
    }

    return response.ok({
      status: false,
    })
  }

  public async setLabelStatus({ auth, params, request, response }: HttpContextContract) {
    if (auth.user && auth.user.currentStoreId) {
      const labelId = Hashids.decode(params.id)[0] as number
      const labelStatus = request.input('enabled')

      const labelService = new LabelService(auth.user.currentStoreId)
      const labelServiceResponse = await labelService.setLabelStatus(labelId, labelStatus)

      return response.ok(labelServiceResponse)
    }

    return response.ok({
      status: false,
    })
  }
}
