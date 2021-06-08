class EmailNotFoundError extends Error {
  constructor (email) {
    super(`This email ${email} doesnt exists`)
    this.name = 'EmailNotFoundError'
  }
}

module.exports = EmailNotFoundError
