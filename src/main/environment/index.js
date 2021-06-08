module.exports = {
  server: {
    port: process.env.SERVER_PORT || 3000
  },
  db: {
    mongodb: {
      uri: process.env.DB_MONGO_URI || 'mongodb://andre:andre@mongodb:27017/clients?authSource=admin'
    }
  },
  jwt: {
    secret: 'Segredo muito forte! sqn'
  }
}
