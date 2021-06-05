const EmailAlreadyUsedError = require('../error/EmailAlreadyUsedError')

class CreateClientUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async create ({ name, email }) {
    const client = await this.repository.findByEmail(email)
    if (client) {
      throw new EmailAlreadyUsedError(`This email, ${email}, already used`)
    }
    const result = await this.repository.save({ name, email })
    return result.ops[0]
  }
}

module.exports = CreateClientUseCase
