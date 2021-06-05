const DeleteClientController = require('../../../presentation/controllers/deleteClientController')
const makeDeleteClientUseCase = require('../useCases/deleteClientUseCase')

const makeDeleteClientController = () => {
  const deleteClientUseCase = makeDeleteClientUseCase()
  return new DeleteClientController(deleteClientUseCase)
}

module.exports = makeDeleteClientController
