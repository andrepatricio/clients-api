const ProductAlreadyFavoriteError = require('../../../../src/data/error/ProductAlreadyFavoriteError')
const ProductNotFoundError = require('../../../../src/data/error/ProductNotFoundError')
const AddFavoriteController = require('../../../../src/presentation/controllers/clients/addFavoriteController')

/* eslint-disable no-undef */
describe('Create client controller`s tests', () => {
  const makeUseCaseFake = () => {
    class AddFavoriteUseCaseFake {
      add (clientId, productId) {
        return {
          name: 'valid name',
          email: 'valid email',
          favorites: [`${productId}`]
        }
      }
    }
    return new AddFavoriteUseCaseFake()
  }
  const makeSut = () => {
    const useCaseFake = makeUseCaseFake()
    const controller = new AddFavoriteController(useCaseFake)
    return {
      useCaseFake,
      controller
    }
  }

  test('Should return status 401 if user is not equal to clientId', async () => {
    const { controller } = makeSut()
    const request = {
      params: {
        clientId: 'valid clientId',
        productId: 'valid productId'
      },
      user: 'invalid user'
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(401)
  })

  test('Should call add with correct parameters', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'add')
    const request = {
      params: {
        clientId: 'valid clientId',
        productId: 'valid productId'
      },
      user: 'valid clientId'
    }
    await controller.handle(request)

    expect(spy).toHaveBeenCalledWith('valid clientId', 'valid productId')
  })

  test('Should return 400 if product has already add as favorite', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'add')
    spy.mockImplementationOnce(() => {
      throw new ProductAlreadyFavoriteError('valid productId')
    })
    const request = {
      params: {
        clientId: 'valid clientId',
        productId: 'valid productId'
      },
      user: 'valid clientId'
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(400)
    expect(response.body).toBe('The product valid productId has already added as favorite')
  })

  test('Should return 404 if product doenst exists', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'add')
    spy.mockImplementationOnce(() => {
      throw new ProductNotFoundError()
    })
    const request = {
      params: {
        clientId: 'valid clientId',
        productId: 'invalid productId'
      },
      user: 'valid clientId'
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(404)
    expect(response.body).toBe('product invalid productId not found')
  })

  test('Should return 500 if add throws some generic error', async () => {
    const { controller, useCaseFake } = makeSut()
    const spy = jest.spyOn(useCaseFake, 'add')
    spy.mockImplementationOnce(() => {
      throw new Error()
    })
    const request = {
      params: {
        clientId: 'valid clientId',
        productId: 'valid productId'
      },
      user: 'valid clientId'
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(500)
  })

  test('Should return 200 if all is correct', async () => {
    const { controller } = makeSut()
    const request = {
      params: {
        clientId: 'valid clientId',
        productId: 'valid productId'
      },
      user: 'valid clientId'
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      name: 'valid name',
      email: 'valid email',
      favorites: ['valid productId']
    })
  })
})
