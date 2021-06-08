const SignInUseCase = require('../../../data/usecases/auth/signInUseCase')
const ClientRepository = require('../../../infra/db/repository/clients')
const JWTHelper = require('../../../infra/security/jwtHelper')
const SignInController = require('../../../presentation/controllers/auth/signInController')
const { jwt } = require('../../environment')

const makeSignInController = () => {
  const jwtHelper = new JWTHelper(jwt.secret)
  const clientRepository = new ClientRepository()
  const signInUseCase = new SignInUseCase(clientRepository, jwtHelper)
  return new SignInController(signInUseCase)
}

module.exports = makeSignInController
