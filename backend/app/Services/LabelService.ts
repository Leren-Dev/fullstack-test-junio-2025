import Label from 'App/Models/Label'

export default class LabelService {
  constructor(protected storeId: number, protected labelId?: number) {}

  public async getLabel() {
    // Obtener el Label correspondiente en nuestra BD
    if (this.labelId) {
      return Label.findOrFail(this.labelId)
    }

    const timestamp = new Date().toJSON()
    throw new Error(`[${timestamp}]: Label not found. Received ID: ${this.labelId}`)
  }

  public async getLabelsById(request) {
    const page: number = request.page || 1
    const limit: number = request.limit || 10
    const search: string = request.search || ''
    const type: string = request.type || 'All'
    const status: string = request.status || 'All'
    const showAt: string = request.show_at || 'All'
    const library: string = request.library || 'Mis cucardas'

    const labelsIDsQuery = Label.query()
      .select('id')
      .where((q) => {
        q.where('isLeren', true)
        q.orWhere('storeId', this.storeId)
      })
      .orderBy('isLeren', 'desc')
      .orderBy('id', 'asc') // OJO aca nunca ordenar por un campo que no sea index (en lo posible)

    if (search) {
      labelsIDsQuery.andWhereILike('name', '%' + search + '%')
    }
    if (type !== 'All') {
      labelsIDsQuery.andWhere('type', type)
    }
    if (status !== 'All') {
      status === 'active'
        ? labelsIDsQuery.andWhere('enabled', true)
        : labelsIDsQuery.andWhere('enabled', false)
    }
    if (showAt !== 'All') {
      showAt === 'pdp'
        ? labelsIDsQuery.andWhere('showAtPdp', true)
        : labelsIDsQuery.andWhere('showAtGrids', true)
    }
    library === 'Mis cucardas'
      ? labelsIDsQuery.andWhere('isLeren', false)
      : labelsIDsQuery.andWhere('isLeren', true)

    const labelsIDs = await labelsIDsQuery.paginate(page, limit)

    if (
      labelsIDs.length === 0 &&
      labelsIDs.total > 0 &&
      labelsIDs.currentPage > labelsIDs.lastPage
    ) {
      const altLabelsIDs = await labelsIDsQuery.paginate(labelsIDs.lastPage, limit)

      const altLabels = await Label.query()
        .whereIn(
          'id',
          altLabelsIDs.map((c) => c.id)
        )
        .orderBy('id', 'asc')

      return {
        status: true,
        labels: {
          data: altLabels.map((l) => {
            return { ...l.serialize(), products_count: l.$extras.products_count }
          }),
          meta: altLabelsIDs.getMeta(),
        },
        details: altLabels.length
          ? 'Ok'
          : 'Ups, no encontramos cucardas que cumplan con esas condiciones...',
      }
    }

    const labels = await Label.query()
      .whereIn(
        'id',
        labelsIDs.map((c) => c.id)
      )
      .orderBy('id', 'asc')

    return {
      status: true,
      labels: {
        data: labels.map((l) => {
          return { ...l.serialize(), products_count: l.$extras.products_count }
        }),
        meta: labelsIDs.getMeta(),
      },
      details: labels.length
        ? 'Ok'
        : 'Ups, no encontramos cucardas que cumplan con esas condiciones...',
    }
  }

  public async createLabel(data) {
    const label = await Label.create({
      storeId: this.storeId,
      name: data.name,
      type: data.type,
      location: data.location,
      description: data.description,
      imageUrl: data.image_url,
      backgroundColor: data.background_color,
      textColor: data.text_color,
      showAtPdp: data.show_at === 'All' || data.show_at === 'pdp' ? true : false,
      showAtGrids: data.show_at === 'All' || data.show_at === 'grids' ? true : false,
    })

    return {
      status: true,
      label: label,
      details: label ? 'Ok' : 'Ups, ocurrió un error al intentar crear la nueva cucarda...',
    }
  }

  public async updateLabel(labelId: number, data) {
    const label = await Label.updateOrCreate(
      {
        id: labelId,
        storeId: this.storeId,
        isLeren: false,
      },
      {
        name: data.name,
        type: data.type,
        location: data.location,
        description: data.description,
        imageUrl: data.image_url,
        backgroundColor: data.background_color,
        textColor: data.text_color,
        showAtPdp: data.show_at === 'All' || data.show_at === 'pdp' ? true : false,
        showAtGrids: data.show_at === 'All' || data.show_at === 'grids' ? true : false,
      }
    )

    return {
      status: true,
      label: label,
      details: label ? 'Ok' : 'Ups, ocurrió un error al intentar actualizar la cucarda...',
    }
  }

  public async deleteLabel(labelId: number) {
    const label = await Label.query()
      .where('storeId', this.storeId)
      .andWhere('id', labelId)
      .andWhere('isLeren', false)
      .firstOrFail()
    await label.delete()

    return {
      status: true,
      label: label,
      details: label ? 'Ok' : 'Ups, ocurrió un error al intentar eliminar la cucarda...',
    }
  }

  public async setLabelStatus(labelId: number, status: boolean) {
    const label: Label[] = await Label.query()
      .where('storeId', this.storeId)
      .andWhere('id', labelId)
      .andWhere('isLeren', false)
      .update('enabled', status)

    return {
      status: true,
      label: label[0],
      details: label[0]
        ? 'Ok'
        : 'Ups, ocurrió un error al intentar ' +
          (status ? 'activar' : 'desactivar') +
          ' la cucarda...',
    }
  }
}
