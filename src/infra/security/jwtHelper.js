const jwt = require('jsonwebtoken')

class JWTHelper {
  constructor (secret) {
    this.secret = secret
  }

  async encrypt (payload) {
    return await jwt.sign(payload, this.secret)
  }

  async verify (token) {
    return await jwt.verify(token, this.secret)
  }
}

module.exports = JWTHelper
