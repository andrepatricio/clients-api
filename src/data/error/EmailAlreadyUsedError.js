class EmailAlreadyUsedError extends Error {
  constructor (email) {
    super(`This email ${email} is already used`)
    this.name = 'EmailAlreadyUsedError'
  }
}

module.exports = EmailAlreadyUsedError
