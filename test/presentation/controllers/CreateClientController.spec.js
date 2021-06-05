/* eslint-disable no-undef */
const CreateClientController = require('../../../src/presentation/controllers/createClientController')
describe('Create client controller`s tests', () => {
  const makeUseCaseFake = () => {
    class CreateClientUseCaseFake {
      create (client) {}
    }
    return new CreateClientUseCaseFake()
  }
  const makeSut = () => {
    const useCaseFake = makeUseCaseFake()
    const controller = new CreateClientController(useCaseFake)
    return {
      useCaseFake,
      controller
    }
  }

  test('Should return status 400 if name is not provided', async () => {
    const { controller } = makeSut()
    const response = await controller.handle({
      body: {
        email: 'valid email'
      }
    })
    console.log(response)

    expect(response.status).toBe(400)
    expect(response.body).toEqual(new Error('Parameter "name" is required'))
  })

  test('Should return status 400 if email is not provided', async () => {
    const { controller } = makeSut()
    const response = await controller.handle({
      body: {
        name: 'valid name'
      }
    })

    expect(response.status).toBe(400)
    expect(response.body).toEqual(new Error('Parameter "email" is required'))
  })

  test('Should call create with correct parameters', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'create')
    await controller.handle({
      body: {
        name: 'valid name',
        email: 'valid email'
      }
    })

    expect(spy).toHaveBeenCalledWith({
      name: 'valid name',
      email: 'valid email'
    })
  })

  test('Should return 500 when create throws some error', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'create')
    spy.mockImplementationOnce(() => {
      throw new Error()
    })
    const result = await controller.handle({
      body: {
        name: 'valid name',
        email: 'valid email'
      }
    })

    expect(result.status).toBe(500)
    expect(result.body).toEqual(new Error())
  })
})
