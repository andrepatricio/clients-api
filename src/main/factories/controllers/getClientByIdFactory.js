const GetClientByIdUseCase = require('../../../data/usecases/client/getClientByIdUseCase')
const ClientRepository = require('../../../infra/db/repository/clients')
const GetClientByIdController = require('../../../presentation/controllers/clients/getClientByIdController')

const makeGetClientByIdController = () => {
  const repository = new ClientRepository()
  const useCase = new GetClientByIdUseCase(repository)
  return new GetClientByIdController(useCase)
}

module.exports = makeGetClientByIdController
