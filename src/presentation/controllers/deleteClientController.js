class DeleteClientController {
  constructor (deleteClientUseCase) {
    this.deleteClientUseCase = deleteClientUseCase
  }

  handle (req) {
    const { id } = req.params
    const result = this.deleteClientUseCase.delete(id)

    return {
      status: 200,
      body: result
    }
  }
}

module.exports = DeleteClientController
