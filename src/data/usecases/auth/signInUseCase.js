const EmailNotFoundError = require('../../error/EmailNotFoundError')

class SignInUseCase {
  constructor (clientRepository, jwtHelper) {
    this.clientRepository = clientRepository
    this.jwtHelper = jwtHelper
  }

  async signIn (email) {
    const client = await this.clientRepository.findOne({ email })
    if (!client) {
      throw new EmailNotFoundError(email)
    }
    return await this.jwtHelper.encrypt({ id: client._id })
  }
}

module.exports = SignInUseCase
