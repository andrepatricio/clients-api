const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
  name: String,
  email: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products' }]
})

const ClientModel = mongoose.model('clients', ClientSchema)

module.exports = ClientModel
