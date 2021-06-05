class CreateClientUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async create (client) {
    try {
      const result = await this.repository.save(client)
      return result.ops[0]
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = CreateClientUseCase
