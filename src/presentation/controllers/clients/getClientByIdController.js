const InvalidObjectIdError = require('../../../infra/db/error/InvalidObjectIdError')
const { notFound, OK, badRequest, serverInternal } = require('../../helpers/http')

class GetClientByIdController {
  constructor (getClientByIdUseCase) {
    this.getClientByIdUseCase = getClientByIdUseCase
  }

  async handle (req) {
    const { _id } = req.params
    try {
      const result = await this.getClientByIdUseCase.get(_id)
      if (!result) {
        return notFound('client', _id)
      }
      return OK(result)
    } catch (e) {
      if (e instanceof InvalidObjectIdError) {
        return badRequest(e.message)
      }
      console.error(e)
      serverInternal(e)
    }
  }
}

module.exports = GetClientByIdController
