const CreateClientController = require('../../../presentation/controllers/createClientController')
const makeCreateClientUseCase = require('../useCases/createClientUseCase')

const makeCreateClientController = () => {
  const useCase = makeCreateClientUseCase()
  return new CreateClientController(useCase)
}
module.exports = makeCreateClientController
