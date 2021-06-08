/* eslint-disable no-undef */

const InvalidObjectIdError = require('../../../../src/infra/db/error/InvalidObjectIdError')
const DeleteClientController = require('../../../../src/presentation/controllers/clients/deleteClientController')

describe('Get client by idcontroller`s tests', () => {
  const makeUseCaseFake = () => {
    class DeleteClientByIdUseCaseFake {
      delete (id) {
        return {}
      }
    }
    return new DeleteClientByIdUseCaseFake()
  }
  const makeSut = () => {
    const useCaseFake = makeUseCaseFake()
    const controller = new DeleteClientController(useCaseFake)
    return {
      useCaseFake,
      controller
    }
  }

  test('Should return status 404 if not found client id', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'delete')
    spy.mockImplementationOnce(() => {
      throw new InvalidObjectIdError()
    })
    const response = await controller.handle({
      params: {
        id: 'valid id'
      }
    })

    expect(response.status).toBe(400)
    expect(response.body).toBe('Its not possible use the provided id to find the document')
  })

  test('Should return status 500 if delete throw some generic error', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'delete')
    spy.mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await controller.handle({
      params: {
        id: 'valid id'
      }
    })

    expect(response.status).toBe(500)
  })

  test('Should return status 200 if all is correct', async () => {
    const { controller } = makeSut()
    const response = await controller.handle({
      params: {
        id: 'valid id'
      }
    })

    expect(response.status).toBe(200)
  })
})
