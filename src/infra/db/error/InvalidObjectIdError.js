class InvalidObjectIdError extends Error {
  constructor () {
    super('Its not possible use the provided id to find the document')
    this.name = 'InvalidObjectIdError'
  }
}

module.exports = InvalidObjectIdError
