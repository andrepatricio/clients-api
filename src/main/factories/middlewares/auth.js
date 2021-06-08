const JWTHelper = require('../../../infra/security/jwtHelper')
const AuthMiddleware = require('../../../presentation/middlewares/auth')
const { jwt } = require('../../environment')

const makeAuthMiddleware = () => {
  const jwtHelper = new JWTHelper(jwt.secret)
  return new AuthMiddleware(jwtHelper)
}

module.exports = makeAuthMiddleware
