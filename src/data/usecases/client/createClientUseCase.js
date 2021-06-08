const EmailAlreadyUsedError = require('../../error/EmailAlreadyUsedError')

class CreateClientUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async create ({ name, email }) {
    const client = await this.repository.findOne({ email })
    if (client) {
      throw new EmailAlreadyUsedError(email)
    }
    const result = await this.repository.insert({ name, email })
    return result
  }
}

module.exports = CreateClientUseCase
