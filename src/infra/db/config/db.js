// const { MongoClient } = require('mongodb')

// const MongoHelper = {

//   async connect (uri) {
//     this.uri = uri
//     this.client = await MongoClient.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     })
//   },

//   async disconnect () {
//     await this.client.close()
//     this.client = null
//   },

//   async getCollection (name) {
//     if (!this.client?.isConnected()) {
//       await this.connect(this.uri)
//     }
//     return this.client.db().collection(name)
//   },

//   map: (data) => {
//     const { _id, ...rest } = data
//     return { ...rest, id: _id }
//   },

//   mapCollection: (collection) => {
//     return collection.map(c => MongoHelper.map(c))
//   }
// }

// module.exports = MongoHelper

const mongoose = require('mongoose')
const envs = require('../../../main/environment/envs')

mongoose.connect(envs.db.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = db
