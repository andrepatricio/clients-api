const InvalidObjectIdError = require('../../../infra/db/error/InvalidObjectIdError')
const { OK, badRequest, notFound } = require('../../helpers/http')

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
      if (e instanceof InvalidObjectIdError) {
        return badRequest(e.message)
      }
    }
  }
}

module.exports = GetByIdProductsController
