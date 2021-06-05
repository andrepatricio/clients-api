module.exports = {
  server: {
    port: process.env.PORT || 3000
  },
  db: {
    mongodb: {
      uri: process.env.DB_MONGO_URI || 'mongodb://root:password@localhost:27017/clients?authSource=admin'
    }
  }
}
