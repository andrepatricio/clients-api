class EmailAlreadyUsedError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'EmailAlreadyUsedError'
  }
}

module.exports = EmailAlreadyUsedError
