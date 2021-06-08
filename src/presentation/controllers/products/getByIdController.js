const { OK, badRequest, notFound, serverInternal } = require('../../helpers/http')

class GetByIdProductsController {
  constructor (getByIdUseCase) {
    this.getByIdUseCase = getByIdUseCase
  }

  async handle (req) {
    const { _id } = req.params
    try {
      const result = await this.getByIdUseCase.get(_id)
      if (!result) {
        return notFound('product', _id)
      }
      return OK(result)
    } catch (e) {
      if (e.name === 'InvalidObjectIdError') {
        return badRequest(e.message)
      }
      return serverInternal(e)
    }
  }
}

module.exports = GetByIdProductsController
