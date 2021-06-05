class DeleteClientUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async delete (id) {
    try {
      const result = await this.repository.delete(id)
      return result
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = DeleteClientUseCase
