/* eslint-disable no-undef */

const SignInUseCase = require('../../../src/data/usecases/auth/signInUseCase')

const makeRepositoryFake = () => {
  class ClientRpositoryFake {
    findOne (query) {
      return { name: 'Valid name', email: 'valid email' }
    }
  }
  return new ClientRpositoryFake()
}

const makeJWTHelperFake = () => {
  class JWTHelperFake {
    encrypt (payload) {
      return 'valid token'
    }
  }
  return new JWTHelperFake()
}

const makeController = () => {
  const repositoryFake = makeRepositoryFake()
  const jwtHelperFake = makeJWTHelperFake()
  const useCase = new SignInUseCase(repositoryFake, jwtHelperFake)
  return {
    repositoryFake,
    useCase
  }
}

describe('SignIn use case tests', () => {
  test('Should calls findOne with correct parameters', async () => {
    const { useCase, repositoryFake } = makeController()
    const email = 'andre@gmail.com'
    const spy = jest.spyOn(repositoryFake, 'findOne')
    await useCase.signIn(email)

    expect(spy).toHaveBeenCalledWith({ email })
  })

  test('Should throws EmailNotFoundError if findOne not return some value', async () => {
    const { useCase, repositoryFake } = makeController()
    const email = 'andre@gmail.com'
    const spy = jest.spyOn(repositoryFake, 'findOne')
    spy.mockImplementationOnce(() => {
      return undefined
    })

    expect(useCase.signIn(email)).rejects.toThrow('This email andre@gmail.com doesnt exists')
  })

  test('Should return a valid token if all is correct', async () => {
    const { useCase } = makeController()
    const email = 'andre@gmail.com'
    const result = await useCase.signIn(email)
    expect(result).toBe('valid token')
  })
})
