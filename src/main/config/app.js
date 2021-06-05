
const express = require('express')
const adaptRoute = require('../adapters/expressRouterAdapter')
const makeCreateClientController = require('../factories/createClientFactory')
const makeCreateProductController = require('../factories/createProductFactory')
const makeDeleteClientController = require('../factories/deleteClientFactory')
const makeGetAllProductsController = require('../factories/getAllProductsFactory')
const makeGetByIdProductController = require('../factories/getByIdProductFactory')
const app = express()

app.use(express.json())

app.post('/clients', adaptRoute(makeCreateClientController()))
app.delete('/clients/:id', adaptRoute(makeDeleteClientController()))
app.get('/products', adaptRoute(makeGetAllProductsController()))
app.get('/products/:_id', adaptRoute(makeGetByIdProductController()))
app.post('/products', adaptRoute(makeCreateProductController()))

module.exports = app
