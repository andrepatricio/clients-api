const MongoHelper = require('../infra/db/config/db')
const { db, server } = require('./environment/envs')
const app = require('./config/app')

MongoHelper.connect(db.mongodb.uri).then(async () => {
  app.listen(server.port, () => console.log(`Rodando na porta: ${server.port} `))
})
