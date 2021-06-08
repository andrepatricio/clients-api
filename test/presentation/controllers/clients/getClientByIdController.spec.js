/* eslint-disable no-undef */

const InvalidObjectIdError = require('../../../../src/infra/db/error/InvalidObjectIdError')
const GetClientByIdController = require('../../../../src/presentation/controllers/clients/getClientByIdController')

describe('Get client by idcontroller`s tests', () => {
  const makeUseCaseFake = () => {
    class GetClientByIdUseCaseFake {
      get (id) {
        return {
          name: 'valid name',
          email: 'valid email'
        }
      }
    }
    return new GetClientByIdUseCaseFake()
  }
  const makeSut = () => {
    const useCaseFake = makeUseCaseFake()
    const controller = new GetClientByIdController(useCaseFake)
    return {
      useCaseFake,
      controller
    }
  }

  test('Should return status 404 if not found client id', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'get')
    spy.mockImplementationOnce(() => {
      return undefined
    })
    const response = await controller.handle({
      params: {
        _id: 'valid id'
      }
    })

    expect(response.status).toBe(404)
    expect(response.body).toBe('client valid id not found')
  })

  test('Should return status 400 if provided id is invalid', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'get')
    spy.mockImplementationOnce(() => {
      throw new InvalidObjectIdError()
    })
    const response = await controller.handle({
      params: {
        _id: 'invalid id'
      }
    })

    expect(response.status).toBe(400)
    expect(response.body).toBe('Its not possible use the provided id to find the document')
  })

  test('Should return status 500 if get throws some generic error', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'get')
    spy.mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await controller.handle({
      params: {
        _id: 'valid id'
      }
    })

    expect(response.status).toBe(500)
  })

  test('Should return status 200 if all is correct', async () => {
    const { controller } = makeSut()
    const response = await controller.handle({
      params: {
        _id: 'valid id'
      }
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      name: 'valid name',
      email: 'valid email'
    })
  })
})
