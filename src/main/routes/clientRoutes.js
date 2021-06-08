const { Router } = require('express')
const adaptRoute = require('../adapters/expressRouterAdapter')
const makeAddFavoriteController = require('../factories/controllers/addFavoriteFactory')
const makeCreateClientController = require('../factories/controllers/createClientFactory')
const makeGetClientByIdController = require('../factories/controllers/getClientByIdFactory')
const makeDeleteClientController = require('../factories/controllers/deleteClientFactory')
const adaptMiddleware = require('../adapters/expressMiddlewareAdapter')
const makeAuthMiddleware = require('../factories/middlewares/auth')

const router = Router()

router.get('/:_id', adaptRoute(makeGetClientByIdController()))
router.post('/', adaptRoute(makeCreateClientController()))
router.post('/:clientId/favorite/:productId', adaptMiddleware(makeAuthMiddleware()), adaptRoute(makeAddFavoriteController()))
router.delete('/:id', adaptRoute(makeDeleteClientController()))

module.exports = router
