
const express = require('express')
const clientRoutes = require('../routes/clientRoutes')
const productRoutes = require('../routes/productRoutes')
const authRoutes = require('../routes/authRoutes')
const app = express()

app.use(express.json())
app.use('/client', clientRoutes)
app.use('/product', productRoutes)
app.use('/auth', authRoutes)

module.exports = app
