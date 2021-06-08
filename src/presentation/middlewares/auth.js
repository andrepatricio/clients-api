const { forbidden, OK, serverInternal } = require('../helpers/http')

class AuthMiddleware {
  constructor (jwtHelper) {
    this.jwtHelper = jwtHelper
  }

  async handle (headers) {
    if (!headers || !headers.authorization) {
      return forbidden('You need a valid token')
    }
    const authorizationParts = headers.authorization.split(' ')
    if (authorizationParts[0] !== 'Bearer') {
      return forbidden('Its necessary a bearer token')
    }
    try {
      const { id } = await this.jwtHelper.verify(authorizationParts[1])
      return OK({ clientId: id })
    } catch (e) {
      return serverInternal(e.message)
    }
  }
}

module.exports = AuthMiddleware
