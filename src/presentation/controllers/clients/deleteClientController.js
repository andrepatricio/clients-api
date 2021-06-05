const { OK, badRequest, serverInternal } = require('../../helpers/http')

class DeleteClientController {
  constructor (deleteClientUseCase) {
    this.deleteClientUseCase = deleteClientUseCase
  }

  handle (req) {
    const { id } = req.params
    if (!id) {
      return badRequest(new Error('Parameter "id" is required'))
    }
    try {
      const result = this.deleteClientUseCase.delete(id)

      return OK(result)
    } catch (e) {
      return serverInternal(e)
    }
  }
}

module.exports = DeleteClientController
