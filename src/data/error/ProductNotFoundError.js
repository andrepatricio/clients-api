class ProductNotFoundError extends Error {
  constructor (_id) {
    super(`Product ${_id} doesnt exists`)
    this.name = 'ProductNotFoundError'
  }
}

module.exports = ProductNotFoundError
