
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
      if (e.name === 'InvalidObjectIdError') {
        return badRequest(e.message)
      }
      return serverInternal(e)
    }
  }
}

module.exports = GetClientByIdController
