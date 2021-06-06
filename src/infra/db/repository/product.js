const ProductModel = require('../models/product')
const mongoose = require('mongoose')
const InvalidObjectIdError = require('../error/InvalidObjectIdError')

class ProductRepository {
  async insert ({ brand, title, price, image, reviewScore = 5 }) {
    const product = new ProductModel({ brand, title, price, image, reviewScore })
    await product.save()
    return product
  }

  async findAll ({ page, limit }) {
    const result = await ProductModel.find()
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    return result
  }

  async findById (_id) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new InvalidObjectIdError()
    }
    return await ProductModel.findById(_id)
  }
}

module.exports = ProductRepository
