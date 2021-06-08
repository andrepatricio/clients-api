
const mongoose = require('mongoose')
const envs = require('../../../main/environment')

mongoose.connect(envs.db.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = db
