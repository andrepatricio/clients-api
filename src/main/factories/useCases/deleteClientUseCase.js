const DeleteClientUseCase = require('../../../data/usecases/deleteClientUseCase')
const makeClientRepository = require('../repositories/clientRepository')

const makeDeleteClientUseCase = () => {
  const repository = makeClientRepository()
  return new DeleteClientUseCase(repository)
}

module.exports = makeDeleteClientUseCase
