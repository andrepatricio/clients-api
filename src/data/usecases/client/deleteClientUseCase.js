class DeleteClientUseCase {
  constructor (repository) {
    this.repository = repository
  }

  async delete (id) {
    return await this.repository.delete(id)
  }
}

module.exports = DeleteClientUseCase
