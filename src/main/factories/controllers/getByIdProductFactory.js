const GetByIdUseCase = require('../../../data/usecases/product/getByIdUseCase')
const ProductRepository = require('../../../infra/db/repository/product')
const GetByIdProductsController = require('../../../presentation/controllers/products/getByIdController')

const makeGetByIdProductController = () => {
  const repository = new ProductRepository()
  const useCase = new GetByIdUseCase(repository)
  return new GetByIdProductsController(useCase)
}
module.exports = makeGetByIdProductController
