class GetByIdUseCase {
  constructor (productRepository) {
    this.productRepository = productRepository
  }

  async get (_id) {
    const result = await this.productRepository.findById(_id)
    return result
  }
}

module.exports = GetByIdUseCase
