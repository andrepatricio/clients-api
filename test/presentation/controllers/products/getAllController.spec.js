/* eslint-disable no-undef */

const GetAllProductsController = require('../../../../src/presentation/controllers/products/getAllController')

describe('Get product by id controllers tests', () => {
  const makeUseCaseFake = () => {
    class GetAllUseCaseFake {
      getAll () {
        return [{
          brand: 'valid brand',
          image: 'valid image',
          title: 'valid title',
          price: 2,
          reviewScore: 5
        }]
      }
    }
    return new GetAllUseCaseFake()
  }
  const makeSut = () => {
    const useCaseFake = makeUseCaseFake()
    const controller = new GetAllProductsController(useCaseFake)
    return {
      useCaseFake,
      controller
    }
  }

  test('Should return status 404 if page is invalid', async () => {
    const { controller } = makeSut()
    const request = {
      query: {
        page: -1
      }
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(400)
    expect(response.body).toBe('Invalid Paramenters')
  })

  test('Should return status 404 if limit is invalid', async () => {
    const { controller } = makeSut()
    const request = {
      query: {
        page: 1,
        limit: 0
      }
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(400)
    expect(response.body).toBe('Invalid Paramenters')
  })

  test('Should return status 200 if all is correct', async () => {
    const { controller } = makeSut()
    const request = {
      query: {
        page: 1,
        limit: 1
      }
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(200)
    expect(response.body).toEqual([{
      brand: 'valid brand',
      image: 'valid image',
      title: 'valid title',
      price: 2,
      reviewScore: 5
    }])
  })
})
