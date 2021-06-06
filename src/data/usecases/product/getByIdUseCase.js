class GetByIdUseCase {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async get (_id) {
    return await this.productRepository.findById(_id)
  }
}

module.exports = GetByIdUseCase
