class ProductAlreadyFavoriteError extends Error {
  constructor (_id) {
    super(`The product ${_id} has already added as favorite`)
    this.name = 'ProductAlreadyFavorite'
  }
}
module.exports = ProductAlreadyFavoriteError
