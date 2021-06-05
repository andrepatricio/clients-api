const MongoHelper = require('../config/db')
const { ObjectID } = require('mongodb')

class ClientRepository {
  async save (client) {
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

  async find (_id) {
    const clientsCollection = await MongoHelper.getCollection('clients')
    const result = await clientsCollection.findOne({ _id: new ObjectID(_id) })
    return result
  }
}

module.exports = ClientRepository
