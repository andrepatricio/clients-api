class CreateClientController {
  handle (req) {
    const requiredFields = ['name', 'email']
    const { body } = req

    for (const field of requiredFields) {
      if (!body[field]) {
        return {
          status: 400,
          msg: `Parameter "${field}" is required`
        }
      }
    }
  }
}

module.exports = CreateClientController
