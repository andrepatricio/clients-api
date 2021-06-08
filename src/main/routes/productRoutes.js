
const { Router } = require('express')
const adaptRoute = require('../adapters/expressRouterAdapter')

const makeCreateProductController = require('../factories/controllers/createProductFactory')
const makeGetAllProductsController = require('../factories/controllers/getAllProductsFactory')
const makeGetByIdProductController = require('../factories/controllers/getByIdProductFactory')

const router = Router()

router.get('/', adaptRoute(makeGetAllProductsController()))
router.get('/:_id', adaptRoute(makeGetByIdProductController()))
router.post('/', adaptRoute(makeCreateProductController()))

module.exports = router
