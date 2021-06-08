/* eslint-disable no-undef */
const AuthMiddleware = require('../../../src/presentation/middlewares/auth')

const makeJWTHelperFake = () => {
  class JWTHelperFake {
    verify (token) {
      return { id: 'valid id' }
    }
  }
  return new JWTHelperFake()
}

const makeAuthMiddleware = () => {
  const jwtHelper = makeJWTHelperFake()
  const authMiddleWare = new AuthMiddleware(jwtHelper)
  return {
    authMiddleWare,
    jwtHelper
  }
}

describe('Auth middelware tests', () => {
  test('Should return 403 if authorization header is not provided', async () => {
    const { authMiddleWare } = makeAuthMiddleware()
    const headers = {}
    const response = await authMiddleWare.handle(headers)

    expect(response.status).toBe(403)
    expect(response.body).toBe('You need a valid token')
  })

  test('Should return 403 if the token is not a Bearer token', async () => {
    const { authMiddleWare } = makeAuthMiddleware()
    const headers = {
      authorization: 'validToken'
    }
    const response = await authMiddleWare.handle(headers)

    expect(response.status).toBe(403)
    expect(response.body).toBe('Its necessary a bearer token')
  })

  test('Should calls verify with correct parameter', async () => {
    const { authMiddleWare, jwtHelper } = makeAuthMiddleware()
    const spy = jest.spyOn(jwtHelper, 'verify')
    const headers = {
      authorization: 'Bearer validToken'
    }
    await authMiddleWare.handle(headers)

    expect(spy).toHaveBeenCalledWith('validToken')
  })

  test('Should return 500 if verify throw some error', async () => {
    const { authMiddleWare, jwtHelper } = makeAuthMiddleware()
    const spy = jest.spyOn(jwtHelper, 'verify')
    spy.mockImplementationOnce(() => {
      throw new Error()
    })
    const headers = {
      authorization: 'Bearer validToken'
    }
    const response = await authMiddleWare.handle(headers)

    expect(response.status).toBe(500)
  })

  test('Should return 200 if all is correct', async () => {
    const { authMiddleWare } = makeAuthMiddleware()
    const headers = {
      authorization: 'Bearer validToken'
    }
    const response = await authMiddleWare.handle(headers)

    expect(response.status).toBe(200)
    expect(response.body.clientId).toBe('valid id')
  })
})
