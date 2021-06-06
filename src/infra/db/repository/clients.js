const ClientModel = require('../models/client')
const mongoose = require('mongoose')
const InvalidObjectIdError = require('../error/InvalidObjectIdError')

class ClientRepository {
  async insert ({ name, email }) {
    const client = await ClientModel.create({ name, email })
    return client
  }

  async save (client) {
    return await client.save()
  }

  async delete (_id) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new InvalidObjectIdError()
    }
    const result = await ClientModel.findOneAndDelete({ _id })
    return result
  }

  async findById (_id) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new InvalidObjectIdError()
    }
    return await ClientModel.findOne({ _id }).populate('favorites').exec()
  }

  async findOne (query) {
    return await ClientModel.findOne(query).exec()
  }
}

module.exports = ClientRepository
