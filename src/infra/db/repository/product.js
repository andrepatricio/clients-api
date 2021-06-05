const MongoHelper = require('../config/db')
const { ObjectID } = require('mongodb')
const InvalidObjectIdError = require('../error/InvalidObjectIdError')

class ProductRepository {
  async insert ({ brand, title, price, image, reviewScore = 5 }) {
    const productsCollection = await MongoHelper.getCollection('products')
    const result = await productsCollection.insertOne({ price, image, brand, title, reviewScore })
    return result
  }

  async delete (_id) {
    const productsCollection = await MongoHelper.getCollection('products')
    const result = await productsCollection.deleteOne({ _id: new ObjectID(_id) })
    return result
  }

  async findAll ({ page, limit }) {
    const productsCollection = await MongoHelper.getCollection('products')
    const result = await productsCollection.find()
      .sort({ _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
    return result
  }

  async find (query) {
    const productsCollection = await MongoHelper.getCollection('products')
    const result = await productsCollection.findOne(query)
    return result
  }

  async findByEmail (email) {
    return await this.find({ email })
  }

  async findById (_id) {
    if (!ObjectID.isValid(_id)) {
      throw new InvalidObjectIdError()
    }
    return await this.find({ _id: new ObjectID(_id) })
  }
}

module.exports = ProductRepository
