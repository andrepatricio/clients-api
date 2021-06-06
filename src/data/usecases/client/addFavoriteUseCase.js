const ProductAlreadyFavorite = require('../../error/ProductAlreadyFavoriteError')
const ProductNotFoundError = require('../../error/ProductNotFoundError')

class AddFavoriteUseCase {
  constructor (clientRepository, productRepository) {
    this.clientRepository = clientRepository
    this.productRepository = productRepository
  }

  async add (clientId, productId) {
    const product = await this.productRepository.findById(productId)
    if (!product) {
      throw new ProductNotFoundError(productId)
    }
    const client = await this.clientRepository.findOne({ _id: clientId })
    if (client.favorites.indexOf(productId) >= 0) {
      throw new ProductAlreadyFavorite(productId)
    }
    client.favorites.push(product._id)
    return await this.clientRepository.save(client)
  }
}

module.exports = AddFavoriteUseCase
