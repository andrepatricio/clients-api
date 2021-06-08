/* eslint-disable no-undef */

const EmailNotFoundError = require('../../../../src/data/error/EmailNotFoundError')
const SignInController = require('../../../../src/presentation/controllers/auth/signInController')

const makeUseCaseFake = () => {
  class SignUseCaseFake {
    signIn (email) {
      return 'valid token'
    }
  }
  return new SignUseCaseFake()
}

const makeController = () => {
  const useCaseFake = makeUseCaseFake()
  const controller = new SignInController(useCaseFake)
  return {
    useCaseFake,
    controller
  }
}

describe('SignIn controllers tests', () => {
  test('Should return 400 if email is not provided', async () => {
    const { controller } = makeController()
    const request = {
      body: {}
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(400)
    expect(response.body).toBe('Email is required to sign in')
  })

  test('Should return 401 signIn EmailNotFoundError', async () => {
    const { controller, useCaseFake } = makeController()
    const spy = jest.spyOn(useCaseFake, 'signIn')
    spy.mockImplementationOnce(() => {
      throw new EmailNotFoundError()
    })
    const request = {
      body: {
        email: 'valid email'
      }
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(401)
  })

  test('Should return 500 signIn throw some generic error', async () => {
    const { controller, useCaseFake } = makeController()
    const spy = jest.spyOn(useCaseFake, 'signIn')
    spy.mockImplementationOnce(() => {
      throw new Error()
    })
    const request = {
      body: {
        email: 'valid email'
      }
    }
    const response = await controller.handle(request)

    expect(response.status).toBe(500)
  })
})
