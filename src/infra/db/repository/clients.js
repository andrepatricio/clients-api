const MongoHelper = require('../config/db')
const { ObjectID } = require('mongodb')

class ClientRepository {
  async insert (client) {
    const clientsCollection = await MongoHelper.getCollection('clients')
    const result = await clientsCollection.insertOne(client)
    return result
  }

  async delete (_id) {
    const clientsCollection = await MongoHelper.getCollection('clients')
    const result = await clientsCollection.deleteOne({ _id: new ObjectID(_id) })
    return result
  }

  async findAll () {
    const clientsCollection = await MongoHelper.getCollection('clients')
    const result = await clientsCollection.findAll()
    return result
  }

  async find (query) {
    const clientsCollection = await MongoHelper.getCollection('clients')
    const result = await clientsCollection.findOne(query)
    return result
  }

  async findByEmail (email) {
    return await this.find({ email })
  }

  async findById (_id) {
    return await this.find({ _id: new ObjectID(_id) })
  }
}

module.exports = ClientRepository
