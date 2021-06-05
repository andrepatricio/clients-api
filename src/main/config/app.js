
const express = require('express')
const adaptRoute = require('../adapters/expressRouterAdapter')
const makeCreateClientController = require('../factories/controllers/createClientController')
const makeDeleteClientController = require('../factories/controllers/deleteClientController')
const app = express()

app.use(express.json())

app.post('/clients', adaptRoute(makeCreateClientController()))
app.delete('/clients/:id', adaptRoute(makeDeleteClientController()))

module.exports = app
