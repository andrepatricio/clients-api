class GetClientByIdUseCase {
  constructor (clientRepository) {
    this.clientRepository = clientRepository
  }

  async get (_id) {
    return await this.clientRepository.findById(_id)
  }
}

module.exports = GetClientByIdUseCase
