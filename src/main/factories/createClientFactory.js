const CreateClientUseCase = require('../../data/usecases/client/createClientUseCase')
const ClientRepository = require('../../infra/db/repository/clients')
const CreateClientController = require('../../presentation/controllers/clients/createClientController')

const makeCreateClientController = () => {
  const repository = new ClientRepository()
  const useCase = new CreateClientUseCase(repository)
  return new CreateClientController(useCase)
}

module.exports = makeCreateClientController
