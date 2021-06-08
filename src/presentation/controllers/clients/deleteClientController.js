const { OK, badRequest, serverInternal } = require('../../helpers/http')

class DeleteClientController {
  constructor (deleteClientUseCase) {
    this.deleteClientUseCase = deleteClientUseCase
  }

  handle (req) {
    const { id } = req.params
    try {
      const result = this.deleteClientUseCase.delete(id)

      return OK(result)
    } catch (e) {
      if (e.name === 'InvalidObjectIdError') {
        return badRequest(e.message)
      }
      return serverInternal(e)
    }
  }
}

module.exports = DeleteClientController
