
const { Router } = require('express')
const adaptRoute = require('../adapters/expressRouterAdapter')
const makeSignInController = require('../factories/controllers/signInFactory')

const router = Router()

router.post('/signin', adaptRoute(makeSignInController()))

module.exports = router
