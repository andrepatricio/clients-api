const CreateProductUseCase = require('../../../data/usecases/product/createProductUseCase')
const ProductRepository = require('../../../infra/db/repository/product')
const CreateProductController = require('../../../presentation/controllers/products/createProductController')

const makeCreateProductController = () => {
  const repository = new ProductRepository()
  const useCase = new CreateProductUseCase(repository)
  return new CreateProductController(useCase)
}

module.exports = makeCreateProductController
