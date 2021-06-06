class GetAllProductsUseCase {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async getAll ({ page = 1, limit = 10 }) {
    return await this.productRepository.findAll({ page, limit })
  }
}

module.exports = GetAllProductsUseCase
