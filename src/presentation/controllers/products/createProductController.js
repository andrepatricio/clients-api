const { badRequest, OK, serverInternal } = require('../../helpers/http')

class CreateProductController {
  constructor (createProductUseCase) {
    this.createProductUseCase = createProductUseCase
  }

  async handle (req) {
    const { body } = req
    const requiredFields = ['price', 'brand', 'image', 'title']
    for (const field of requiredFields) {
      if (!body[field]) {
        return badRequest(new Error(`Parameter "${field}" is required`))
      }
    }

    const { price, title, brand, image } = body
    if (typeof price !== 'number' || price <= 0) {
      return badRequest(new Error('Invalid parameter: price'))
    }
    try {
      const result = await this.createProductUseCase.create({ price, title, brand, image })

      return OK(result)
    } catch (e) {
      return serverInternal(e)
    }
  }
}

module.exports = CreateProductController
