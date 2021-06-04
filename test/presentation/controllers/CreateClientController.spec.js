/* eslint-disable no-undef */
const CreateClientController = require('../../../src/presentation/controllers/CreateClientController')
describe('Create client controller`s tests', () => {
  test('Should return status 400 if name is not provided', () => {
    const controller = new CreateClientController()
    const response = controller.handle({
      body: {
        email: 'valid email'
      }
    })

    expect(response.status).toBe(400)
    expect(response.msg).toBe('Parameter "name" is required')
  })

  test('Should return status 400 if email is not provided', () => {
    const controller = new CreateClientController()
    const response = controller.handle({
      body: {
        name: 'valid name'
      }
    })

    expect(response.status).toBe(400)
    expect(response.msg).toBe('Parameter "email" is required')
  })
})
