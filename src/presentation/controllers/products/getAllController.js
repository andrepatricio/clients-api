const { OK, badRequest } = require('../../helpers/http')

class GetAllProductsController {
  constructor (getAllUseCase) {
    this.getAllUseCase = getAllUseCase
  }

  async handle (req) {
    const { page, limit } = req.query
    if (limit < 1 || page < 1) {
      return badRequest('Invalid Paramenters')
    }
    const result = await this.getAllUseCase.getAll({ page, limit })
    return OK(result)
  }
}

module.exports = GetAllProductsController
