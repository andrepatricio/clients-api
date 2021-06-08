const { OK, badRequest, serverInternal, unauthorized, notFound } = require('../../helpers/http')

class AddFavoriteController {
  constructor (addFavoriteUseCase) {
    this.addFavoriteUseCase = addFavoriteUseCase
  }

  async handle (req) {
    const { clientId, productId } = req.params
    const { user } = req
    if (user !== clientId) {
      return unauthorized()
    }
    try {
      const result = await this.addFavoriteUseCase.add(clientId, productId)
      return OK(result)
    } catch (e) {
      if (e.name === 'ProductAlreadyFavoriteError') {
        return badRequest(e.message)
      }
      if (e.name === 'ProductNotFoundError') {
        return notFound('product', productId)
      }
      return serverInternal(e)
    }
  }
}

module.exports = AddFavoriteController
