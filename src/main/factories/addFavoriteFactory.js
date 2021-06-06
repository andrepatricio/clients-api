const AddFavoriteUseCase = require('../../data/usecases/client/addFavoriteUseCase')
const ClientRepository = require('../../infra/db/repository/clients')
const ProductRepository = require('../../infra/db/repository/product')
const AddFavoriteController = require('../../presentation/controllers/clients/addFavoriteController')

const makeAddFavoriteController = () => {
  const clientRepository = new ClientRepository()
  const productRepository = new ProductRepository()
  const addFavoriteUseCase = new AddFavoriteUseCase(clientRepository, productRepository)
  return new AddFavoriteController(addFavoriteUseCase)
}

module.exports = makeAddFavoriteController
