class CreateProductUseCase {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async create (product) {
    return await this.productRepository.insert(product)
  }
}

module.exports = CreateProductUseCase
