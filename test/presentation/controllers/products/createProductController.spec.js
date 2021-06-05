/* eslint-disable no-undef */
const CreateProductController = require('../../../../src/presentation/controllers/products/createProductController')

const makeController = () => {
  class CreateProductFake {
    create (product) {}
  }
  const createProductFake = new CreateProductFake()
  const controller = new CreateProductController(createProductFake)
  return {
    controller,
    createProductFake
  }
}

describe('Create product controller tests', () => {
  test('Should returns 400 if price is not provided', async () => {
    const { controller } = makeController()
    const response = await controller.handle({
      body: {
        image: 'valid image',
        brand: 'valid brand',
        title: 'valid name'
      }
    })
    expect(response.status).toBe(400)
    expect(response.body).toEqual(new Error('Parameter "price" is required'))
  })

  test('Should returns 400 if image is not provided', async () => {
    const { controller } = makeController()
    const response = await controller.handle({
      body: {
        price: 'valid price',
        brand: 'valid brand',
        title: 'valid name'
      }
    })
    expect(response.status).toBe(400)
    expect(response.body).toEqual(new Error('Parameter "image" is required'))
  })

  test('Should returns 400 if brand is not provided', async () => {
    const { controller } = makeController()
    const response = await controller.handle({
      body: {
        price: 'valid price',
        image: 'valid image',
        title: 'valid name'
      }
    })
    expect(response.status).toBe(400)
    expect(response.body).toEqual(new Error('Parameter "brand" is required'))
  })

  test('Should returns 400 if title is not provided', async () => {
    const { controller } = makeController()
    const response = await controller.handle({
      body: {
        price: 'valid price',
        image: 'valid image',
        brand: 'valid brand'
      }
    })
    expect(response.status).toBe(400)
    expect(response.body).toEqual(new Error('Parameter "title" is required'))
  })

  test('Should returns 400 if an invalid price is provided', async () => {
    const { controller } = makeController()
    const response = await controller.handle({
      body: {
        price: 'invalid price',
        image: 'valid image',
        brand: 'valid brand',
        title: 'valid name'
      }
    })
    expect(response.status).toBe(400)
    expect(response.body).toEqual(new Error('Invalid parameter: price'))
  })

  test('Should call addProduct with correct values', async () => {
    const { controller, createProductFake } = makeController()
    const addSpy = jest.spyOn(createProductFake, 'create')
    await controller.handle({
      body: {
        price: 3,
        image: 'valid image',
        brand: 'valid brand',
        title: 'valid name'
      }
    })
    expect(addSpy).toHaveBeenCalledWith({
      price: 3,
      image: 'valid image',
      brand: 'valid brand',
      title: 'valid name'
    })
  })

  test('Should returns 500 if AddProduct throws an Error', async () => {
    const { controller, createProductFake } = makeController()
    const spy = jest.spyOn(createProductFake, 'create')
    spy.mockImplementationOnce(() => {
      throw new Error()
    })
    const response = await controller.handle({
      body: {
        price: 3,
        image: 'valid image',
        brand: 'valid brand',
        title: 'valid name'
      }
    })
    expect(response.status).toBe(500)
    expect(response.body).toEqual(new Error())
  })

  test('Should returns 200 if valid data is provided', async () => {
    const { controller } = makeController()
    const response = await controller.handle({
      body: {
        price: 3,
        image: 'valid image',
        brand: 'valid brand',
        title: 'valid name'
      }
    })
    expect(response.status).toBe(200)
  })
})
