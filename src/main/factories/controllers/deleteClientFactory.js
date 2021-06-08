const DeleteClientUseCase = require('../../../data/usecases/client/deleteClientUseCase')
const ClientRepository = require('../../../infra/db/repository/clients')
const DeleteClientController = require('../../../presentation/controllers/clients/deleteClientController')

const makeDeleteClientController = () => {
  const repository = new ClientRepository()
  const useCase = new DeleteClientUseCase(repository)
  return new DeleteClientController(useCase)
}

module.exports = makeDeleteClientController
