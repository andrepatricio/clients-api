class CreateProductUseCase {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async create (product) {
    const result = await this.productRepository.insert(product)
    return result.ops[0]
  }
}

module.exports = CreateProductUseCase
