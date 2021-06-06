
const express = require('express')
const adaptRoute = require('../adapters/expressRouterAdapter')
const makeAddFavoriteController = require('../factories/addFavoriteFactory')
const makeCreateClientController = require('../factories/createClientFactory')
const makeCreateProductController = require('../factories/createProductFactory')
const makeDeleteClientController = require('../factories/deleteClientFactory')
const makeGetAllProductsController = require('../factories/getAllProductsFactory')
const makeGetByIdProductController = require('../factories/getByIdProductFactory')
const makeGetClientByIdController = require('../factories/getClientByIdFactory')
const app = express()

app.use(express.json())

app.get('/client/:_id', adaptRoute(makeGetClientByIdController()))
app.post('/client', adaptRoute(makeCreateClientController()))
app.post('/client/:clientId/favorite/:productId', adaptRoute(makeAddFavoriteController()))
app.delete('/client/:id', adaptRoute(makeDeleteClientController()))
app.get('/product', adaptRoute(makeGetAllProductsController()))
app.get('/product/:_id', adaptRoute(makeGetByIdProductController()))
app.post('/product', adaptRoute(makeCreateProductController()))

module.exports = app
