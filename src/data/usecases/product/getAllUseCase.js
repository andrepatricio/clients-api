class GetAllProductsUseCase {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async getAll ({ page = 1, limit = 3 }) {
    const result = await this.productRepository.findAll({ page, limit })
    return result
  }
}

module.exports = GetAllProductsUseCase
