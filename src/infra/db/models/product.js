const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  price: Number,
  image: String,
  reviewScore: Number,
  brand: String,
  title: String
})

const ProductModel = mongoose.model('products', ProductSchema)

module.exports = ProductModel
