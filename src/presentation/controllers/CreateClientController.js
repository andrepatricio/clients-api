const { badRequest, OK, serverInternal } = require('../helpers/http')

class CreateClientController {
  constructor (createClientUseCase) {
    this.createClientUseCase = createClientUseCase
  }

  async handle (req) {
    console.log(req)
    const requiredFields = ['name', 'email']
    const { body } = req

    for (const field of requiredFields) {
      if (!body[field]) {
        return badRequest(new Error(`Parameter "${field}" is required`))
      }
    }
    const { name, email } = body

    try {
      const result = await this.createClientUseCase.create({ name, email })
      return OK(result)
    } catch (e) {
      return serverInternal(e)
    }
  }
}

module.exports = CreateClientController
