const { badRequest, OK, unauthorized, serverInternal } = require('../../helpers/http')

class SignInController {
  constructor (signInUseCase) {
    this.signInUseCase = signInUseCase
  }

  async handle ({ body }) {
    if (!body || !body.email) {
      return badRequest('Email is required to sign in')
    }
    const { email } = body
    try {
      const accessToken = await this.signInUseCase.signIn(email)
      return OK({ accessToken })
    } catch (e) {
      if (e.name === 'EmailNotFoundError') { return unauthorized() }
      return serverInternal(e)
    }
  }
}

module.exports = SignInController
