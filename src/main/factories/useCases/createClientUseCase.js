const CreateClientUseCase = require('../../../data/usecases/createClientUseCase')
const makeClientRepository = require('../repositories/clientRepository')

const makeCreateClientUseCase = () => {
  const repository = makeClientRepository()
  return new CreateClientUseCase(repository)
}

module.exports = makeCreateClientUseCase
