const GetAllProductsUseCase = require('../../data/usecases/product/getAllUseCase')
const ProductRepository = require('../../infra/db/repository/product')
const GetAllProductsController = require('../../presentation/controllers/products/getAllController')

const makeGetAllProductsController = () => {
  const repository = new ProductRepository()
  const useCase = new GetAllProductsUseCase(repository)
  return new GetAllProductsController(useCase)
}

module.exports = makeGetAllProductsController
